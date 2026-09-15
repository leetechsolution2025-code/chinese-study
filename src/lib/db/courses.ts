import { getDatabase } from './index';
import { Course, Lesson, UserLessonProgress } from '@/types';

export function getCoursesWithProgress(): Course[] {
  const db = getDatabase();

  const courses = db.prepare(`
    SELECT 
      id,
      title,
      level,
      total_lessons as totalLessons,
      target_vocab as targetVocab,
      description,
      color,
      badge_class as badgeClass
    FROM courses
    ORDER BY level ASC
  `).all() as Course[];

  for (const c of courses) {
    const progressRow = db.prepare(`
      SELECT COUNT(*) as completedCount
      FROM user_lesson_progress
      WHERE course_id = ? AND completed = 1 AND user_id = 'default_user'
    `).get(c.id) as { completedCount: number } | undefined;

    const completed = progressRow?.completedCount || 0;
    c.completedLessons = completed;
    c.progressPercent = Math.round((completed / c.totalLessons) * 100);
  }

  return courses;
}

export function getCourseById(courseId: string): Course | null {
  const db = getDatabase();

  const course = db.prepare(`
    SELECT 
      id,
      title,
      level,
      total_lessons as totalLessons,
      target_vocab as targetVocab,
      description,
      color,
      badge_class as badgeClass
    FROM courses
    WHERE id = ?
  `).get(courseId) as Course | undefined;

  if (!course) return null;

  const progressRow = db.prepare(`
    SELECT COUNT(*) as completedCount
    FROM user_lesson_progress
    WHERE course_id = ? AND completed = 1 AND user_id = 'default_user'
  `).get(course.id) as { completedCount: number } | undefined;

  const completed = progressRow?.completedCount || 0;
  course.completedLessons = completed;
  course.progressPercent = Math.round((completed / course.totalLessons) * 100);

  return course;
}

export function getLessonsByCourse(courseId: string): Lesson[] {
  const db = getDatabase();

  const rows = db.prepare(`
    SELECT 
      l.id,
      l.course_id as courseId,
      l.lesson_number as lessonNumber,
      l.title_hanzi as titleHanzi,
      l.title_pinyin as titlePinyin,
      l.title_vi as titleVi,
      l.title_en as titleEn,
      l.stage,
      l.stage_title_vi as stageTitleVi,
      l.stage_title_en as stageTitleEn,
      l.radicals,
      l.writing_chars as writingChars,
      l.audio_file as audioFile,
      l.audio_files as audioFiles,
      l.objectives,
      l.objectives_en as objectivesEn,
      l.dialogue,
      l.vocabularies,
      l.grammar_points as grammarPoints,
      l.quiz_data as quizData,
      COALESCE(p.completed, 0) as completed,
      COALESCE(p.score, 0) as score
    FROM lessons l
    LEFT JOIN user_lesson_progress p 
      ON l.id = p.lesson_id AND p.user_id = 'default_user'
    WHERE l.course_id = ?
    ORDER BY l.lesson_number ASC
  `).all(courseId) as any[];

  return rows.map((r) => ({
    id: r.id,
    courseId: r.courseId,
    lessonNumber: r.lessonNumber,
    titleHanzi: r.titleHanzi,
    titlePinyin: r.titlePinyin,
    titleVi: r.titleVi,
    titleEn: r.titleEn || undefined,
    stage: r.stage || 1,
    stageTitleVi: r.stageTitleVi || undefined,
    stageTitleEn: r.stageTitleEn || undefined,
    radicals: r.radicals ? (typeof r.radicals === 'string' ? JSON.parse(r.radicals) : r.radicals) : [],
    writingChars: r.writingChars ? (typeof r.writingChars === 'string' ? JSON.parse(r.writingChars) : r.writingChars) : [],
    audioFile: r.audioFile || undefined,
    audioFiles: r.audioFiles ? (typeof r.audioFiles === 'string' ? JSON.parse(r.audioFiles) : r.audioFiles) : [],
    objectives: typeof r.objectives === 'string' ? JSON.parse(r.objectives) : r.objectives,
    objectivesEn: r.objectivesEn ? (typeof r.objectivesEn === 'string' ? JSON.parse(r.objectivesEn) : r.objectivesEn) : undefined,
    dialogue: typeof r.dialogue === 'string' ? JSON.parse(r.dialogue) : r.dialogue,
    vocabularies: typeof r.vocabularies === 'string' ? JSON.parse(r.vocabularies) : r.vocabularies,
    grammarPoints: typeof r.grammarPoints === 'string' ? JSON.parse(r.grammarPoints) : r.grammarPoints,
    quizData: typeof r.quizData === 'string' ? JSON.parse(r.quizData) : r.quizData,
    completed: Boolean(r.completed),
    score: r.score,
  }));
}

