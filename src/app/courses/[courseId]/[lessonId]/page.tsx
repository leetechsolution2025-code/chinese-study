'use client';

import React, { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  PenTool,
  Layers,
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  Download,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson } from '@/types';
import { AudioButton } from '@/components/common/AudioButton';
import { useSpeech } from '@/hooks/useSpeech';
import { useLanguage } from '@/context/LanguageContext';

interface LessonWorkspaceProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default function LessonWorkspacePage({ params }: LessonWorkspaceProps) {
  const { courseId, lessonId } = use(params);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'dialogue' | 'vocab' | 'grammar' | 'writing' | 'quiz'>('dialogue');
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null);

  const { speak } = useSpeech();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const tab = sp.get('tab');
      if (tab && ['dialogue', 'vocab', 'grammar', 'writing', 'quiz'].includes(tab)) {
        setActiveTab(tab as any);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (nativeAudioRef.current) {
        nativeAudioRef.current.pause();
      }
    };
  }, [lessonId]);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setLesson(json.data);
          if (json.data.completed) {
            setQuizScore(json.data.score || 100);
            setQuizSubmitted(true);
          }
        }
      })
      .catch((e) => console.error('Failed to load lesson details:', e))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handlePlayFullDialogue = () => {
    if (!lesson) return;
    const fullText = lesson.dialogue.map((d) => `${d.speaker}说：${d.hanzi}`).join('。');
    speak(fullText, 0.85);
  };

  const handleToggleNativeAudio = () => {
    if (!lesson?.audioFile) return;

    if (isPlayingNative) {
      if (nativeAudioRef.current) {
        nativeAudioRef.current.pause();
      }
      setIsPlayingNative(false);
      return;
    }

    if (nativeAudioRef.current) {
      nativeAudioRef.current.pause();
    }

    const audio = new Audio(lesson.audioFile);
    nativeAudioRef.current = audio;
    setIsPlayingNative(true);

    audio.play().catch((err) => {
      console.warn('Native audio play error:', err);
      setIsPlayingNative(false);
    });

    audio.onended = () => setIsPlayingNative(false);
    audio.onerror = () => setIsPlayingNative(false);
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!lesson) return;

    let correctCount = 0;
    lesson.quizData.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / lesson.quizData.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 60) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Gửi kết quả lên SQLite backend
    fetch(`/api/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, score }),
    }).catch((e) => console.error('Failed to submit lesson completion:', e));
  };

  if (!lesson && !loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
        <h2>{isEn ? 'Lesson not found' : 'Không tìm thấy bài học'}</h2>
        <Link href={`/courses/${courseId}`} className="btn-secondary" style={{ marginTop: '16px', display: 'inline-flex' }}>
          {isEn ? 'Back to course overview' : 'Quay lại danh sách bài học'}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Breadcrumb & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link
          href={`/courses/${courseId}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>{isEn ? `Course ${courseId.toUpperCase()}` : `Lộ trình ${courseId.toUpperCase()}`}</span>
        </Link>

        {lesson?.completed && (
          <span className="badge badge-emerald">
            <CheckCircle2 size={13} />
            <span>{isEn ? `Completed (${lesson.score} pts)` : `Đã hoàn thành (${lesson.score}đ)`}</span>
          </span>
        )}
      </div>

      {/* Lesson Hero Header */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-crimson">
              {isEn ? `Lesson ${lesson?.lessonNumber}` : `Bài ${lesson?.lessonNumber}`}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {isEn ? 'HSK Standard Curriculum' : 'Giáo trình Chuẩn HSK'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-hanzi)',
                lineHeight: '1.1',
              }}
            >
              {lesson?.titleHanzi}
            </h1>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-crimson)' }}>
                {lesson?.titlePinyin}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                {isEn ? (lesson?.titleEn || lesson?.titleVi) : lesson?.titleVi}
              </div>
            </div>
            {lesson && <AudioButton text={lesson.titleHanzi} size={20} />}
          </div>
        </div>

        {/* Tab Switcher Buttons */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          {[
            { id: 'dialogue', label: isEn ? 'Dialogue (课文)' : 'Bài khóa (课文)' },
            { id: 'vocab', label: isEn ? `Vocabulary (${lesson?.vocabularies?.length || 0})` : `Từ vựng (${lesson?.vocabularies?.length || 0})` },
            { id: 'grammar', label: isEn ? 'Grammar (语法)' : 'Ngữ pháp (语法)' },
            { id: 'writing', label: isEn ? `Writing (${lesson?.writingChars?.length || 0})` : `Tập viết (${lesson?.writingChars?.length || 0})` },
            { id: 'quiz', label: isEn ? 'Practice (练习)' : 'Luyện tập (练习)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === tab.id ? 'var(--accent-crimson)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Bài khóa hội thoại (Dialogue) */}
      {activeTab === 'dialogue' && lesson && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
              {isEn ? 'Situational Dialogue' : 'Hội thoại tình huống'}
            </h3>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {lesson?.audioFile && (
                <button
                  type="button"
                  onClick={handleToggleNativeAudio}
                  className="btn-secondary"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    borderColor: isPlayingNative ? 'var(--accent-crimson)' : undefined,
                    color: isPlayingNative ? 'var(--accent-crimson)' : undefined,
                  }}
                >
                  {isPlayingNative ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>
                    {isPlayingNative
                      ? (isEn ? 'Stop Native Audio' : 'Dừng Audio BLCUP')
                      : (isEn ? 'Native BLCUP Audio' : 'Audio gốc BLCUP')}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowPinyin(!showPinyin)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                {showPinyin ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>
                  {showPinyin
                    ? (isEn ? 'Hide Pinyin' : 'Ẩn Pinyin')
                    : (isEn ? 'Show Pinyin' : 'Hiện Pinyin')}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowTranslation(!showTranslation)}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                <span>
                  {showTranslation
                    ? (isEn ? 'Hide Meaning' : 'Ẩn dịch nghĩa')
                    : (isEn ? 'Show Meaning' : 'Hiện dịch nghĩa')}
                </span>
              </button>

              <button
                type="button"
                onClick={handlePlayFullDialogue}
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                <Volume2 size={14} />
                <span>{isEn ? 'Listen All' : 'Nghe toàn bài'}</span>
              </button>
            </div>
          </div>

          {/* Dialogue Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {lesson.dialogue.map((line, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e11d48, #be123c)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      flexShrink: 0,
                    }}
                  >
                    {line.speaker}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-hanzi)',
                      }}
                    >
                      {line.hanzi}
                    </div>

                    {showPinyin && (
                      <div style={{ fontSize: '0.9rem', color: 'var(--accent-crimson)', marginTop: '2px', fontWeight: '500' }}>
                        {line.pinyin}
                      </div>
                    )}

                    {showTranslation && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {isEn ? (line.en || line.vi) : line.vi}
                      </div>
                    )}
                  </div>
                </div>

                <AudioButton text={line.hanzi} size={18} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Từ vựng mới (Vocabularies) */}
      {activeTab === 'vocab' && lesson && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '18px' }}>
            {isEn
              ? `Lesson Vocabulary (${lesson.vocabularies.length} words)`
              : `Từ vựng mới bài học (${lesson.vocabularies.length} từ)`}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {lesson.vocabularies.map((vocab) => (
              <div
                key={vocab.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontSize: '2.2rem',
                          fontWeight: '800',
                          color: '#fb7185',
                          fontFamily: 'var(--font-hanzi)',
                          lineHeight: '1',
                        }}
                      >
                        {vocab.hanzi}
                      </span>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {vocab.pinyin}
                        </div>
                        {isEn ? (
                          <span className="badge badge-gold" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                            Radical: {vocab.radical || 'General'}
                          </span>
                        ) : (
                          <span className="badge badge-gold" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                            Hán-Việt: {vocab.hanviet}
                          </span>
                        )}
                      </div>
                    </div>

                    <AudioButton text={vocab.hanzi} size={16} />
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '600', marginTop: '10px' }}>
                    {isEn ? (vocab.meaningEn || vocab.meaning) : vocab.meaning}
                  </div>

                  {vocab.exampleHanzi && (
                    <div style={{ marginTop: '10px', padding: '8px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', fontSize: '0.78rem' }}>
                      <div style={{ color: 'var(--text-primary)' }}>{vocab.exampleHanzi}</div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {isEn ? (vocab.exampleMeaningEn || vocab.exampleMeaning) : vocab.exampleMeaning}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <Link
                    href="/writing"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <PenTool size={12} />
                    <span>{isEn ? 'Practice Writing' : 'Tập viết chữ'}</span>
                  </Link>

                  <Link
                    href="/flashcards"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      marginLeft: 'auto',
                    }}
                  >
                    <Layers size={12} />
                    <span>{isEn ? 'Add to SRS' : 'Thêm vào SRS'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Điểm ngữ pháp (Grammar Points) */}
      {activeTab === 'grammar' && lesson && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {lesson.grammarPoints.map((gp, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="badge badge-crimson">
                  {isEn ? `Grammar ${idx + 1}` : `Ngữ pháp ${idx + 1}`}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {gp.title}
                </h3>
              </div>

              {gp.structure && (
                <div
                  style={{
                    padding: '10px 14px',
                    background: 'var(--accent-crimson-light)',
                    border: '1px solid rgba(225, 29, 72, 0.25)',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: 'var(--accent-crimson)',
                    marginBottom: '14px',
                    display: 'inline-block',
                  }}
                >
                  {isEn ? `Structure: ${gp.structure}` : `Cấu trúc: ${gp.structure}`}
                </div>
              )}

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '16px' }}>
                {gp.explanation}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {gp.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="feature-bullet-item"
                    style={{
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {ex.hanzi}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--accent-crimson)', marginTop: '2px' }}>
                        {ex.pinyin}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {ex.vi}
                      </div>
                    </div>
                    <AudioButton text={ex.hanzi} size={15} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Tập viết chữ Hán & Quy tắc bút thuận */}
      {activeTab === 'writing' && lesson && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                {isEn ? 'Hanzi Writing & Stroke Practice' : 'Tập viết chữ Hán & Quy tắc bút thuận'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {isEn
                  ? 'Key characters and radicals introduced in this lesson based on the official writing workbook.'
                  : 'Các chữ Hán và bộ thủ trọng tâm cần luyện viết theo Vở Tập Viết Chuẩn HSK 1.'}
              </p>
            </div>

            <a
              href="/docs/hsk1/tap-viet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} />
              <span>{isEn ? 'Download Writing Sheet PDF' : 'Tải Vở Tập Viết PDF'}</span>
            </a>
          </div>

          {/* Radicals Section */}
          {lesson.radicals && lesson.radicals.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
                {isEn ? 'Radicals in this lesson:' : 'Bộ thủ trong bài học:'}
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {lesson.radicals.map((rad, rIdx) => (
                  <div
                    key={rIdx}
                    className="glass-card"
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-hanzi)', color: 'var(--accent-crimson)', fontWeight: 'bold' }}>
                      {rad.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {rad}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Writing Characters Grid */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px', color: 'var(--text-primary)' }}>
              {isEn ? 'Characters to write:' : 'Chữ Hán luyện viết:'}
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '14px',
              }}
            >
              {(lesson.writingChars || []).map((char, cIdx) => (
                <div
                  key={cIdx}
                  className="glass-card"
                  style={{
                    padding: '20px 16px',
                    borderRadius: '14px',
                    textAlign: 'center',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '12px',
                      background: 'var(--bg-tertiary)',
                      border: '1px dashed var(--accent-crimson)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      fontFamily: 'var(--font-hanzi)',
                      color: 'var(--text-primary)',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
                    }}
                  >
                    {char}
                  </div>
                  <Link
                    href={`/writing`}
                    className="btn-secondary"
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.78rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <PenTool size={12} />
                    <span>{isEn ? 'Practice' : 'Tập vẽ nét'}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Luyện tập kiểm tra (Practice Quiz) */}
      {activeTab === 'quiz' && lesson && (
        <div className="glass-panel" style={{ padding: '28px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {isEn
                ? `Review Quiz (${lesson.quizData.length} questions)`
                : `Bài tập củng cố kiến thức (${lesson.quizData.length} câu)`}
            </h3>

            {quizSubmitted && (
              <span className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                {isEn ? `Score: ${quizScore} / 100` : `Điểm số: ${quizScore} / 100`}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {lesson.quizData.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  style={{
                    padding: '18px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '14px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px' }}>
                    {isEn ? `Question ${qIndex + 1}:` : `Câu ${qIndex + 1}:`} {q.question}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnBg = 'var(--bg-card)';
                      let btnBorder = 'var(--border-subtle)';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnBg = 'rgba(16, 185, 129, 0.25)';
                          btnBorder = '#10b981';
                        } else if (isSelected) {
                          btnBg = 'rgba(239, 68, 68, 0.25)';
                          btnBorder = '#ef4444';
                        }
                      } else if (isSelected) {
                        btnBg = 'rgba(225, 29, 72, 0.2)';
                        btnBorder = '#fb7185';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          style={{
                            textAlign: 'left',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: btnBg,
                            border: `1px solid ${btnBorder}`,
                            color: 'var(--text-primary)',
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            fontSize: '0.92rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 size={16} color="#10b981" />
                          )}
                          {quizSubmitted && isSelected && optIdx !== q.correctIndex && (
                            <XCircle size={16} color="#ef4444" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      💡 <strong>{isEn ? 'Explanation:' : 'Giải thích:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="btn-primary"
                style={{ padding: '14px', fontSize: '1rem' }}
              >
                <span>{isEn ? 'Submit & Grade Quiz' : 'Nộp bài & Chấm điểm'}</span>
              </button>
            ) : (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399', marginBottom: '8px' }}>
                  {isEn ? '✓ Progress successfully recorded' : '✓ Đã lưu tiến độ hoàn thành bài học vào SQLite'}
                </div>
                <Link href={`/courses/${courseId}`} className="btn-secondary">
                  <span>{isEn ? 'View upcoming lessons' : 'Xem các bài học tiếp theo'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
