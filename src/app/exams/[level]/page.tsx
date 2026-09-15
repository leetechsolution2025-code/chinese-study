'use client';

import React, { use, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Volume2,
  Headphones,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Trophy,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MockExam } from '@/types';

interface PageProps {
  params: Promise<{
    level: string;
  }>;
}

export default function ExamSimulationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { level } = resolvedParams;
  const router = useRouter();

  const [exam, setExam] = useState<MockExam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(35 * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Tải đề thi
  useEffect(() => {
    fetch(`/api/exams/${level}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExam(data.data);
          setTimeLeft(data.data.totalTimeMinutes * 60);
          startTimeRef.current = Date.now();
        } else {
          setError(data.error || 'Không tải được đề thi');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Lỗi kết nối máy chủ');
      })
      .finally(() => setLoading(false));
  }, [level]);

  // Bộ đếm ngược thời gian
  useEffect(() => {
    if (isSubmitted || !exam) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [exam, isSubmitted]);

  // Phát âm thanh câu hỏi Nghe
  const handlePlayAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Speech Synthesis');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitExam = async () => {
    if (!exam || submitting || isSubmitted) return;
    setSubmitting(true);
    setShowConfirmModal(false);

    const timeSpentSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);

    try {
      const res = await fetch('/api/exams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: exam.id,
          answers,
          timeSpentSeconds,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setExamResult(json.data);
        setIsSubmitted(true);

        if (json.data.passed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err) {
      console.error('Error submitting exam:', err);
      alert('Có lỗi xảy ra khi nộp bài thi. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Đang chuẩn bị phòng thi thử...</div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
        <h2>{error || 'Không tìm thấy đề thi'}</h2>
        <Link href="/exams" className="btn-secondary" style={{ marginTop: '16px', display: 'inline-flex' }}>
          Quay lại danh sách đề thi
        </Link>
      </div>
    );
  }

  const currentQ = exam.questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bar of Exam Room */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'sticky',
          top: '72px',
          zIndex: 30,
          border: '1px solid rgba(225, 29, 72, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/exams" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              {exam.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Đã làm: <strong style={{ color: '#0ea5e9' }}>{answeredCount}</strong> / {exam.totalQuestions} câu
            </div>
          </div>
        </div>

        {/* Timer & Submit button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {!isSubmitted && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-tertiary)',
                border: timeLeft < 300 ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                color: timeLeft < 300 ? '#ef4444' : 'var(--text-primary)',
                fontWeight: '700',
                fontSize: '1rem',
              }}
            >
              <Clock size={16} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          {!isSubmitted ? (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              disabled={submitting}
            >
              Nộp bài thi
            </button>
          ) : (
            <Link href="/exams" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              Rời phòng thi
            </Link>
          )}
        </div>
      </div>

      {/* RESULT MODAL BANNER (If submitted) */}
      {isSubmitted && examResult && (
        <section
          className="glass-panel"
          style={{
            padding: '32px',
            background: examResult.passed
              ? 'rgba(16, 185, 129, 0.08)'
              : 'rgba(239, 68, 68, 0.08)',
            border: examResult.passed ? '1px solid #10b981' : '1px solid #ef4444',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            {examResult.passed ? (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <Trophy size={36} />
              </div>
            ) : (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                }}
              >
                <RotateCcw size={36} />
              </div>
            )}
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            {examResult.passed ? 'CHÚC MỪNG BẠN ĐÃ ĐẠT CHUẨN HSK!' : 'BẠN CHƯA ĐẠT ĐIỂM CHUẨN'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '20px' }}>
            {examResult.passed
              ? `Xuất sắc! Bạn đã vượt qua mức điểm chuẩn ${examResult.passingScore} điểm.`
              : `Rất tiếc! Mức điểm chuẩn là ${examResult.passingScore} điểm. Hãy ôn luyện lại các câu sai bên dưới và thử lại.`}
          </p>

          <div
            style={{
              display: 'inline-flex',
              gap: '24px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              padding: '16px 28px',
              borderRadius: '12px',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tổng điểm</div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: examResult.passed ? '#10b981' : '#ef4444',
                }}
              >
                {examResult.totalScore} / {examResult.maxScore}
              </div>
            </div>

            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Phần Nghe</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0ea5e9' }}>
                {examResult.listeningScore}
              </div>
            </div>

            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Phần Đọc</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b' }}>
                {examResult.readingScore}
              </div>
            </div>

            <div style={{ width: '1px', background: 'var(--border-subtle)' }} />

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Số câu đúng</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {examResult.correctCount} / {examResult.totalQuestions}
              </div>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Kết quả đã được tự động lưu vào cơ sở dữ liệu SQLite.
            </span>
          </div>
        </section>
      )}

      {/* Main Exam Layout: Question Navigator + Active Question Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Left Sidebar: Question Navigator */}
        <div className="glass-panel" style={{ padding: '20px', position: 'sticky', top: '150px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px' }}>Mục lục câu hỏi</h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Phần 1: Nghe hiểu (听力)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {exam.questions
                .filter((q) => q.section === 'listening')
                .map((q, idx) => {
                  const isSelected = currentIndex === idx;
                  const isAnswered = Boolean(answers[q.id]);
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        padding: '8px 0',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        border: isSelected
                          ? '2px solid #0ea5e9'
                          : isAnswered
                          ? '1px solid #10b981'
                          : '1px solid var(--border-subtle)',
                        background: isSelected
                          ? 'rgba(14, 165, 233, 0.2)'
                          : isAnswered
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'var(--bg-tertiary)',
                        color: isSelected ? 'var(--accent-sky)' : isAnswered ? '#059669' : 'var(--text-secondary)',
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Phần 2: Đọc hiểu (阅读)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {exam.questions
                .filter((q) => q.section === 'reading')
                .map((q) => {
                  const globalIdx = exam.questions.findIndex((item) => item.id === q.id);
                  const isSelected = currentIndex === globalIdx;
                  const isAnswered = Boolean(answers[q.id]);
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(globalIdx)}
                      style={{
                        padding: '8px 0',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        border: isSelected
                          ? '2px solid #f59e0b'
                          : isAnswered
                          ? '1px solid #10b981'
                          : '1px solid var(--border-subtle)',
                        background: isSelected
                          ? 'rgba(245, 158, 11, 0.2)'
                          : isAnswered
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'var(--bg-tertiary)',
                        color: isSelected ? 'var(--accent-gold)' : isAnswered ? '#059669' : 'var(--text-secondary)',
                      }}
                    >
                      {globalIdx + 1}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right Area: Active Question Workspace */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          {/* Question Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                className={`badge ${currentQ.section === 'listening' ? 'badge-sky' : 'badge-gold'}`}
                style={{ fontSize: '0.8rem' }}
              >
                {currentQ.section === 'listening' ? 'Phần Nghe hiểu' : 'Phần Đọc hiểu'}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                Câu {currentIndex + 1} / {exam.totalQuestions} ({currentQ.points} điểm)
              </span>
            </div>
          </div>

          {/* Listening audio trigger */}
          {currentQ.section === 'listening' && currentQ.audioPrompt && (
            <div
              style={{
                marginBottom: '20px',
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(14, 165, 233, 0.08)',
                border: '1px solid rgba(14, 165, 233, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <button
                onClick={() => handlePlayAudio(currentQ.audioPrompt!)}
                disabled={isPlayingAudio}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                }}
              >
                <Volume2 size={18} />
                <span>{isPlayingAudio ? 'Đang phát âm thanh...' : 'Bấm nghe câu đọc (Audio)'}</span>
              </button>

              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Nghe kỹ và đối chiếu câu hỏi bên dưới để chọn câu trả lời chính xác.
              </span>
            </div>
          )}

          {/* Prompt */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '6px' }}>
              {currentQ.prompt}
            </h4>
            {currentQ.pinyin && (
              <div style={{ fontSize: '0.9rem', color: '#0ea5e9', fontFamily: 'monospace' }}>
                {currentQ.pinyin}
              </div>
            )}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              const isCorrectOpt = isSubmitted && opt.id === currentQ.correctAnswer;
              const isWrongOpt = isSubmitted && isSelected && !isCorrectOpt;

              let border = isSelected ? '2px solid #e11d48' : '1px solid var(--border-subtle)';
              let bg = isSelected ? 'rgba(225, 29, 72, 0.12)' : 'var(--bg-tertiary)';

              if (isSubmitted) {
                if (isCorrectOpt) {
                  border = '2px solid #10b981';
                  bg = 'rgba(16, 185, 129, 0.15)';
                } else if (isWrongOpt) {
                  border = '2px solid #ef4444';
                  bg = 'rgba(239, 68, 68, 0.15)';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border,
                    background: bg,
                    cursor: isSubmitted ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#e11d48' : 'var(--bg-card)',
                      border: isSelected ? 'none' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}
                  >
                    {opt.id}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                      {opt.text}
                    </div>
                    {opt.pinyin && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {opt.pinyin}
                      </div>
                    )}
                  </div>

                  {isSubmitted && isCorrectOpt && (
                    <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                  )}
                  {isSubmitted && isWrongOpt && (
                    <XCircle size={20} style={{ color: '#ef4444' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isSubmitted && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontWeight: '700', color: '#34d399', marginBottom: '6px' }}>
                Đáp án đúng: {currentQ.correctAnswer}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {currentQ.explanation}
              </div>
            </div>
          )}

          {/* Navigation Prev / Next */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={16} />
              <span>Câu trước</span>
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
              disabled={currentIndex === exam.questions.length - 1}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <span>Câu tiếp</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '450px',
              width: '100%',
              padding: '28px',
              border: '1px solid rgba(225, 29, 72, 0.4)',
              textAlign: 'center',
            }}
          >
            <AlertTriangle size={42} style={{ color: '#fbbf24', margin: '0 auto 14px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '10px' }}>
              Xác nhận nộp bài thi?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Bạn đã hoàn thành <strong>{answeredCount} / {exam.totalQuestions}</strong> câu hỏi.
              {answeredCount < exam.totalQuestions && (
                <span style={{ color: '#f87171', display: 'block', marginTop: '6px' }}>
                  Lưu ý: Bạn vẫn còn {exam.totalQuestions - answeredCount} câu chưa chọn đáp án!
                </span>
              )}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                Làm tiếp
              </button>

              <button
                onClick={handleSubmitExam}
                className="btn-primary"
                style={{ padding: '10px 20px' }}
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
