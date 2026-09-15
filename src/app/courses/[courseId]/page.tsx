'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  Sparkles,
  Award,
} from 'lucide-react';
import { Course, Lesson } from '@/types';
import coursesData from '@/data/courses.json';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function CourseLessonsPage({ params }: CoursePageProps) {
  const { courseId } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!course && !loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
        <h2>Không tìm thấy khóa học</h2>
        <Link href="/courses" className="btn-secondary" style={{ marginTop: '16px', display: 'inline-flex' }}>
          Quay lại danh sách lớp học
        </Link>
      </div>
    );
  }

  const currentCourse = course || (coursesData.courses.find((c) => c.id === courseId) as Course);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
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
            marginBottom: '12px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Danh sách lớp học</span>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                className="badge"
                style={{
                  backgroundColor: `${currentCourse?.color || '#e11d48'}20`,
                  color: currentCourse?.color || '#fb7185',
                  border: `1px solid ${currentCourse?.color || '#e11d48'}50`,
                }}
              >
                Cấp độ HSK {currentCourse?.level}
              </span>
              <span className="badge badge-gold">
                {currentCourse?.completedLessons || 0} / {currentCourse?.totalLessons} bài hoàn thành
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
              {currentCourse?.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
              {currentCourse?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Roadmap List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {lessons.map((lesson) => {
          const isCompleted = lesson.completed;

          return (
            <Link
              key={lesson.id}
              href={`/courses/${courseId}/${lesson.id}`}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 22px',
                border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Lesson number circular badge */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: isCompleted
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: isCompleted ? '#10b981' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={22} /> : `B${lesson.lessonNumber}`}
                </div>

                {/* Lesson title & objectives */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-hanzi)',
                      }}
                    >
                      {lesson.titleHanzi}
                    </span>
                    <span style={{ fontSize: '1rem', color: 'var(--accent-crimson)', fontWeight: '600' }}>
                      {lesson.titlePinyin}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      • {lesson.titleVi}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {lesson.objectives?.[0] || 'Luyện nghe nói, từ vựng và ngữ pháp trọng tâm'}
                  </div>
                </div>
              </div>

              {/* Action / Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isCompleted ? (
                  <span className="badge badge-emerald" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                    Đã hoàn thành ({lesson.score}đ)
                  </span>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                  >
                    <PlayCircle size={15} />
                    <span>Học bài này</span>
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
