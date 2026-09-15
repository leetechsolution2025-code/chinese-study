'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Volume2,
  Layers,
  BookOpen,
  MessageSquare,
  ArrowRight,
  Flame,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Trophy,
  Target,
  ChevronRight,
} from 'lucide-react';
import { AudioButton } from '@/components/common/AudioButton';
import { storage, UserStats } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';
import hsk1Data from '@/data/hsk1_vocab.json';

export default function HomePage() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [stats, setStats] = useState<UserStats>({
    streak: 3,
    lastStudyDate: '',
    totalWordsLearned: 15,
    charactersWritten: 8,
    tonesPracticed: 12,
  });

  useEffect(() => {
    setStats(storage.getUserStats());
  }, []);

  // Chữ Hán tiêu biểu hôm nay: Học (xué)
  const wordOfDay = (hsk1Data as Array<{
    hanzi: string;
    pinyin: string;
    hanviet: string;
    meaning: string;
    meaningEn?: string;
    partOfSpeech?: string;
    exampleHanzi: string;
    examplePinyin: string;
    exampleMeaning: string;
    exampleMeaningEn?: string;
  }>)[6] || {
    hanzi: '学',
    pinyin: 'xué',
    hanviet: 'HỌC',
    meaning: 'Học, học tập, bắt chước',
    meaningEn: 'Study, learn, imitate',
    partOfSpeech: 'Động từ',
    exampleHanzi: '我在学中文。',
    examplePinyin: 'Wǒ zài xué Zhōngwén.',
    exampleMeaning: 'Tôi đang học tiếng Trung.',
    exampleMeaningEn: 'I am learning Chinese.',
  };

  const vocabProgressPercent = Math.min(100, Math.round((stats.totalWordsLearned / 150) * 100));
  const writingProgressPercent = Math.min(100, Math.round((stats.charactersWritten / 150) * 100));

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* =========================================================================
          1. HERO SECTION: Split-grid, Punchy, Live Hanzi Widget
          ========================================================================= */}
      <section className="hero-banner" style={{ padding: '36px 36px' }}>
        <div className="hero-split-grid">
          {/* Left Column: Value Proposition & CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-crimson" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={12} />
                <span>{isEn ? 'Standard HSK Curriculum' : 'Phương pháp tối ưu cho người Việt'}</span>
              </span>
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={12} />
                <span>{isEn ? `${stats.streak}-Day Streak` : `Chuỗi ${stats.streak} ngày`}</span>
              </span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              {isEn ? 'Master Mandarin Chinese' : 'Học tiếng Trung chuẩn'} <br />
              <span className="gradient-text">
                {isEn ? 'from Core Radicals & Pinyin' : 'từ âm Hán - Việt & chiết tự'}
              </span>
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.55',
                maxWidth: '520px',
              }}
            >
              {isEn
                ? 'Unlock Hanzi characters via 214 core radicals, perfect your 4 tones with visual pitch contours, and practice real-life dialogues with AI.'
                : 'Bẻ khóa nghĩa chữ Hán qua 214 bộ thủ, chuẩn hóa cao độ 4 thanh điệu và luyện đàm thoại phản xạ cùng AI.'}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <Link href="/courses" className="btn-primary" style={{ padding: '12px 24px' }}>
                <GraduationCap size={18} />
                <span>{isEn ? 'Explore HSK Courses' : 'Vào lớp học HSK'}</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/exams" className="btn-gold" style={{ padding: '12px 20px' }}>
                <Trophy size={18} />
                <span>{isEn ? 'Mock Exams' : 'Thi thử HSK'}</span>
              </Link>

              <Link href="/practice" className="btn-secondary" style={{ padding: '12px 18px' }}>
                <Target size={18} />
                <span>{isEn ? 'Practice' : 'Luyện tập'}</span>
              </Link>
            </div>

            {/* Quick Value Badges */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '8px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} color="#10b981" /> {isEn ? '146 lessons across HSK 1 - 6' : '146 bài học HSK 1 - 6'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} color="#10b981" /> {isEn ? 'Tian Zi Ge Stroke Grid' : 'Lưới điền chữ 田字格'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} color="#10b981" /> {isEn ? 'Gemini AI Speaking Partner' : 'Trợ lý đối thoại Gemini AI'}
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Hanzi Card */}
          <div className="live-hanzi-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                <Sparkles size={11} /> {isEn ? 'Character of the Day' : 'Chữ Hán tiêu biểu hôm nay'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                HSK 1 • 8 {isEn ? 'strokes' : 'nét'}
              </span>
            </div>

            {/* Hanzi Presentation Center */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    fontSize: '3.6rem',
                    fontWeight: '900',
                    color: 'var(--accent-crimson)',
                    fontFamily: 'var(--font-hanzi)',
                    lineHeight: '1',
                    filter: 'drop-shadow(0 2px 8px rgba(225, 29, 72, 0.2))',
                  }}
                >
                  {wordOfDay.hanzi}
                </div>

                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {wordOfDay.pinyin}
                  </div>
                  <div style={{ display: 'inline-block', marginTop: '2px' }}>
                    {!isEn ? (
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '1px 6px' }}>
                        Hán-Việt: {wordOfDay.hanviet}
                      </span>
                    ) : (
                      <span className="badge badge-sky" style={{ fontSize: '0.72rem', padding: '1px 6px' }}>
                        {wordOfDay.partOfSpeech || 'Verb'} • HSK 1
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {isEn ? (wordOfDay.meaningEn || wordOfDay.meaning) : wordOfDay.meaning}
                  </div>
                </div>
              </div>

              <AudioButton text={wordOfDay.hanzi} size={20} />
            </div>

            {/* Example sentence */}
            <div
              style={{
                marginTop: '12px',
                padding: '10px 12px',
                background: 'rgba(225, 29, 72, 0.05)',
                border: '1px solid rgba(225, 29, 72, 0.15)',
                borderRadius: '10px',
                fontSize: '0.82rem',
              }}
            >
              <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                {wordOfDay.exampleHanzi}
              </div>
              <div style={{ color: 'var(--accent-crimson)', fontSize: '0.78rem', marginTop: '2px' }}>
                {wordOfDay.examplePinyin}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '1px' }}>
                {isEn ? (wordOfDay.exampleMeaningEn || wordOfDay.exampleMeaning) : wordOfDay.exampleMeaning}
              </div>
            </div>

            {/* Quick Practice Link */}
            <Link
              href="/writing"
              style={{
                marginTop: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                color: 'var(--accent-crimson)',
                fontSize: '0.82rem',
                fontWeight: '700',
                transition: 'all 0.18s ease',
              }}
            >
              <PenTool size={14} />
              <span>{isEn ? 'Practice writing this on Tian Zi Ge' : 'Tập viết chữ này trên Canvas 田字格'}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. DASHBOARD PROGRESS STRIP: 4 Interactive Bento Status Tiles
          ========================================================================= */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Tile 1: Streak */}
        <div className="stat-bento-tile">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {isEn ? 'Study Streak' : 'Chuỗi học liên tục'}
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b',
              }}
            >
              <Flame size={20} />
            </div>
          </div>

          <div style={{ marginTop: '6px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.streak} <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{isEn ? 'days' : 'ngày'}</span>
            </div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
              {(isEn ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']).map((day, idx) => (
                <div
                  key={day}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: idx < 3 ? '#f59e0b' : 'var(--border-subtle)',
                  }}
                  title={day}
                />
              ))}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '600', marginTop: '6px' }}>
              {isEn ? '✓ Today\'s goal completed' : '✓ Mục tiêu hôm nay đã đạt'}
            </div>
          </div>
        </div>

        {/* Tile 2: Vocab Learned */}
        <div className="stat-bento-tile">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {isEn ? 'HSK 1 Vocabulary' : 'Từ vựng HSK 1'}
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(225, 29, 72, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e11d48',
              }}
            >
              <Layers size={18} />
            </div>
          </div>

          <div style={{ marginTop: '6px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.totalWordsLearned} <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>/ 150 {isEn ? 'words' : 'từ'}</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ width: `${vocabProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #e11d48, #fb7185)', borderRadius: '3px' }} />
            </div>
            <Link href="/flashcards" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--accent-crimson)', fontWeight: '600', marginTop: '6px' }}>
              <span>{isEn ? 'Review SRS Flashcards' : 'Ôn tập Flashcard SRS'}</span>
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>

        {/* Tile 3: Characters Written */}
        <div className="stat-bento-tile">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {isEn ? 'Hanzi Writing' : 'Tập viết chữ Hán'}
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <PenTool size={18} />
            </div>
          </div>

          <div style={{ marginTop: '6px' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.charactersWritten} <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)' }}>/ 150 {isEn ? 'chars' : 'chữ'}</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ width: `${writingProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '3px' }} />
            </div>
            <Link href="/writing" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#10b981', fontWeight: '600', marginTop: '6px' }}>
              <span>{isEn ? 'Stroke Canvas' : 'Đồ nét trên Canvas'}</span>
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>

        {/* Tile 4: Tone & Exam status */}
        <div className="stat-bento-tile">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {isEn ? 'HSK Mock Exams' : 'Thi thử HSK chuẩn'}
            </div>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(14, 165, 233, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0ea5e9',
              }}
            >
              <Trophy size={18} />
            </div>
          </div>

          <div style={{ marginTop: '6px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              HSK 1 - 6
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {isEn ? '35 - 135 mins (Listening & Reading)' : 'Đề thi 35 - 135 phút (Nghe & Đọc)'}
            </div>
            <Link href="/exams" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#0ea5e9', fontWeight: '600', marginTop: '8px' }}>
              <span>{isEn ? 'Enter exam hall' : 'Vào sảnh thi thử'}</span>
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CORE 4 PILLARS BENTO GRID: Action-Oriented, High Visuals, Low Text
          ========================================================================= */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {isEn ? 'Core Learning Pillars' : 'Các tính năng chính'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {isEn ? 'Select a module to start mastering Chinese step-by-step' : 'Chọn phân hệ bạn muốn khám phá và bắt đầu rèn luyện'}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '18px',
          }}
        >
          {/* Bento Card 1 (Span 7 cols): Lớp học HSK 1 - 6 */}
          <Link
            href="/courses"
            className="bento-interactive-card"
            style={{
              gridColumn: 'span 7',
              minHeight: '220px',
              borderTop: '3px solid #e11d48',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-crimson">
                  <GraduationCap size={13} /> {isEn ? 'Standard Curriculum' : 'Lộ trình chuẩn hóa'}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {isEn ? '146 Complete Lessons' : '146 bài học trọn vẹn'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'Standard HSK 1 - HSK 6 Courses' : 'Lớp học giáo trình chuẩn HSK 1 - HSK 6'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                {isEn
                  ? '4-step structured cycle: Listen to dialogues ➔ Master vocabulary ➔ Understand essential grammar ➔ Test your skills with auto-graded quizzes.'
                  : 'Chu trình 4 bước: Nghe bài khóa hội thoại ➔ Học từ vựng & âm Hán-Việt ➔ Nắm chắc ngữ pháp ➔ Luyện trắc nghiệm tự chấm điểm.'}
              </p>

              {/* 6 Level Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ padding: '4px 10px', background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 1 ({isEn ? '15 lessons' : '15 bài'})
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 2 ({isEn ? '15 lessons' : '15 bài'})
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 3 ({isEn ? '20 lessons' : '20 bài'})
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 4 ({isEn ? '20 lessons' : '20 bài'})
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 5 ({isEn ? '36 lessons' : '36 bài'})
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}>
                  HSK 6 ({isEn ? '40 lessons' : '40 bài'})
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48', fontWeight: '700', fontSize: '0.88rem', marginTop: '18px' }}>
              <span>{isEn ? 'Explore all courses' : 'Vào xem toàn bộ lớp học'}</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Bento Card 2 (Span 5 cols): Thi thử HSK */}
          <Link
            href="/exams"
            className="bento-interactive-card"
            style={{
              gridColumn: 'span 5',
              minHeight: '220px',
              borderTop: '3px solid #f59e0b',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-gold">
                  <Trophy size={13} /> {isEn ? 'Exam Simulation' : 'Phòng thi mô phỏng'}
                </span>
                <span className="badge badge-crimson" style={{ fontSize: '0.65rem' }}>{isEn ? 'NEW' : 'MỚI'}</span>
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'HSK Standard Mock Exams' : 'Thi thử HSK chuẩn format'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                {isEn
                  ? 'Separate Listening & Reading sections, countdown timer, auto-graded scoring and pass/fail evaluation.'
                  : 'Bộ đề thi phân tách rõ Nghe hiểu & Đọc hiểu, có đồng hồ đếm ngược, tự động chấm điểm và đánh giá Đạt/Chưa đạt.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>{isEn ? '• Standard Beijing audio' : '• Audio giọng Bắc Kinh'}</span>
                <span>{isEn ? '• SQLite history' : '• Lưu lịch sử SQLite'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: '700', fontSize: '0.88rem', marginTop: '18px' }}>
              <span>{isEn ? 'Start mock exam' : 'Bắt đầu thi thử'}</span>
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* Bento Card 3 (Span 4 cols): Tập viết & Chiết tự */}
          <Link
            href="/writing"
            className="bento-interactive-card"
            style={{
              gridColumn: 'span 4',
              borderTop: '3px solid #fb7185',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-crimson">
                  <PenTool size={13} /> {isEn ? 'Stroke Canvas' : 'Canvas 笔顺'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'Hanzi Writing & Radicals' : 'Tập viết chữ Hán & bộ thủ'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                {isEn
                  ? 'Trace animated stroke orders, practice on Tian Zi Ge grid, and explore 214 radicals.'
                  : 'Quan sát mô phỏng thứ tự từng nét vẽ, tự đồ nét trên lưới điền (田字格) và giải nghĩa 214 bộ thủ chiết tự.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{isEn ? '214 Radicals' : '214 Bộ thủ'}</span>
                <span>{isEn ? 'Stroke Evaluation' : 'Chấm điểm nét vẽ'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fb7185', fontWeight: '700', fontSize: '0.85rem', marginTop: '16px' }}>
              <span>{isEn ? 'Practice writing' : 'Luyện viết ngay'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Bento Card 4 (Span 4 cols): Thanh điệu & AI Speaking */}
          <Link
            href="/tones"
            className="bento-interactive-card"
            style={{
              gridColumn: 'span 4',
              borderTop: '3px solid #38bdf8',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-sky">
                  <Volume2 size={13} /> {isEn ? '5 Pitch Levels' : 'Cao độ 5 bậc'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'Master 4 Chinese Tones' : 'Luyện 4 thanh điệu chuẩn'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                {isEn
                  ? 'Visualize tonal contours (55, 35, 214, 51) and sharpen listening perception with audio quizzes.'
                  : 'Hiểu bản chất âm vực qua biểu đồ (55, 35, 214, 51), phân biệt rõ thanh 1 với thanh 4 qua trắc nghiệm thính giác.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span className="badge badge-sky" style={{ fontSize: '0.7rem' }}>{isEn ? 'Visual Pitch Graphs' : 'Biểu đồ trực quan'}</span>
                <span>{isEn ? 'Tone Ear Training' : 'Đoán âm thanh'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0ea5e9', fontWeight: '700', fontSize: '0.85rem', marginTop: '16px' }}>
              <span>{isEn ? 'Practice tones' : 'Luyện thanh điệu'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Bento Card 5 (Span 4 cols): AI Tutor & Đọc tương tác */}
          <Link
            href="/tutor"
            className="bento-interactive-card"
            style={{
              gridColumn: 'span 4',
              borderTop: '3px solid #a855f7',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-indigo">
                  <MessageSquare size={13} /> {isEn ? 'Gemini 2.5 Flash' : 'AI Gemini 2.5'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {isEn ? 'AI Conversational Tutor' : 'AI Tutor đàm thoại thực chiến'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                {isEn
                  ? 'Real-life scenario roleplay (greetings, dining, shopping, directions) with smart grammar correction.'
                  : 'Đối thoại phản xạ 4 tình huống đời sống (chào hỏi, gọi món, mua sắm, hỏi đường) có chữa lỗi ngữ pháp và gợi ý mẹo nói.'}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{isEn ? 'Grammar Correction' : 'Sửa ngữ pháp'}</span>
                <span>{isEn ? 'Native Accent' : 'Phát âm bản xứ'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a855f7', fontWeight: '700', fontSize: '0.85rem', marginTop: '16px' }}>
              <span>{isEn ? 'Chat with AI' : 'Trò chuyện cùng AI'}</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