export function getLessonById(lessonId: string): Lesson | null {
  const db = getDatabase();

  const r = db.prepare(`
    SELECT 
      l.id,
      l.course_id as courseId,
      l.lesson_number as lessonNumber,
      l.title_hanzi as titleHanzi,
      l.title_pinyin as titlePinyin,
      l.title_vi as titleVi,
      l.title_en as titleEn,
      l.stage,
      l.stage_title_vi as stageTitleVi,
      l.stage_title_en as stageTitleEn,
      l.radicals,
      l.writing_chars as writingChars,
      l.audio_file as audioFile,
      l.audio_files as audioFiles,
      l.objectives,
      l.objectives_en as objectivesEn,
      l.dialogue,
      l.vocabularies,
      l.grammar_points as grammarPoints,
      l.quiz_data as quizData,
      COALESCE(p.completed, 0) as completed,
      COALESCE(p.score, 0) as score
    FROM lessons l
    LEFT JOIN user_lesson_progress p 
      ON l.id = p.lesson_id AND p.user_id = 'default_user'
    WHERE l.id = ?
  `).get(lessonId) as any;

  if (!r) return null;

  return {
    id: r.id,
    courseId: r.courseId,
    lessonNumber: r.lessonNumber,
    titleHanzi: r.titleHanzi,
    titlePinyin: r.titlePinyin,
    titleVi: r.titleVi,
    titleEn: r.titleEn || undefined,
    stage: r.stage || 1,
    stageTitleVi: r.stageTitleVi || undefined,
    stageTitleEn: r.stageTitleEn || undefined,
    radicals: r.radicals ? (typeof r.radicals === 'string' ? JSON.parse(r.radicals) : r.radicals) : [],
    writingChars: r.writingChars ? (typeof r.writingChars === 'string' ? JSON.parse(r.writingChars) : r.writingChars) : [],
    audioFile: r.audioFile || undefined,
    audioFiles: r.audioFiles ? (typeof r.audioFiles === 'string' ? JSON.parse(r.audioFiles) : r.audioFiles) : [],
    objectives: typeof r.objectives === 'string' ? JSON.parse(r.objectives) : r.objectives,
    objectivesEn: r.objectivesEn ? (typeof r.objectivesEn === 'string' ? JSON.parse(r.objectivesEn) : r.objectivesEn) : undefined,
    dialogue: typeof r.dialogue === 'string' ? JSON.parse(r.dialogue) : r.dialogue,
    vocabularies: typeof r.vocabularies === 'string' ? JSON.parse(r.vocabularies) : r.vocabularies,
    grammarPoints: typeof r.grammarPoints === 'string' ? JSON.parse(r.grammarPoints) : r.grammarPoints,
    quizData: typeof r.quizData === 'string' ? JSON.parse(r.quizData) : r.quizData,
    completed: Boolean(r.completed),
    score: r.score,
  };
}

export function saveLessonProgress(lessonId: string, courseId: string, score: number): void {
  const db = getDatabase();

  db.prepare(`
    INSERT INTO user_lesson_progress (user_id, lesson_id, course_id, completed, score, last_accessed_at)
    VALUES ('default_user', ?, ?, 1, ?, datetime('now'))
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET
      completed = 1,
      score = MAX(excluded.score, user_lesson_progress.score),
      last_accessed_at = datetime('now')
  `).run(lessonId, courseId, score);
}
