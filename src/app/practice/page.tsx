'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Volume2,
  Layers,
  BookOpen,
  MessageSquare,
  Flame,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { storage, UserStats } from '@/lib/storage';

export default function PracticeHubPage() {
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

  const practiceModules = [
    {
      id: 'writing',
      title: 'Tập viết chữ Hán & bẻ khóa chiết tự',
      chinese: '汉字书写与部首拆解',
      desc: 'Mô phỏng động từng nét vẽ theo quy chuẩn (笔顺) trên khung Điền tự cách (田字格). Khám phá câu chuyện hình tượng của 214 bộ thủ và tận dụng lợi thế âm Hán - Việt.',
      icon: PenTool,
      href: '/writing',
      color: '#e11d48',
      badge: 'Interactive Canvas',
      badgeClass: 'badge-crimson',
      highlights: [
        'Canvas bắt nét thời gian thực',
        'Phân tích chiết tự & bộ thủ cấu thành',
        'Đối chiếu Hán tự ↔ Pinyin ↔ Hán - Việt',
      ],
      ctaText: 'Vào luyện viết ngay',
    },
    {
      id: 'tones',
      title: 'Luyện 4 thanh điệu & cao độ',
      chinese: '四声调与发音音调',
      desc: 'Làm chủ ngữ điệu tiếng Trung thông qua biểu đồ cao độ 5 bậc trực quan (55, 35, 214, 51). Luyện tập phân biệt các cặp từ dễ nhầm lẫn và mini-game đoán thanh điệu.',
      icon: Volume2,
      href: '/tones',
      color: '#0ea5e9',
      badge: 'Biểu đồ cao độ',
      badgeClass: 'badge-sky',
      highlights: [
        'Mô phỏng cao độ trực quan 5 bậc',
        'Mẫu phát âm giọng đọc bản xứ',
        'Thử thách nghe đoán thanh điệu',
      ],
      ctaText: 'Luyện thanh điệu ngay',
    },
    {
      id: 'flashcards',
      title: 'Flashcard SRS ghi nhớ ngắt quãng',
      chinese: '间隔重复记忆卡片',
      desc: 'Chinh phục 150 từ vựng cốt lõi HSK 1 với thuật toán FSRS / SM-2. Tự động lên lịch ôn tập đúng thời điểm chuẩn bị quên, tối ưu hóa tốc độ ghi nhớ dài hạn.',
      icon: Layers,
      href: '/flashcards',
      color: '#f59e0b',
      badge: 'Thuật toán SM-2',
      badgeClass: 'badge-gold',
      highlights: [
        'Thẻ lật 3D hai mặt kèm audio chuẩn',
        '4 mức đánh giá độ nhớ (Quên, Khó, Tốt, Dễ)',
        'Đồng bộ tiến độ vào cơ sở dữ liệu',
      ],
      ctaText: 'Bắt đầu ôn thẻ từ',
    },
    {
      id: 'reader',
      title: 'Đọc tương tác (Graded Reader)',
      chinese: '分级阅读与即时查词',
      desc: 'Nâng cao vốn từ và cảm thụ ngữ pháp tự nhiên qua các bài đọc phân cấp chuẩn HSK. Công tắc bật/tắt Pinyin linh hoạt và công nghệ 1-click tra từ tức thì.',
      icon: BookOpen,
      href: '/reader',
      color: '#10b981',
      badge: 'Pinyin Switcher',
      badgeClass: 'badge-emerald',
      highlights: [
        'Công tắc ẩn/hiện Pinyin toàn bài',
        '1-click popup tra nghĩa & âm Hán - Việt',
        'Phát âm mẫu câu tự động',
      ],
      ctaText: 'Mở bài đọc tương tác',
    },
    {
      id: 'tutor',
      title: 'AI Tutor đàm thoại thực chiến',
      chinese: '智能对话口语教练',
      desc: 'Luyện phản xạ khẩu ngữ với bạn học ảo AI qua các tình huống giao tiếp đời sống: Chào hỏi, Gọi món ăn, Mua sắm hàng hóa, Hỏi đường. Nhận phản hồi và gợi ý tức thời.',
      icon: MessageSquare,
      href: '/tutor',
      color: '#8b5cf6',
      badge: 'AI Partner',
      badgeClass: 'badge-crimson',
      highlights: [
        '4 kịch bản đối thoại thực chiến',
        'Audio giọng đọc bản xứ tự nhiên',
        'Kèm phiên âm Pinyin và bản dịch tiếng Việt',
      ],
      ctaText: 'Đối thoại với AI ngay',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Banner */}
      <section className="hero-banner-sky">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge badge-sky">
            <Target size={13} />
            Trung tâm luyện tập chuyên sâu
          </span>
          <span className="badge badge-gold">
            <Flame size={12} />
            Chuỗi học: {stats.streak} ngày
          </span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '12px' }}>
          Rèn luyện toàn diện <span className="gradient-text">Nghe - Nói - Đọc - Viết</span>
        </h1>

        <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '750px' }}>
          Tập hợp 5 công cụ thực hành chuyên biệt: tập viết chữ Hán nét chuẩn trên Canvas, làm chủ biểu đồ cao độ thanh điệu, ôn tập khoa học với thẻ SRS và đàm thoại khẩu ngữ cùng trợ lý AI.
        </p>

        {/* Quick Stats Pills */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
          <div className="glass-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PenTool size={20} style={{ color: '#e11d48' }} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{stats.charactersWritten}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Chữ Hán đã viết</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Volume2 size={20} style={{ color: '#0ea5e9' }} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{stats.tonesPracticed}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lượt nghe thanh điệu</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Layers size={20} style={{ color: '#f59e0b' }} />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{stats.totalWordsLearned}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Từ vựng đã thuộc</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Practice Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {practiceModules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="card-interactive"
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
              <div>
                {/* Header of card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: `${m.color}18`,
                      border: `1px solid ${m.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: m.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span className={`badge ${m.badgeClass}`}>{m.badge}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: m.color, fontWeight: '700', letterSpacing: '0.05em', marginBottom: '4px' }}>
                  {m.chinese}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  {m.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '18px' }}>
                  {m.desc}
                </p>

                {/* Feature Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '22px' }}>
                  {m.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={13} style={{ color: m.color, flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={m.href}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${m.color}, ${m.color}dd)`,
                  boxShadow: `0 4px 14px ${m.color}33`,
                }}
              >
                <span>{m.ctaText}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
