'use client';

import React, { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Volume2,
  VolumeX,
  FileText,
  PenTool,
  HelpCircle,
  Flame,
  Check,
} from 'lucide-react';
import { Course, Lesson } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import coursesData from '@/data/courses.json';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

const STAGES_CONFIG = [
  {
    stage: 1,
    id: 'stage-1',
    lessonRange: '1 - 4',
    titleVi: 'Chặng 1: Nhập môn Ngữ âm & Chào hỏi cơ bản',
    titleEn: 'Stage 1: Pinyin Phonetics & Basic Greetings',
    descVi: 'Làm quen bảng chữ cái Pinyin, 4 thanh điệu, thanh nhẹ, biến điệu và các đại từ xưng hô cốt lõi.',
    descEn: 'Master Pinyin initials/finals, 4 tones, neutral tones, sandhi rules, and fundamental pronouns.',
    badgeClass: 'badge-crimson',
    color: '#e11d48',
  },
  {
    stage: 2,
    id: 'stage-2',
    lessonRange: '5 - 7',
    titleVi: 'Chặng 2: Làm quen, Tuổi tác & Gia đình',
    titleEn: 'Stage 2: Family, Age & Daily Routine',
    descVi: 'Hỏi tuổi tác (几岁 / 多大), thành viên gia đình (口), kỹ năng năng lực (会) và ngày tháng thời gian.',
    descEn: 'Inquire about age, family members, acquired abilities (会), dates, and daily activities.',
    badgeClass: 'badge-gold',
    color: '#f59e0b',
  },
  {
    stage: 3,
    id: 'stage-3',
    lessonRange: '8 - 10',
    titleVi: 'Chặng 3: Mua sắm, Địa điểm & Không gian sống',
    titleEn: 'Stage 3: Locations, Directions & Shopping',
    descVi: 'Hỏi giá tiền (多少钱 / 块), mong muốn (想), vị trí không gian (在 / 上 / 下 / 前 / 后) và xin phép (能).',
    descEn: 'Ask prices and currency (多少钱/块), desires (想), spatial prepositions (在/上/下), and permission (能).',
    badgeClass: 'badge-emerald',
    color: '#10b981',
  },
  {
    stage: 4,
    id: 'stage-4',
    lessonRange: '11 - 15',
    titleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    titleEn: 'Stage 4: Schedules, Weather & Plans',
    descVi: 'Giờ giấc (点 / 分), thời tiết (怎么样), hành động tiếp diễn (在...呢), sự việc hoàn thành (了) và nhấn mạnh (是...的).',
    descEn: 'Tell time (点/分), talk about weather, ongoing actions (在...呢), completed actions (了), and emphasis (是...的).',
    badgeClass: 'badge-indigo',
    color: '#8b5cf6',
  },
];

