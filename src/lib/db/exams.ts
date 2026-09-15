import { getDatabase } from './index';
import { MockExam, ExamResult } from '@/types';
import mockExamsData from '@/data/mock_exams.json';

export function getMockExams(): (MockExam & { bestScore?: number; totalAttempts?: number; lastAttemptDate?: string })[] {
  const db = getDatabase();
  const exams = mockExamsData as MockExam[];

  return exams.map((exam) => {
    const stats = db.prepare(`
      SELECT 
        MAX(score) as best_score,
        COUNT(*) as total_attempts,
        MAX(completed_at) as last_attempt_date
      FROM exam_results
      WHERE exam_id = ?
    `).get(exam.id) as { best_score: number | null; total_attempts: number; last_attempt_date: string | null };

    return {
      ...exam,
      bestScore: stats?.best_score ?? undefined,
      totalAttempts: stats?.total_attempts ?? 0,
      lastAttemptDate: stats?.last_attempt_date ?? undefined,
    };
  });
}

export function getMockExamByLevel(level: number): MockExam | null {
  const exams = mockExamsData as MockExam[];
  const exam = exams.find((e) => e.level === level);
  return exam || null;
}

export function getMockExamById(id: string): MockExam | null {
  const exams = mockExamsData as MockExam[];
  const exam = exams.find((e) => e.id === id);
  return exam || null;
}

export function saveExamResult(result: Omit<ExamResult, 'id' | 'completedAt'> & { userId?: string }): { id: number; passed: boolean } {
  const db = getDatabase();
  const userId = result.userId || 'default_user';

  const stmt = db.prepare(`
    INSERT INTO exam_results (
      user_id, exam_id, level, score, max_score, listening_score, reading_score, passed, time_spent_seconds, answers_summary
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    userId,
    result.examId,
    result.level,
    result.score,
    result.maxScore,
    result.listeningScore,
    result.readingScore,
    result.passed ? 1 : 0,
    result.timeSpentSeconds,
    result.answersSummary ? JSON.stringify(result.answersSummary) : null
  );

  return {
    id: Number(info.lastInsertRowid),
    passed: result.passed,
  };
}

export function getExamHistory(level?: number): ExamResult[] {
  const db = getDatabase();
  let query = `
    SELECT 
      id, exam_id as examId, level, score, max_score as maxScore,
      listening_score as listeningScore, reading_score as readingScore,
      passed, time_spent_seconds as timeSpentSeconds,
      completed_at as completedAt, answers_summary as answersSummary
    FROM exam_results
  `;

  const params: unknown[] = [];
  if (level !== undefined) {
    query += ` WHERE level = ?`;
    params.push(level);
  }

  query += ` ORDER BY completed_at DESC LIMIT 20`;

  const rows = db.prepare(query).all(...params) as Array<Record<string, unknown>>;

  return rows.map((r) => ({
    id: Number(r.id),
    examId: String(r.examId),
    level: Number(r.level),
    score: Number(r.score),
    maxScore: Number(r.maxScore),
    listeningScore: Number(r.listeningScore),
    readingScore: Number(r.readingScore),
    passed: Boolean(r.passed),
    timeSpentSeconds: Number(r.timeSpentSeconds),
    completedAt: String(r.completedAt),
    answersSummary: r.answersSummary ? JSON.parse(String(r.answersSummary)) : undefined,
  }));
}
