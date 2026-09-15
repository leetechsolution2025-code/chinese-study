'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { Course } from '@/types';
import coursesData from '@/data/courses.json';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(coursesData.courses as Course[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCourses(json.data);
        }
      })
      .catch((e) => console.error('Failed to load courses from SQLite:', e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-crimson">Chương trình giáo trình chuẩn</span>
          <span className="badge badge-gold">HSK Standard Course</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Lớp học theo giáo trình <span className="gradient-text">chuẩn HSK 1 - HSK 4</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Lộ trình học tập bài bản 4 cấp độ từ nhập môn đến trung cấp, tích hợp bài khóa hội thoại, phân tích âm Hán - Việt và bài tập tự chấm điểm.
        </p>
      </div>

      {/* Course Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {courses.map((course) => {
          const completed = course.completedLessons || 0;
          const percent = course.progressPercent || 0;

          return (
            <div
              key={course.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Strip */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: course.color,
                }}
              />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: `${course.color}20`,
                      color: course.color,
                      border: `1px solid ${course.color}50`,
                      fontSize: '0.72rem',
                    }}
                  >
                    Cấp độ HSK {course.level}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {course.totalLessons} bài học
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {course.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>
                  {course.description}
                </p>

                {/* Key Course Stats */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    padding: '12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    marginBottom: '18px',
                    fontSize: '0.82rem',
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Mục tiêu từ vựng</div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
                      {course.targetVocab} từ
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Tiến độ hoàn thành</div>
                    <div style={{ fontWeight: '700', color: course.color, marginTop: '2px' }}>
                      {completed} / {course.totalLessons} bài ({percent}%)
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '5px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: `${percent}%`,
                      height: '100%',
                      backgroundColor: course.color,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>

              {/* Action link */}
              <Link
                href={`/courses/${course.id}`}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.9rem',
                  background: `linear-gradient(135deg, ${course.color}, #991b1b)`,
                }}
              >
                <span>Vào lớp học</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Curriculum Overview Banner */}
      <section
        className="glass-panel"
        style={{
          padding: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div className="badge badge-emerald" style={{ marginBottom: '10px' }}>
            <Award size={14} />
            <span>Phương pháp đào tạo chuẩn hóa</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Mô hình bài học 4 bước toàn diện
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Mỗi bài học được thiết kế khép kín theo chu trình: <strong>Nghe hội thoại</strong> ➔ <strong>Phân tích từ vựng & âm Hán - Việt</strong> ➔ <strong>Nắm chắc ngữ pháp</strong> ➔ <strong>Luyện tập củng cố</strong>, giúp người học ghi nhớ sâu và ứng dụng được ngay.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { step: '01', title: 'Bài khóa tương tác (课文)', desc: 'Luyện nghe phản xạ có audio giọng bản xứ, tùy chọn ẩn/hiện Pinyin và dịch nghĩa.' },
            { step: '02', title: 'Bẻ khóa từ vựng (生词)', desc: 'Gắn liền chữ Hán với âm Hán - Việt, kết nối trực tiếp với Hanzi Writer và thẻ SRS.' },
            { step: '03', title: 'Điểm ngữ pháp thực hành (语法)', desc: 'Diễn giải trực quan cấu trúc câu bằng tiếng Việt kèm mẫu câu ví dụ sinh động.' },
            { step: '04', title: 'Bài tập trắc nghiệm (练习)', desc: 'Tự kiểm tra độ hiểu bài với phản hồi tức thì và lưu trữ tiến độ vào SQLite.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="feature-bullet-item"
              style={{
                alignItems: 'center',
                gap: '14px',
                padding: '10px 14px',
              }}
            >
              <span style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--accent-crimson)' }}>{item.step}</span>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
