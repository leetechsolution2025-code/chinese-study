import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import hsk1Data from '@/data/hsk1_vocab.json';
import radicalsData from '@/data/radicals.json';
import articlesData from '@/data/articles.json';
import coursesData from '@/data/courses.json';

const DB_PATH = path.join(process.cwd(), 'chinese_study.db');

let dbInstance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = new Database(DB_PATH);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.pragma('foreign_keys = ON');

  initTables(dbInstance);
  seedInitialData(dbInstance);

  return dbInstance;
}

function initTables(db: Database.Database) {
  // 1. Bảng từ vựng HSK
  db.exec(`
    CREATE TABLE IF NOT EXISTS vocabularies (
      id TEXT PRIMARY KEY,
      hanzi TEXT NOT NULL,
      pinyin TEXT NOT NULL,
      hanviet TEXT NOT NULL,
      meaning TEXT NOT NULL,
      level INTEGER NOT NULL DEFAULT 1,
      part_of_speech TEXT,
      strokes INTEGER,
      radical TEXT,
      example_hanzi TEXT,
      example_pinyin TEXT,
      example_meaning TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_vocab_hanzi ON vocabularies(hanzi);
    CREATE INDEX IF NOT EXISTS idx_vocab_pinyin ON vocabularies(pinyin);
    CREATE INDEX IF NOT EXISTS idx_vocab_hanviet ON vocabularies(hanviet);
    CREATE INDEX IF NOT EXISTS idx_vocab_level ON vocabularies(level);
  `);

  // 2. Bảng bộ thủ & chiết tự
  db.exec(`
    CREATE TABLE IF NOT EXISTS radicals (
      radical TEXT PRIMARY KEY,
      pinyin TEXT NOT NULL,
      hanviet TEXT NOT NULL,
      meaning TEXT NOT NULL,
      strokes INTEGER NOT NULL,
      mnemonic TEXT,
      examples TEXT
    );
  `);

  // 3. Bảng tiến trình ôn tập SRS (SM-2 / FSRS)
  db.exec(`
    CREATE TABLE IF NOT EXISTS srs_progress (
      vocab_id TEXT PRIMARY KEY,
      interval INTEGER NOT NULL DEFAULT 0,
      repetitions INTEGER NOT NULL DEFAULT 0,
      ease_factor REAL NOT NULL DEFAULT 2.5,
      next_review_date TEXT NOT NULL,
      last_reviewed_date TEXT,
      state TEXT NOT NULL DEFAULT 'new',
      FOREIGN KEY (vocab_id) REFERENCES vocabularies(id) ON DELETE CASCADE
    );
  `);

  // 4. Bảng thống kê người dùng
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_stats (
      id TEXT PRIMARY KEY,
      streak INTEGER NOT NULL DEFAULT 1,
      last_study_date TEXT,
      total_words_learned INTEGER NOT NULL DEFAULT 0,
      characters_written INTEGER NOT NULL DEFAULT 0,
      tones_practiced INTEGER NOT NULL DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Bảng bài đọc tương tác
  db.exec(`
    CREATE TABLE IF NOT EXISTS reader_articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      hsk_level INTEGER NOT NULL DEFAULT 1,
      content TEXT NOT NULL,
      translation_vi TEXT NOT NULL
    );
  `);

  // 6. Bảng Khóa học / Lớp học (HSK 1 đến HSK 4)
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      level INTEGER NOT NULL,
      total_lessons INTEGER NOT NULL,
      target_vocab INTEGER NOT NULL,
      description TEXT NOT NULL,
      color TEXT NOT NULL,
      badge_class TEXT
    );
  `);

  // 7. Bảng Bài học chi tiết
  db.exec(`
    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      lesson_number INTEGER NOT NULL,
      title_hanzi TEXT NOT NULL,
      title_pinyin TEXT NOT NULL,
      title_vi TEXT NOT NULL,
      title_en TEXT,
      stage INTEGER DEFAULT 1,
      stage_title_vi TEXT,
      stage_title_en TEXT,
      radicals TEXT,
      writing_chars TEXT,
      audio_file TEXT,
      audio_files TEXT,
      objectives TEXT NOT NULL,
      objectives_en TEXT,
      dialogue TEXT NOT NULL,
      vocabularies TEXT NOT NULL,
      grammar_points TEXT NOT NULL,
      quiz_data TEXT NOT NULL,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_lesson_course ON lessons(course_id);
    CREATE INDEX IF NOT EXISTS idx_lesson_number ON lessons(course_id, lesson_number);
  `);

  // Migrate columns if table was created in an earlier version
  const tableInfo = db.prepare(`PRAGMA table_info(lessons)`).all() as { name: string }[];
  const columnNames = new Set(tableInfo.map((col) => col.name));
  const newCols: [string, string][] = [
    ['title_en', 'TEXT'],
    ['stage', 'INTEGER DEFAULT 1'],
    ['stage_title_vi', 'TEXT'],
    ['stage_title_en', 'TEXT'],
    ['radicals', 'TEXT'],
    ['writing_chars', 'TEXT'],
    ['audio_file', 'TEXT'],
    ['audio_files', 'TEXT'],
    ['objectives_en', 'TEXT'],
  ];
  for (const [col, colType] of newCols) {
    if (!columnNames.has(col)) {
      try {
        db.exec(`ALTER TABLE lessons ADD COLUMN ${col} ${colType};`);
      } catch (e) {
        console.warn(`Could not add column ${col}:`, e);
      }
    }
  }

  // 8. Bảng Tiến độ học bài học của người dùng
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_lesson_progress (
      user_id TEXT NOT NULL DEFAULT 'default_user',
      lesson_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      score INTEGER NOT NULL DEFAULT 0,
      last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, lesson_id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
    );
  `);

  // 9. Bảng Lịch sử kết quả thi thử HSK
  db.exec(`
    CREATE TABLE IF NOT EXISTS exam_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'default_user',
      exam_id TEXT NOT NULL,
      level INTEGER NOT NULL,
      score INTEGER NOT NULL,
      max_score INTEGER NOT NULL,
      listening_score INTEGER NOT NULL,
      reading_score INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      time_spent_seconds INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      answers_summary TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_exam_level ON exam_results(level);
    CREATE INDEX IF NOT EXISTS idx_exam_completed_at ON exam_results(completed_at);
  `);
}