export default function CourseLessonsPage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCourse(json.data.course);
          setLessons(json.data.lessons);
        }
      })
      .catch((e) => console.error('Failed to load course lessons:', e))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handlePlayPreview = (e: React.MouseEvent, lesson: Lesson) => {
    e.preventDefault();
    e.stopPropagation();

    if (!lesson.audioFile) return;

    if (playingAudioId === lesson.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudioId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(lesson.audioFile);
    audioRef.current = audio;
    setPlayingAudioId(lesson.id);

    audio.play().catch((err) => {
      console.warn('Audio play error:', err);
      setPlayingAudioId(null);
    });

    audio.onended = () => {
      setPlayingAudioId(null);
    };
    audio.onerror = () => {
      setPlayingAudioId(null);
    };
  };

  if (!course && !loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
        <h2>{isEn ? 'Course Not Found' : 'Không tìm thấy khóa học'}</h2>
        <Link href="/courses" className="btn-secondary" style={{ marginTop: '16px', display: 'inline-flex' }}>
          {isEn ? 'Back to Courses' : 'Quay lại danh sách lớp học'}
        </Link>
      </div>
    );
  }

  const currentCourse = course || (coursesData.courses.find((c) => c.id === courseId) as Course);
  const completedLessonsCount = lessons.filter((l) => l.completed).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedLessonsCount / lessons.length) * 100) : 0;

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return lesson.completed;
    if (activeFilter.startsWith('stage-')) {
      const stageNum = parseInt(activeFilter.replace('stage-', ''), 10);
      return (lesson.stage || 1) === stageNum;
    }
    return true;
  });

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Back to courses navigation */}
      <div>
        <Link
          href="/courses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            marginBottom: '14px',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>{isEn ? 'Back to Courses' : 'Danh sách lớp học'}</span>
        </Link>

        {/* Course Banner Header */}
        <div
          className="glass-card"
          style={{
            padding: '28px 32px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%)',
            border: '1px solid rgba(225, 29, 72, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span
                className="badge"
                style={{
                  backgroundColor: `${currentCourse?.color || '#e11d48'}20`,
                  color: currentCourse?.color || '#fb7185',
                  border: `1px solid ${currentCourse?.color || '#e11d48'}50`,
                  fontWeight: '700',
                }}
              >
                {isEn ? `HSK Level ${currentCourse?.level}` : `Cấp độ HSK ${currentCourse?.level} Chuẩn BLCUP`}
              </span>
              <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={13} />
                <span>150 {isEn ? 'Essential Words' : 'từ vựng cốt lõi'}</span>
              </span>
              <span className="badge badge-sky">
                {lessons.length} {isEn ? 'Standard Lessons' : 'bài học chuẩn'}
              </span>
            </div>

            <h1 style={{ fontSize: '2.4rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              {isEn && currentCourse?.titleEn ? currentCourse.titleEn : currentCourse?.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '8px', lineHeight: '1.6' }}>
              {isEn && currentCourse?.descriptionEn ? currentCourse.descriptionEn : currentCourse?.description}
            </p>
          </div>

          {/* Progress gauge card */}
          <div
            style={{
              minWidth: '200px',
              padding: '20px',
              background: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>
              {isEn ? 'Course Progress' : 'Tiến độ học tập'}
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--accent-crimson)' }}>
              {progressPercent}%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              {completedLessonsCount} / {lessons.length} {isEn ? 'completed' : 'bài xong'}
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: 'var(--bg-tertiary)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #e11d48, #fb7185)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Official BLCUP Resource Hub (Tủ tài liệu chính khóa) */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          borderRadius: '18px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--accent-crimson)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>
              {isEn ? 'Official BLCUP Curriculum Resources' : 'Tủ tài liệu chuẩn Giáo trình ĐH Ngôn ngữ Bắc Kinh (BLCUP)'}
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {isEn ? 'Textbooks, Workbooks & Listening Audios' : 'Đầy đủ SGK, SBT, Vở tập viết & 86 file Audio MP3'}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {/* Resource 1: Sách giáo khoa */}
          <a
            href="/docs/hsk1/sach-giao-khoa.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(225, 29, 72, 0.15)',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {isEn ? 'Textbook PDF (143p)' : 'Sách Giáo Khoa (143 tr)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isEn ? '15 Full Lessons' : '15 bài khóa & ngữ pháp'}
              </div>
            </div>
          </a>

          {/* Resource 2: Sách bài tập */}
          <a
            href="/docs/hsk1/sach-bai-tap.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(14, 165, 233, 0.15)',
                color: '#0ea5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {isEn ? 'Workbook PDF (137p)' : 'Sách Bài Tập (137 tr)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isEn ? 'Listening & Reading' : 'Đề luyện thi & bài tập'}
              </div>
            </div>
          </a>

          {/* Resource 3: Vở tập viết */}
          <a
            href="/docs/hsk1/tap-viet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <PenTool size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {isEn ? 'Writing Practice (34p)' : 'Vở Tập Viết (34 tr)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isEn ? 'Stroke Order Sheets' : 'Bút thuận từng chữ Hán'}
              </div>
            </div>
          </a>

          {/* Resource 4: Đáp án SGK & SBT */}
          <a
            href="/docs/hsk1/dap-an-sbt.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Check size={22} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {isEn ? 'Answer Keys & Transcripts' : 'Đáp Án & Kịch Bản Audio'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {isEn ? 'Textbook & Workbook' : 'Tra cứu lời giải SBT'}
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            border: activeFilter === 'all' ? '1px solid var(--accent-crimson)' : '1px solid transparent',
            background: activeFilter === 'all' ? 'rgba(225, 29, 72, 0.15)' : 'transparent',
            color: activeFilter === 'all' ? 'var(--accent-crimson)' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {isEn ? `All Lessons (${lessons.length})` : `Tất cả bài học (${lessons.length})`}
        </button>

        {STAGES_CONFIG.map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => setActiveFilter(st.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: 'pointer',
              border: activeFilter === st.id ? `1px solid ${st.color}` : '1px solid transparent',
              background: activeFilter === st.id ? `${st.color}20` : 'transparent',
              color: activeFilter === st.id ? st.color : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {isEn ? `Stage ${st.stage} (${st.lessonRange})` : `Chặng ${st.stage} (Bài ${st.lessonRange})`}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setActiveFilter('completed')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            border: activeFilter === 'completed' ? '1px solid #10b981' : '1px solid transparent',
            background: activeFilter === 'completed' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: activeFilter === 'completed' ? '#10b981' : 'var(--text-secondary)',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {isEn ? `Completed (${completedLessonsCount})` : `Đã hoàn thành (${completedLessonsCount})`}
        </button>
      </div>

      {/* Lesson List Rendered by Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {STAGES_CONFIG.map((stageConfig) => {
          // Find lessons belonging to this stage
          const stageLessons = filteredLessons.filter((l) => (l.stage || 1) === stageConfig.stage);
          if (stageLessons.length === 0) return null;

          const stageCompletedCount = stageLessons.filter((l) => l.completed).length;

          return (
            <div key={stageConfig.id} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Stage Header Banner */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: 'var(--bg-secondary)',
                  borderLeft: `4px solid ${stageConfig.color}`,
                  borderTop: '1px solid var(--border-subtle)',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                      {isEn ? stageConfig.titleEn : stageConfig.titleVi}
                    </h2>
                    <span className={`badge ${stageConfig.badgeClass}`} style={{ fontSize: '0.72rem' }}>
                      {isEn ? `Lessons ${stageConfig.lessonRange}` : `Bài ${stageConfig.lessonRange}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {isEn ? stageConfig.descEn : stageConfig.descVi}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    color: stageCompletedCount === stageLessons.length ? '#10b981' : 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stageCompletedCount}/{stageLessons.length} {isEn ? 'completed' : 'hoàn thành'}
                </span>
              </div>

              {/* Lesson Cards inside this stage */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stageLessons.map((lesson) => {
                  const isCompleted = lesson.completed;
                  const isPlaying = playingAudioId === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      className="glass-card"
                      style={{
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: isCompleted
                          ? '1px solid rgba(16, 185, 129, 0.35)'
                          : '1px solid var(--border-subtle)',
                        background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Top row: Badges, Title, Audio & Primary Action */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: '16px',
                        }}
                      >
                        {/* Left: Lesson Number & Main Titles */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                          {/* Circle Badge with number */}
                          <div
                            style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '14px',
                              background: isCompleted
                                ? 'rgba(16, 185, 129, 0.15)'
                                : 'var(--bg-tertiary)',
                              border: isCompleted
                                ? '1px solid rgba(16, 185, 129, 0.4)'
                                : '1px solid var(--border-subtle)',
                              color: isCompleted ? '#10b981' : 'var(--text-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '900',
                              fontSize: '1.05rem',
                              flexShrink: 0,
                            }}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={26} />
                            ) : isEn ? (
                              `L${lesson.lessonNumber}`
                            ) : (
                              `B${lesson.lessonNumber}`
                            )}
                          </div>

                          {/* Hanzi title, Pinyin, translation & objectives */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                              <span
                                style={{
                                  fontSize: '1.6rem',
                                  fontWeight: '900',
                                  color: 'var(--text-primary)',
                                  fontFamily: 'var(--font-hanzi)',
                                  letterSpacing: '0.04em',
                                }}
                              >
                                {lesson.titleHanzi}
                              </span>
                              <span style={{ fontSize: '1.05rem', color: 'var(--accent-crimson)', fontWeight: '700' }}>
                                {lesson.titlePinyin}
                              </span>
                              <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                • {isEn && lesson.titleEn ? lesson.titleEn : lesson.titleVi}
                              </span>
                            </div>

                            {/* First core objective */}
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                              🎯 {isEn && lesson.objectivesEn?.[0] ? lesson.objectivesEn[0] : (lesson.objectives?.[0] || '')}
                            </div>
                          </div>
                        </div>

                        {/* Right: Audio Preview button & Main Action */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          {lesson.audioFile && (
                            <button
                              type="button"
                              onClick={(e) => handlePlayPreview(e, lesson)}
                              className="btn-secondary"
                              style={{
                                padding: '8px 14px',
                                fontSize: '0.82rem',
                                borderColor: isPlaying ? 'var(--accent-crimson)' : undefined,
                                color: isPlaying ? 'var(--accent-crimson)' : undefined,
                              }}
                              title={isEn ? 'Listen to native audio' : 'Nghe audio phát âm bản ngữ'}
                            >
                              {isPlaying ? <VolumeX size={15} /> : <Volume2 size={15} />}
                              <span>{isPlaying ? (isEn ? 'Playing...' : 'Đang phát...') : (isEn ? 'Native Audio' : 'Audio gốc')}</span>
                            </button>
                          )}

                          <Link
                            href={`/courses/${courseId}/${lesson.id}`}
                            className="btn-primary"
                            style={{
                              padding: '8px 18px',
                              fontSize: '0.85rem',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <PlayCircle size={16} />
                            <span>{isCompleted ? (isEn ? 'Review Lesson' : 'Ôn tập lại') : (isEn ? 'Start Lesson' : 'Học bài khóa')}</span>
                          </Link>
                        </div>
                      </div>

                      {/* Bottom row: Academic Metadata Badges & Sub-actions */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px',
                          paddingTop: '10px',
                          borderTop: '1px solid var(--border-subtle)',
                        }}
                      >
                        {/* Badges: Radicals, Grammar, Vocab count */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          {/* Vocab count */}
                          <span
                            className="badge"
                            style={{
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-secondary)',
                              fontSize: '0.75rem',
                            }}
                          >
                            📚 {lesson.vocabularies?.length || 0} {isEn ? 'words' : 'từ mới'}
                          </span>

                          {/* Grammar points badges */}
                          {lesson.grammarPoints?.slice(0, 2).map((gp, idx) => (
                            <span
                              key={idx}
                              className="badge badge-indigo"
                              style={{ fontSize: '0.75rem' }}
                            >
                              💡 {isEn && gp.titleEn ? gp.titleEn : gp.title}
                            </span>
                          ))}

                          {/* Radicals preview */}
                          {lesson.radicals && lesson.radicals.length > 0 && (
                            <span
                              className="badge badge-gold"
                              style={{ fontSize: '0.75rem' }}
                            >
                              ✍️ Bộ: {lesson.radicals.slice(0, 3).join(', ')}
                            </span>
                          )}

                          {/* Writing characters preview */}
                          {lesson.writingChars && lesson.writingChars.length > 0 && (
                            <span
                              className="badge badge-emerald"
                              style={{ fontSize: '0.75rem' }}
                            >
                              🖊️ Viết: {lesson.writingChars.join(' ')}
                            </span>
                          )}
                        </div>

                        {/* Direct Sub-actions: Tap viet & Trac nghiem */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Link
                            href={`/courses/${courseId}/${lesson.id}?tab=quiz`}
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              background: 'var(--bg-tertiary)',
                            }}
                          >
                            <HelpCircle size={13} />
                            <span>{isEn ? 'Quiz Practice' : 'Luyện trắc nghiệm'}</span>
                          </Link>

                          {isCompleted && (
                            <span className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
                              {isEn ? `Passed (${lesson.score || 100} pts)` : `Đạt (${lesson.score || 100}đ)`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
