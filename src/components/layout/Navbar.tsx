'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  GraduationCap,
  Target,
  Trophy,
  PenTool,
  Volume2,
  Layers,
  BookOpen,
  MessageSquare,
  Flame,
  Sparkles,
  ChevronDown,
  BookMarked,
  FileText,
  Sun,
  Moon,
} from 'lucide-react';
import { storage, UserStats } from '@/lib/storage';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [stats, setStats] = useState<UserStats>({
    streak: 1,
    lastStudyDate: '',
    totalWordsLearned: 0,
    charactersWritten: 0,
    tonesPracticed: 0,
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setStats(storage.getUserStats());

    // Khởi tạo theme từ localStorage hoặc thuộc tính html
    const currentTheme = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ||
      (localStorage.getItem('theme') as 'dark' | 'light') ||
      'dark';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Đóng dropdown khi chuyển trang hoặc click ra ngoài
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = [
    {
      id: 'home',
      label: 'Trang chủ',
      href: '/',
      icon: Home,
      isActive: (path: string) => path === '/',
    },
    {
      id: 'courses',
      label: 'Lớp học',
      href: '/courses',
      icon: GraduationCap,
      isActive: (path: string) => path.startsWith('/courses'),
      items: [
        {
          title: 'Tất cả lớp học',
          desc: 'Tổng quan lộ trình chuẩn HSK 1 - HSK 4',
          href: '/courses',
          icon: GraduationCap,
          color: '#e11d48',
        },
        {
          title: 'Lớp HSK 1 - Nhập môn',
          desc: '15 bài học, phát âm Pinyin & 150 từ vựng cơ bản',
          href: '/courses/hsk1',
          icon: BookMarked,
          color: '#e11d48',
        },
        {
          title: 'Lớp HSK 2 - Sơ cấp',
          desc: '15 bài học, giao tiếp đời sống & 300 từ vựng',
          href: '/courses/hsk2',
          icon: BookMarked,
          color: '#0ea5e9',
        },
        {
          title: 'Lớp HSK 3 - Sơ - Trung cấp',
          desc: '20 bài học, ngữ pháp chữ 把 & câu so sánh',
          href: '/courses/hsk3',
          icon: BookMarked,
          color: '#f59e0b',
        },
        {
          title: 'Lớp HSK 4 - Trung cấp',
          desc: '20 bài học, thảo luận xã hội & 1200 từ vựng',
          href: '/courses/hsk4',
          icon: BookMarked,
          color: '#10b981',
        },
      ],
    },
    {
      id: 'practice',
      label: 'Luyện tập',
      href: '/practice',
      icon: Target,
      isActive: (path: string) =>
        path === '/practice' ||
        path.startsWith('/writing') ||
        path.startsWith('/tones') ||
        path.startsWith('/flashcards') ||
        path.startsWith('/reader') ||
        path.startsWith('/tutor'),
      items: [
        {
          title: 'Trung tâm luyện tập',
          desc: 'Tổng hợp 5 kỹ năng Nghe - Nói - Đọc - Viết',
          href: '/practice',
          icon: Target,
          color: '#0ea5e9',
        },
        {
          title: 'Tập viết chữ Hán & chiết tự',
          desc: 'Canvas vẽ nét 笔顺, 214 bộ thủ & âm Hán - Việt',
          href: '/writing',
          icon: PenTool,
          color: '#fb7185',
        },
        {
          title: 'Luyện 4 thanh điệu & cao độ',
          desc: 'Biểu đồ 5 bậc trực quan & luyện nghe đoán âm',
          href: '/tones',
          icon: Volume2,
          color: '#38bdf8',
        },
        {
          title: 'Flashcard SRS ngắt quãng',
          desc: 'Ôn 150 từ vựng HSK 1 với thuật toán SM-2',
          href: '/flashcards',
          icon: Layers,
          color: '#fbbf24',
        },
        {
          title: 'Đọc tương tác Graded Reader',
          desc: 'Truyện song ngữ, công tắc Pinyin, tra từ 1-click',
          href: '/reader',
          icon: BookOpen,
          color: '#34d399',
        },
        {
          title: 'AI Tutor đàm thoại thực chiến',
          desc: 'Khẩu ngữ phản xạ theo tình huống đời sống',
          href: '/tutor',
          icon: MessageSquare,
          color: '#a78bfa',
        },
      ],
    },
    {
      id: 'exams',
      label: 'Luyện thi',
      href: '/exams',
      icon: Trophy,
      badge: 'MỚI',
      isActive: (path: string) => path.startsWith('/exams'),
      items: [
        {
          title: 'Phòng thi thử HSK',
          desc: 'Tổng quan sảnh thi & lịch sử kết quả làm bài',
          href: '/exams',
          icon: Trophy,
          color: '#fbbf24',
        },
        {
          title: 'Đề thi thử HSK 1',
          desc: 'Mô phỏng 35 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk1',
          icon: FileText,
          color: '#e11d48',
        },
        {
          title: 'Đề thi thử HSK 2',
          desc: 'Mô phỏng 50 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk2',
          icon: FileText,
          color: '#0ea5e9',
        },
        {
          title: 'Đề thi thử HSK 3',
          desc: 'Mô phỏng 85 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk3',
          icon: FileText,
          color: '#f59e0b',
        },
        {
          title: 'Đề thi thử HSK 4',
          desc: 'Mô phỏng 100 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk4',
          icon: FileText,
          color: '#10b981',
        },
      ],
    },
  ];

  return (
    <header className="nav-container" ref={navRef}>
      <div className="nav-content">
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '1.2rem',
              color: '#ffffff',
              boxShadow: '0 0 14px rgba(225, 29, 72, 0.4)',
              fontFamily: 'var(--font-calligraphy)',
              flexShrink: 0,
            }}
          >
            华
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px', lineHeight: 1.2 }}>
              <span>Hoa Ngữ</span>
              <span className="badge badge-crimson" style={{ fontSize: '0.62rem', padding: '1px 5px', height: '17px' }}>HSK</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px', whiteSpace: 'nowrap' }}>
              Học tiếng Trung toàn diện
            </div>
          </div>
        </Link>

        {/* Primary Navigation Links (Only 4 Clean Columns) */}
        <nav className="nav-links">
          {navCategories.map((cat) => {
            const Icon = cat.icon;
            const active = cat.isActive(pathname);
            const hasItems = cat.items && cat.items.length > 0;
            const isOpen = activeDropdown === cat.id;

            if (!hasItems) {
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`nav-link ${active ? 'active' : ''}`}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span>{cat.label}</span>
                </Link>
              );
            }

            return (
              <div
                key={cat.id}
                className={`nav-dropdown-wrapper ${isOpen ? 'open' : ''}`}
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={cat.href}
                  className={`nav-link ${active ? 'active' : ''}`}
                  onClick={(e) => {
                    // Click navigates directly to the hub page
                    setActiveDropdown(null);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span
                      style={{
                        background: '#e11d48',
                        color: '#ffffff',
                        fontSize: '0.58rem',
                        fontWeight: '800',
                        padding: '1px 5px',
                        borderRadius: '4px',
                        lineHeight: 1.2,
                        marginLeft: '2px',
                      }}
                    >
                      {cat.badge}
                    </span>
                  )}
                  <ChevronDown
                    size={13}
                    style={{
                      opacity: 0.6,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.18s ease',
                    }}
                  />
                </Link>

                {/* Dropdown Menu */}
                <div className="nav-dropdown-menu">
                  {cat.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isItemActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-dropdown-item ${isItemActive ? 'active' : ''}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div
                          className="nav-dropdown-icon"
                          style={{
                            background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
                            border: `1px solid ${item.color}55`,
                            color: item.color,
                          }}
                        >
                          <ItemIcon size={16} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="nav-dropdown-title">{item.title}</span>
                          <span className="nav-dropdown-desc">{item.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Streak & Level badge + Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            aria-label="Chuyển đổi giao diện sáng tối"
            type="button"
          >
            <span className="theme-toggle-icon">
              {theme === 'dark' ? (
                <Sun size={14} style={{ color: '#fbbf24' }} />
              ) : (
                <Moon size={14} style={{ color: '#6366f1' }} />
              )}
            </span>
            <span>{theme === 'dark' ? 'Sáng' : 'Tối'}</span>
          </button>

          <div
            className="badge badge-gold"
            title="Chuỗi ngày học liên tục"
            style={{ padding: '5px 10px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
          >
            <Flame size={14} />
            <span>{stats.streak} ngày</span>
          </div>

          <div
            className="badge badge-emerald"
            style={{ padding: '5px 10px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
          >
            <Sparkles size={13} />
            <span>HSK 1</span>
          </div>
        </div>
      </div>
    </header>
  );
};
