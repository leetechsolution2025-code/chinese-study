'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Clock,
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Headphones,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { MockExam, ExamResult } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function ExamsHubPage() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [exams, setExams] = useState<(MockExam & { bestScore?: number; totalAttempts?: number })[]>([]);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExams(data.data.exams || []);
          setHistory(data.data.history || []);
        }
      })
      .catch((err) => console.error('Error fetching exams:', err))
      .finally(() => setLoading(false));
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return '#e11d48'; // Crimson
      case 2:
        return '#0ea5e9'; // Sky
      case 3:
        return '#f59e0b'; // Gold
      case 4:
        return '#10b981'; // Emerald
      case 5:
        return '#8b5cf6'; // Indigo
      case 6:
        return '#ec4899'; // Crimson Pink
      default:
        return '#6366f1';
    }
  };

  const getBadgeClass = (level: number) => {
    switch (level) {
      case 1:
        return 'badge-crimson';
      case 2:
        return 'badge-sky';
      case 3:
        return 'badge-gold';
      case 4:
        return 'badge-emerald';
      case 5:
        return 'badge-indigo';
      case 6:
        return 'badge-crimson';
      default:
        return 'badge-crimson';
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Hero Header */}
      <section className="hero-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-crimson">
            <Trophy size={13} />
            {isEn ? 'Standard HSK Mock Exam Hall' : 'Phòng luyện thi thử HSK chuẩn hóa'}
          </span>
          <span className="badge badge-gold">
            <Sparkles size={12} />
            {isEn ? '100% Real Exam Format Simulation' : 'Mô phỏng 100% đề thi thật'}
          </span>
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '14px' }}>
          {isEn ? (
            <>Achieve Your <span className="gradient-text">HSK 1 to HSK 6 Certification</span></>
          ) : (
            <>Chinh phục chứng chỉ <span className="gradient-text">HSK 1 đến HSK 6</span></>
          )}
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '20px' }}>
          {isEn
            ? 'Exact simulation of official Hanban / CTI examinations: Listening (听力) and Reading (阅读) sections, strict countdown timer, auto-scoring, and immediate pass/fail certification status.'
            : 'Đề thi mô phỏng định dạng chuẩn của tổ chức Hanban / CTI: phân chia 2 phần Nghe hiểu (听力) và Đọc hiểu (阅读), đồng hồ đếm ngược áp lực phòng thi, chấm điểm tự động và xếp loại Đạt/Chưa đạt tức thì.'}
        </p>

        {/* Highlights */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            <Headphones size={17} style={{ color: '#0ea5e9' }} />
            <span>{isEn ? 'Native audio question playback' : 'Âm thanh phát câu hỏi bản xứ'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            <Clock size={17} style={{ color: '#f59e0b' }} />
            <span>{isEn ? 'Strict exam countdown timer' : 'Đồng hồ bấm giờ chuẩn phòng thi'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            <Award size={17} style={{ color: '#10b981' }} />
            <span>{isEn ? 'Instant scoring & SQLite history' : 'Lưu điểm & lịch sử vào SQLite'}</span>
          </div>
        </div>
      </section>

      {/* Grid of Mock Exams */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <span>{isEn ? 'Mock Exams by HSK Level' : 'Danh sách đề thi theo cấp độ'}</span>
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isEn ? '6 levels ready for test' : '6 cấp độ sẵn sàng làm bài'}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
            {isEn ? 'Loading mock exams...' : 'Đang tải danh sách đề thi...'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
            {exams.map((exam) => {
              const color = getLevelColor(exam.level);
              const badgeClass = getBadgeClass(exam.level);

              return (
                <div
                  key={exam.id}
                  className="card-interactive"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)',
                    position: 'relative',
                  }}
                >
                  <div>
                    {/* Level header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span className={`badge ${badgeClass}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                        HSK {exam.level}
                      </span>

                      {exam.bestScore !== undefined && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#f59e0b', fontWeight: '700' }}>
                          <Award size={15} />
                          <span>{isEn ? `Best: ${exam.bestScore}/${exam.maxScore}` : `Điểm cao nhất: ${exam.bestScore}/${exam.maxScore}`}</span>
                        </div>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                      {isEn && exam.titleEn ? exam.titleEn : exam.title}
                    </h3>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {isEn && exam.descriptionEn ? exam.descriptionEn : exam.description}
                    </p>

                    {/* Meta Specs */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        background: 'var(--bg-tertiary)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.82rem',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <Clock size={15} style={{ color }} />
                        <span>{exam.totalTimeMinutes} {isEn ? 'mins' : 'phút'}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <HelpCircle size={15} style={{ color }} />
                        <span>{exam.totalQuestions} {isEn ? 'questions' : 'câu trắc nghiệm'}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <Headphones size={15} style={{ color }} />
                        <span>{isEn ? `Listening: ${exam.listeningQuestionsCount} q` : `Nghe: ${exam.listeningQuestionsCount} câu`}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <BookOpen size={15} style={{ color }} />
                        <span>{isEn ? `Reading: ${exam.readingQuestionsCount} q` : `Đọc: ${exam.readingQuestionsCount} câu`}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                      {isEn ? (
                        <>Passing mark: <strong style={{ color: '#10b981' }}>{exam.passingScore}</strong> / {exam.maxScore} pts</>
                      ) : (
                        <>Điểm chuẩn đỗ: <strong style={{ color: '#10b981' }}>{exam.passingScore}</strong> / {exam.maxScore} điểm</>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/exams/hsk${exam.level}`}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                      boxShadow: `0 4px 14px ${color}33`,
                    }}
                  >
                    <span>{isEn ? 'Start Mock Exam' : 'Vào phòng thi ngay'}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Exam Attempt History Section */}
      {history.length > 0 && (
        <section className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <Calendar size={18} style={{ color: '#f59e0b' }} />
              <span>{isEn ? 'Recent Exam Attempt History' : 'Lịch sử các lần thi thử gần đây'}</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {isEn ? 'Stored in SQLite' : 'Lưu trữ trong SQLite'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((attempt) => {
              const dateStr = new Date(attempt.completedAt).toLocaleString(isEn ? 'en-US' : 'vi-VN');
              const minutes = Math.floor(attempt.timeSpentSeconds / 60);
              const seconds = attempt.timeSpentSeconds % 60;

              return (
                <div
                  key={attempt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {attempt.passed ? (
                      <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                    ) : (
                      <XCircle size={20} style={{ color: '#ef4444' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                        {isEn
                          ? `HSK ${attempt.level} Mock Exam — ${attempt.passed ? 'PASSED' : 'NOT PASSED'}`
                          : `Đề thi HSK ${attempt.level} — ${attempt.passed ? 'ĐẠT (Passed)' : 'CHƯA ĐẠT (Not Passed)'}`}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {dateStr} • {isEn ? `Time: ${minutes}m ${seconds}s` : `Thời gian làm bài: ${minutes} phút ${seconds} giây`}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: attempt.passed ? '#34d399' : '#f87171' }}>
                        {attempt.score} / {attempt.maxScore}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {isEn ? `Listening: ${attempt.listeningScore} | Reading: ${attempt.readingScore}` : `Nghe: ${attempt.listeningScore} | Đọc: ${attempt.readingScore}`}
                      </div>
                    </div>

                    <Link
                      href={`/exams/hsk${attempt.level}`}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      {isEn ? 'Retake' : 'Thi lại'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
