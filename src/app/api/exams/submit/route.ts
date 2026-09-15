import { NextRequest, NextResponse } from 'next/server';
import { getMockExamById, saveExamResult } from '@/lib/db/exams';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { examId, answers, timeSpentSeconds } = body;

    if (!examId || !answers) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin examId hoặc answers' },
        { status: 400 }
      );
    }

    const exam = getMockExamById(examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy đề thi' },
        { status: 404 }
      );
    }

    let listeningScore = 0;
    let readingScore = 0;
    let correctCount = 0;

    const questionResults = exam.questions.map((q) => {
      const userAnswer = answers[q.id] || '';
      const isCorrect = userAnswer.toUpperCase() === q.correctAnswer.toUpperCase();

      if (isCorrect) {
        correctCount += 1;
        if (q.section === 'listening') {
          listeningScore += q.points;
        } else {
          readingScore += q.points;
        }
      }

      return {
        id: q.id,
        section: q.section,
        questionNumber: q.questionNumber,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        points: isCorrect ? q.points : 0,
        explanation: q.explanation,
      };
    });

    const totalScore = listeningScore + readingScore;
    const passed = totalScore >= exam.passingScore;

    const saved = saveExamResult({
      examId: exam.id,
      level: exam.level,
      score: totalScore,
      maxScore: exam.maxScore,
      listeningScore,
      readingScore,
      passed,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
      answersSummary: answers,
    });

    return NextResponse.json({
      success: true,
      data: {
        resultId: saved.id,
        totalScore,
        maxScore: exam.maxScore,
        passingScore: exam.passingScore,
        listeningScore,
        readingScore,
        correctCount,
        totalQuestions: exam.totalQuestions,
        passed,
        questionResults,
      },
    });
  } catch (error) {
    console.error('Error submitting exam:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
