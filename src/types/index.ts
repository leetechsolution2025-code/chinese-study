export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  hanviet: string;        // Âm Hán Việt - Vũ khí ghi nhớ người Việt
  meaning: string;        // Nghĩa tiếng Việt
  meaningEn?: string;     // English definition for English-medium learners
  level: number;          // HSK level (1-6)
  partOfSpeech: string;   // Từ loại (danh từ, động từ...)
  strokes?: number;       // Số nét vẽ
  radical?: string;       // Bộ thủ chính
  exampleHanzi: string;   // Câu ví dụ chữ Hán
  examplePinyin: string;  // Pinyin câu ví dụ
  exampleMeaning: string; // Nghĩa tiếng Việt câu ví dụ
  exampleMeaningEn?: string; // English meaning of example
}

export interface RadicalItem {
  radical: string;
  pinyin: string;
  hanviet: string;
  meaning: string;
  meaningEn?: string;
  strokes: number;
  mnemonic: string;       // Câu chuyện chiết tự ghi nhớ
  mnemonicEn?: string;
  examples: string[];
}

export type SRSRating = 'again' | 'hard' | 'good' | 'easy';

export interface SRSItem {
  vocabId: string;
  interval: number;       // Khoảng cách ngày ôn tập
  repetitions: number;    // Số lần ôn tập liên tiếp
  easeFactor: number;     // Hệ số độ khó (mặc định 2.5)
  nextReviewDate: string; // ISO date string
  lastReviewedDate?: string;
  state: 'new' | 'learning' | 'review';
}

export interface ToneInfo {
  toneNumber: number;
  nameVi: string;
  pinyinName: string;
  pitchContour: string;   // 55, 35, 214, 51, light
  description: string;
  sampleSyllables: {
    character: string;
    pinyin: string;
    hanviet: string;
    meaning: string;
  }[];
}

export interface ReaderArticle {
  id: string;
  title: string;
  hskLevel: number;
  content: {
    hanzi: string;
    pinyin: string;
    meaningVi: string;
    hanviet: string;
  }[];
  translationVi: string;
}

export interface Course {
  id: string; // 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'
  title: string;
  titleEn?: string;
  level: number;
  totalLessons: number;
  targetVocab: number;
  description: string;
  descriptionEn?: string;
  color: string;
  badgeClass?: string;
  completedLessons?: number;
  progressPercent?: number;
}

export interface DialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  vi: string;
  en?: string;
  audioText?: string;
}

export interface GrammarPoint {
  title: string;
  titleEn?: string;
  explanation: string;
  explanationEn?: string;
  structure?: string;
  examples: {
    hanzi: string;
    pinyin: string;
    vi: string;
    en?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string; // e.g. 'hsk1-lesson-01'
  courseId: string;
  lessonNumber: number;
  titleHanzi: string;
  titlePinyin: string;
  titleVi: string;
  titleEn?: string;
  objectives: string[];
  objectivesEn?: string[];
  dialogue: DialogueLine[];
  vocabularies: VocabItem[];
  grammarPoints: GrammarPoint[];
  quizData: QuizQuestion[];
  completed?: boolean;
  score?: number;
}

export interface UserLessonProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  score: number;
  lastAccessedAt: string;
}

export interface ExamQuestion {
  id: string;
  section: 'listening' | 'reading';
  questionNumber: number;
  prompt: string;
  pinyin?: string;
  audioPrompt?: string;
  options: {
    id: string;
    text: string;
    pinyin?: string;
  }[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface MockExam {
  id: string;
  level: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  totalTimeMinutes: number;
  totalQuestions: number;
  maxScore: number;
  passingScore: number;
  listeningQuestionsCount: number;
  readingQuestionsCount: number;
  questions: ExamQuestion[];
}

export interface ExamResult {
  id?: number;
  examId: string;
  level: number;
  score: number;
  maxScore: number;
  listeningScore: number;
  readingScore: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  answersSummary?: Record<string, string>;
}

