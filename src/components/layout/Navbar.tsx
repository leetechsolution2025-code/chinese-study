'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
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
import { useLanguage } from '@/context/LanguageContext';

interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: any;
  color: string;
}

interface NavCategory {
  id: string;
  label: string;
  href: string;
  icon: any;
  isActive: (path: string) => boolean;
  badge?: string;
  items?: DropdownItem[];
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
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

  const isEn = language === 'en';

  const navCategories: NavCategory[] = useMemo(() => [
    {
      id: 'home',
      label: isEn ? 'Home' : 'Trang chủ',
      href: '/',
      icon: Home,
      isActive: (path: string) => path === '/',
    },
    {
      id: 'courses',
      label: isEn ? 'Courses' : 'Lớp học',
      href: '/courses',
      icon: GraduationCap,
      isActive: (path: string) => path.startsWith('/courses'),
      items: [
        {
          title: isEn ? 'All Courses' : 'Tất cả lớp học',
          desc: isEn ? 'Standard HSK 1 - HSK 6 curriculum roadmap' : 'Tổng quan lộ trình chuẩn HSK 1 - HSK 6',
          href: '/courses',
          icon: GraduationCap,
          color: '#e11d48',
        },
        {
          title: isEn ? 'HSK 1 - Beginner' : 'Lớp HSK 1 - Nhập môn',
          desc: isEn ? '15 lessons, Pinyin pronunciation & 150 core words' : '15 bài học, phát âm Pinyin & 150 từ vựng cơ bản',
          href: '/courses/hsk1',
          icon: BookMarked,
          color: '#e11d48',
        },
        {
          title: isEn ? 'HSK 2 - Elementary' : 'Lớp HSK 2 - Sơ cấp',
          desc: isEn ? '15 lessons, daily communication & 300 words' : '15 bài học, giao tiếp đời sống & 300 từ vựng',
          href: '/courses/hsk2',
          icon: BookMarked,
          color: '#0ea5e9',
        },
        {
          title: isEn ? 'HSK 3 - Intermediate' : 'Lớp HSK 3 - Sơ - Trung cấp',
          desc: isEn ? '20 lessons, bǎ structure & comparisons' : '20 bài học, ngữ pháp chữ 把 & câu so sánh',
          href: '/courses/hsk3',
          icon: BookMarked,
          color: '#f59e0b',
        },
        {
          title: isEn ? 'HSK 4 - Upper-Intermediate' : 'Lớp HSK 4 - Trung cấp',
          desc: isEn ? '20 lessons, social discussions & 1200 words' : '20 bài học, thảo luận xã hội & 1200 từ vựng',
          href: '/courses/hsk4',
          icon: BookMarked,
          color: '#10b981',
        },
        {
          title: isEn ? 'HSK 5 - Advanced' : 'Lớp HSK 5 - Cao cấp',
          desc: isEn ? '36 lessons, news, films & 2500 words' : '36 bài học, đọc báo, phim ảnh & 2500 từ vựng',
          href: '/courses/hsk5',
          icon: BookMarked,
          color: '#8b5cf6',
        },
        {
          title: isEn ? 'HSK 6 - Mastery' : 'Lớp HSK 6 - Tinh thông',
          desc: isEn ? '40 lessons, academic language & 5000 words' : '40 bài học, ngôn ngữ học thuật & 5000 từ vựng',
          href: '/courses/hsk6',
          icon: BookMarked,
          color: '#ec4899',
        },
      ],
    },
    {
      id: 'practice',
      label: isEn ? 'Practice' : 'Luyện tập',
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
          title: isEn ? 'Practice Center' : 'Trung tâm luyện tập',
          desc: isEn ? 'Master Listening, Speaking, Reading & Writing' : 'Tổng hợp 5 kỹ năng Nghe - Nói - Đọc - Viết',
          href: '/practice',
          icon: Target,
          color: '#0ea5e9',
        },
        {
          title: isEn ? 'Hanzi Writing & Radicals' : 'Tập viết chữ Hán & chiết tự',
          desc: isEn ? 'Stroke order canvas, 214 radicals & roots' : 'Canvas vẽ nét 笔顺, 214 bộ thủ & âm Hán - Việt',
          href: '/writing',
          icon: PenTool,
          color: '#fb7185',
        },
        {
          title: isEn ? '4 Tones & Pitch Practice' : 'Luyện 4 thanh điệu & cao độ',
          desc: isEn ? '5-level pitch graphs & ear training' : 'Biểu đồ 5 bậc trực quan & luyện nghe đoán âm',
          href: '/tones',
          icon: Volume2,
          color: '#38bdf8',
        },
        {
          title: isEn ? 'SRS Spaced Flashcards' : 'Flashcard SRS ngắt quãng',
          desc: isEn ? 'Review HSK 1 vocabulary with SM-2 algorithm' : 'Ôn 150 từ vựng HSK 1 với thuật toán SM-2',
          href: '/flashcards',
          icon: Layers,
          color: '#fbbf24',
        },
        {
          title: isEn ? 'Graded Interactive Reader' : 'Đọc tương tác Graded Reader',
          desc: isEn ? 'Bilingual stories with Pinyin toggle and lookup' : 'Truyện song ngữ, công tắc Pinyin, tra từ 1-click',
          href: '/reader',
          icon: BookOpen,
          color: '#34d399',
        },
        {
          title: isEn ? 'AI Conversational Tutor' : 'AI Tutor đàm thoại thực chiến',
          desc: isEn ? 'Real-time conversational practice with AI' : 'Khẩu ngữ phản xạ theo tình huống đời sống',
          href: '/tutor',
          icon: MessageSquare,
          color: '#a78bfa',
        },
      ],
    },
    {
      id: 'exams',
      label: isEn ? 'Mock Exams' : 'Luyện thi',
      href: '/exams',
      icon: Trophy,
      badge: isEn ? 'NEW' : 'MỚI',
      isActive: (path: string) => path.startsWith('/exams'),
      items: [
        {
          title: isEn ? 'HSK Exam Room' : 'Phòng thi thử HSK',
          desc: isEn ? 'Exam hub overview & attempt history' : 'Tổng quan sảnh thi & lịch sử kết quả làm bài',
          href: '/exams',
          icon: Trophy,
          color: '#fbbf24',
        },
        {
          title: isEn ? 'HSK 1 Mock Exam' : 'Đề thi thử HSK 1',
          desc: isEn ? '35 mins simulation (Listening & Reading)' : 'Mô phỏng 35 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk1',
          icon: FileText,
          color: '#e11d48',
        },
        {
          title: isEn ? 'HSK 2 Mock Exam' : 'Đề thi thử HSK 2',
          desc: isEn ? '50 mins simulation (Listening & Reading)' : 'Mô phỏng 50 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk2',
          icon: FileText,
          color: '#0ea5e9',
        },
        {
          title: isEn ? 'HSK 3 Mock Exam' : 'Đề thi thử HSK 3',
          desc: isEn ? '85 mins simulation (Listening & Reading)' : 'Mô phỏng 85 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk3',
          icon: FileText,
          color: '#f59e0b',
        },
        {
          title: isEn ? 'HSK 4 Mock Exam' : 'Đề thi thử HSK 4',
          desc: isEn ? '100 mins simulation (Listening & Reading)' : 'Mô phỏng 100 phút (Nghe hiểu & Đọc hiểu)',
          href: '/exams/hsk4',
          icon: FileText,
          color: '#10b981',
        },
        {
          title: isEn ? 'HSK 5 Mock Exam' : 'Đề thi thử HSK 5',
          desc: isEn ? '120 mins simulation (Listening & Reading)' : 'Mô phỏng 120 phút (Nghe hiểu & Đọc hiểu chuyên sâu)',
          href: '/exams/hsk5',
          icon: FileText,
          color: '#8b5cf6',
        },
        {
          title: isEn ? 'HSK 6 Mock Exam' : 'Đề thi thử HSK 6',
          desc: isEn ? '135 mins simulation (Listening & Reading)' : 'Mô phỏng 135 phút (Nghe hiểu & Đọc hiểu học thuật)',
          href: '/exams/hsk6',
          icon: FileText,
          color: '#ec4899',
        },
      ],
    },
  ], [isEn]);

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
              {isEn ? 'Master Chinese' : 'Học tiếng Trung toàn diện'}
            </div>
          </div>
        </Link>

        {/* Primary Navigation Links (Only 4 Clean Columns) */}
        <nav className="nav-links">
          {navCategories.map((cat: NavCategory) => {
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
                    // Cho phép click để đóng/mở dropdown trên mobile
                    if (window.innerWidth <= 768) {
                      e.preventDefault();
                      setActiveDropdown(isOpen ? null : cat.id);
                    }
                  }}
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span>{cat.label}</span>
                  {cat.badge && (
                    <span className="badge badge-crimson" style={{ fontSize: '0.62rem', padding: '0 4px', height: '16px' }}>
                      {cat.badge}
                    </span>
                  )}
                  <ChevronDown
                    size={12}
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      opacity: 0.7,
                    }}
                  />
                </Link>

                {/* Dropdown Menu Modal */}
                <div className="nav-dropdown-menu">
                  {cat.items?.map((item: DropdownItem) => {
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

        {/* Controls: Language Switcher, Theme Toggle, Streak, Level */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="theme-toggle-btn"
            title={language === 'vi' ? 'Switch to English learning mode' : 'Chuyển sang học bằng tiếng Việt'}
            aria-label="Toggle study language"
            type="button"
            style={{
              padding: '5px 10px',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
            <span>{language === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? (isEn ? 'Switch to light mode' : 'Chuyển sang giao diện sáng') : (isEn ? 'Switch to dark mode' : 'Chuyển sang giao diện tối')}
            aria-label="Toggle theme"
            type="button"
          >
            <span className="theme-toggle-icon">
              {theme === 'dark' ? (
                <Sun size={14} style={{ color: '#fbbf24' }} />
              ) : (
                <Moon size={14} style={{ color: '#6366f1' }} />
              )}
            </span>
            <span>{theme === 'dark' ? (isEn ? 'Light' : 'Sáng') : (isEn ? 'Dark' : 'Tối')}</span>
          </button>

          <div
            className="badge badge-gold"
            title={isEn ? 'Continuous Study Streak' : 'Chuỗi ngày học liên tục'}
            style={{ padding: '5px 10px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
          >
            <Flame size={14} />
            <span>{stats.streak} {isEn ? 'days' : 'ngày'}</span>
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
