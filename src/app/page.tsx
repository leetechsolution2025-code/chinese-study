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
  TrendingUp,
  GraduationCap,
  Trophy,
  Target,
} from 'lucide-react';
import { AudioButton } from '@/components/common/AudioButton';
import { storage, UserStats } from '@/lib/storage';
import hsk1Data from '@/data/hsk1_vocab.json';

export default function HomePage() {
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

  // Từ vựng tiêu biểu trong ngày
  const wordOfDay = hsk1Data[6]; // Học (xué)

  const skillCards = [
    {
      title: 'Lớp học HSK 1 - HSK 4',
      chineseTitle: '标准教程课堂',
      desc: 'Giáo trình chuẩn từng bài: hội thoại bài khóa, phân tích ngữ pháp, từ vựng trọng tâm và bài tập củng cố kiến thức.',
      icon: GraduationCap,
      href: '/courses',
      badge: 'Lộ trình chuẩn',
      badgeClass: 'badge-crimson',
      color: '#e11d48',
    },
    {
      title: 'Phòng luyện thi thử HSK',
      chineseTitle: '全真模拟考试',
      desc: 'Mô phỏng 100% cấu trúc đề thi thật HSK 1 đến HSK 4: phần Nghe & Đọc hiểu, đồng hồ đếm ngược, chấm điểm và xếp loại Đạt/Chưa đạt.',
      icon: Trophy,
      href: '/exams',
      badge: 'Mô phỏng kỳ thi',
      badgeClass: 'badge-gold',
      color: '#f59e0b',
    },
    {
      title: 'Trung tâm luyện tập',
      chineseTitle: '综合技能训练',
      desc: 'Rèn giũa 4 kỹ năng Nghe - Nói - Đọc - Viết với 5 công cụ: tập viết Canvas, 4 thanh điệu, thẻ SRS, đọc tương tác và AI Tutor.',
      icon: Target,
      href: '/practice',
      badge: '5 kỹ năng',
      badgeClass: 'badge-sky',
      color: '#0ea5e9',
    },
    {
      title: 'Kỹ năng viết và bộ thủ',
      chineseTitle: '汉字与笔顺',
      desc: 'Tập viết chữ Hán trên Canvas chuẩn thứ tự nét vẽ (笔顺), khám phá 214 bộ thủ và câu chuyện chiết tự.',
      icon: PenTool,
      href: '/writing',
      badge: 'Interactive Canvas',
      badgeClass: 'badge-crimson',
      color: '#fb7185',
    },
    {
      title: 'Luyện 4 thanh điệu',
      chineseTitle: '声调与发音',
      desc: 'Mô phỏng biểu đồ cao độ (55, 35, 214, 51), đối chiếu mẫu đọc bản xứ và làm chủ thanh điệu.',
      icon: Volume2,
      href: '/tones',
      badge: 'Tone Contour',
      badgeClass: 'badge-sky',
      color: '#38bdf8',
    },
    {
      title: 'Flashcard SRS (HSK 1)',
      chineseTitle: '间隔重复记忆',
      desc: 'Ghi nhớ 150 từ vựng HSK 1 với thuật toán FSRS/SM-2, tận dụng tối đa lợi thế âm Hán - Việt.',
      icon: Layers,
      href: '/flashcards',
      badge: 'Thuật toán SM-2',
      badgeClass: 'badge-gold',
      color: '#fbbf24',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="badge badge-crimson">Phương pháp học tối ưu cho người Việt</span>
            <span className="badge badge-gold">
              <Flame size={12} /> Streak {stats.streak} ngày
            </span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '14px' }}>
            Chinh phục tiếng Trung qua <br />
            <span className="gradient-text">âm Hán - Việt và chiết tự</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
            Hệ sinh thái rèn luyện toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết. Bẻ khóa từng chữ Hán qua thứ tự nét động, trực quan hóa cao độ 4 thanh điệu, ôn tập khoa học với thuật toán SRS và tự tin thi thử HSK.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn-primary">
              <GraduationCap size={18} />
              <span>Vào lớp học HSK 1 - 4</span>
            </Link>

            <Link href="/exams" className="btn-gold">
              <Trophy size={18} />
              <span>Thi thử HSK</span>
            </Link>

            <Link href="/practice" className="btn-secondary">
              <Target size={18} />
              <span>Trung tâm luyện tập</span>
            </Link>
          </div>
        </div>

        {/* Decorative Big Hanzi in background */}
        <div className="watermark-hanzi">
          学
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(225, 29, 72, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e11d48',
            }}
          >
            <Layers size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.totalWordsLearned} / 150
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Từ HSK 1 đã ghi nhớ</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
            }}
          >
            <PenTool size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.charactersWritten} Chữ
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Đã hoàn thành đồ nét</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(14, 165, 233, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0ea5e9',
            }}
          >
            <Volume2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              4 / 4 Thanh
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cao độ thanh điệu</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b',
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {stats.streak} Ngày
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Duy trì học tập liên tục</div>
          </div>
        </div>
      </section>

      {/* Word of the Day & 4 Skills Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Word of the Day Spotlight */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} /> Chữ Hán tiêu biểu hôm nay
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>HSK {wordOfDay.level}</span>
          </div>

          <div className="inner-spotlight-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div
                style={{
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  color: 'var(--accent-crimson)',
                  fontFamily: 'var(--font-hanzi)',
                  lineHeight: '1',
                }}
              >
                {wordOfDay.hanzi}
              </div>

              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {wordOfDay.pinyin}
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    Hán-Việt: {wordOfDay.hanviet}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {wordOfDay.meaning}
                </div>
              </div>
            </div>

            <AudioButton text={wordOfDay.hanzi} size={22} label="Nghe" />
          </div>

          <div className="feature-bullet-item" style={{ marginTop: '16px', padding: '14px', flexDirection: 'column', gap: '4px', alignItems: 'stretch' }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{wordOfDay.exampleHanzi}</div>
            <div style={{ color: 'var(--accent-crimson)', fontSize: '0.82rem' }}>{wordOfDay.examplePinyin}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{wordOfDay.exampleMeaning}</div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href="/writing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-crimson)',
                fontSize: '0.9rem',
                fontWeight: '600',
              }}
            >
              <span>Tập vẽ chữ này trên Canvas</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Learning Hub Intro */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
            Vũ khí học tiếng Trung của người Việt
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
            Hơn 70% từ vựng tiếng Việt có nguồn gốc Hán - Việt. Bằng cách nắm vững quy tắc chuyển dịch phụ âm và liên tưởng bộ thủ, bạn có thể đoán nghĩa và ghi nhớ từ vựng tiếng Trung nhanh gấp 3 lần so với người học phương Tây.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                title: 'Bẻ khóa chữ Hán qua bộ thủ (Radicals)',
                desc: 'Phân tích cấu trúc hình tượng giúp hiểu sâu bản chất chữ thay vì học vẹt nét vẽ.',
              },
              {
                title: 'Trực quan hóa cao độ thanh điệu',
                desc: 'Khắc phục triệt để lỗi lẫn lộn thanh 1 và thanh 4 hay thanh 2 và thanh 3.',
              },
              {
                title: 'Lặp lại ngắt quãng SM-2 (SRS)',
                desc: 'Chỉ nhắc nhở bạn ôn lại từ vựng đúng thời điểm trước khi não bộ chuẩn bị quên.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="feature-bullet-item"
              >
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Skill Modules Grid */}
      <section>
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Trung tâm luyện 4 kỹ năng
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Chọn kỹ năng bạn muốn tập trung phát triển ngay hôm nay
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {skillCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link key={idx} href={card.href} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: `${card.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: card.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className={`badge ${card.badgeClass}`} style={{ fontSize: '0.7rem' }}>
                      {card.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: card.color, fontWeight: '600', marginBottom: '4px' }}>
                    {card.chineseTitle}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {card.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: card.color,
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    marginTop: '20px',
                  }}
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