function seedInitialData(db: Database.Database) {
  // Seed từ vựng nếu bảng trống
  const vocabCount = db.prepare('SELECT COUNT(*) as count FROM vocabularies').get() as { count: number };
  if (vocabCount.count === 0) {
    const insertVocab = db.prepare(`
      INSERT INTO vocabularies (
        id, hanzi, pinyin, hanviet, meaning, level, part_of_speech, strokes, radical, example_hanzi, example_pinyin, example_meaning
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items: typeof hsk1Data) => {
      for (const item of items) {
        insertVocab.run(
          item.id,
          item.hanzi,
          item.pinyin,
          item.hanviet,
          item.meaning,
          item.level,
          item.partOfSpeech,
          item.strokes || 0,
          item.radical || '',
          item.exampleHanzi,
          item.examplePinyin,
          item.exampleMeaning
        );
      }
    });

    insertMany(hsk1Data);
  }

  // Seed bộ thủ nếu bảng trống
  const radicalCount = db.prepare('SELECT COUNT(*) as count FROM radicals').get() as { count: number };
  if (radicalCount.count === 0) {
    const insertRadical = db.prepare(`
      INSERT INTO radicals (radical, pinyin, hanviet, meaning, strokes, mnemonic, examples)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertManyRadicals = db.transaction((items: typeof radicalsData) => {
      for (const item of items) {
        insertRadical.run(
          item.radical,
          item.pinyin,
          item.hanviet,
          item.meaning,
          item.strokes,
          item.mnemonic,
          JSON.stringify(item.examples)
        );
      }
    });

    insertManyRadicals(radicalsData);
  }

  // Seed bài đọc nếu bảng trống
  const articleCount = db.prepare('SELECT COUNT(*) as count FROM reader_articles').get() as { count: number };
  if (articleCount.count === 0) {
    const insertArticle = db.prepare(`
      INSERT INTO reader_articles (id, title, hsk_level, content, translation_vi)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const article of articlesData) {
      insertArticle.run(
        article.id,
        article.title,
        article.hskLevel,
        JSON.stringify(article.content),
        article.translationVi
      );
    }
  }

  // Seed user_stats nếu chưa có
  const statsCount = db.prepare('SELECT COUNT(*) as count FROM user_stats').get() as { count: number };
  if (statsCount.count === 0) {
    db.prepare(`
      INSERT INTO user_stats (id, streak, last_study_date, total_words_learned, characters_written, tones_practiced)
      VALUES ('default_user', 3, datetime('now'), 15, 8, 12)
    `).run();
  }

  // Seed Khóa học HSK 1 - 6 (idempotent: INSERT OR REPLACE)
  const insertCourse = db.prepare(`
    INSERT OR REPLACE INTO courses (id, title, level, total_lessons, target_vocab, description, color, badge_class)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of coursesData.courses) {
    insertCourse.run(
      c.id,
      c.title,
      c.level,
      c.totalLessons,
      c.targetVocab,
      c.description,
      c.color,
      c.badgeClass
    );
  }

  // Seed Bài học chi tiết (idempotent: INSERT OR REPLACE)
  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (
      id, course_id, lesson_number, title_hanzi, title_pinyin, title_vi, title_en,
      stage, stage_title_vi, stage_title_en, radicals, writing_chars, audio_file, audio_files,
      objectives, objectives_en, dialogue, vocabularies, grammar_points, quiz_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const l of coursesData.lessons) {
    insertLesson.run(
      l.id,
      l.courseId,
      l.lessonNumber,
      l.titleHanzi,
      l.titlePinyin,
      l.titleVi,
      (l as any).titleEn || '',
      (l as any).stage || 1,
      (l as any).stageTitleVi || '',
      (l as any).stageTitleEn || '',
      JSON.stringify((l as any).radicals || []),
      JSON.stringify((l as any).writingChars || []),
      (l as any).audioFile || '',
      JSON.stringify((l as any).audioFiles || []),
      JSON.stringify(l.objectives),
      JSON.stringify((l as any).objectivesEn || []),
      JSON.stringify(l.dialogue),
      JSON.stringify(l.vocabularies),
      JSON.stringify(l.grammarPoints),
      JSON.stringify(l.quizData)
    );
  }

    // Đánh dấu hoàn thành thử Bài 1 HSK 1
    db.prepare(`
      INSERT OR REPLACE INTO user_lesson_progress (user_id, lesson_id, course_id, completed, score, last_accessed_at)
      VALUES ('default_user', 'hsk1-lesson-01', 'hsk1', 1, 100, datetime('now'))
    `).run();
}
