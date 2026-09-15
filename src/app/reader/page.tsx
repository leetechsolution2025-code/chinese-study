'use client';

import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Volume2, Sparkles, Languages, Check } from 'lucide-react';
import { AudioButton } from '@/components/common/AudioButton';
import { useSpeech } from '@/hooks/useSpeech';
import articlesData from '@/data/articles.json';

export default function ReaderPage() {
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    hanzi: string;
    pinyin: string;
    meaningVi: string;
    hanviet: string;
  } | null>(null);

  const { speak } = useSpeech();
  const currentArticle = articlesData[0];

  const handleWordClick = (word: any) => {
    if (!word.meaningVi) return;
    setSelectedWord(word);
    speak(word.hanzi, 0.9);
  };

  const handleReadFullText = () => {
    const fullText = currentArticle.content.map((w) => w.hanzi).join('');
    speak(fullText, 0.85);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-emerald">Interactive Graded Reader</span>
            <span className="badge badge-crimson">HSK 1</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
            Trình đọc tương tác <span className="gradient-text">HSK 1</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Bật/tắt Pinyin linh hoạt, chạm vào bất kỳ từ nào để tra cứu Pinyin, âm Hán - Việt và nghĩa tức thì.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowPinyin(!showPinyin)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            {showPinyin ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{showPinyin ? 'Ẩn Pinyin' : 'Hiện Pinyin'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranslation(!showTranslation)}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <Languages size={15} />
            <span>{showTranslation ? 'Ẩn bản dịch' : 'Bản dịch tiếng Việt'}</span>
          </button>

          <button
            type="button"
            onClick={handleReadFullText}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Volume2 size={15} />
            <span>Nghe toàn bài</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Reader Card */}
      <div className="glass-panel" style={{ padding: '36px 28px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            {currentArticle.title}
          </h2>
          <span className="badge badge-gold">Cấp độ HSK {currentArticle.hskLevel}</span>
        </div>

        {/* Word-by-word interactive text */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px 4px',
            lineHeight: '2.4',
            fontSize: '1.6rem',
            fontFamily: 'var(--font-hanzi)',
          }}
        >
          {currentArticle.content.map((item, idx) => {
            const isClickable = Boolean(item.meaningVi);
            const isSelected = selectedWord?.hanzi === item.hanzi;

            return (
              <span
                key={idx}
                onClick={() => isClickable && handleWordClick(item)}
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: isClickable ? '2px 6px' : '0',
                  borderRadius: '6px',
                  cursor: isClickable ? 'pointer' : 'default',
                  background: isSelected ? 'var(--accent-crimson-light)' : 'transparent',
                  borderBottom: isSelected ? '2px solid var(--accent-crimson)' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                }}
              >
                {/* Pinyin annotation line */}
                {showPinyin && (
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-main)',
                      color: isSelected ? 'var(--accent-crimson)' : 'var(--text-secondary)',
                      lineHeight: '1.2',
                      minHeight: '16px',
                    }}
                  >
                    {item.pinyin}
                  </span>
                )}

                {/* Hanzi character */}
                <span
                  style={{
                    color: isSelected ? 'var(--accent-crimson)' : 'var(--text-primary)',
                    fontWeight: '600',
                  }}
                >
                  {item.hanzi}
                </span>
              </span>
            );
          })}
        </div>

        {/* Translation drawer */}
        {showTranslation && (
          <div
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
              Dịch nghĩa tiếng Việt:
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {currentArticle.translationVi}
            </p>
          </div>
        )}
      </div>

      {/* Selected Word Quick Popup/Card */}
      {selectedWord && (
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--accent-crimson)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                fontSize: '2.4rem',
                fontWeight: '900',
                color: 'var(--accent-crimson)',
                fontFamily: 'var(--font-hanzi)',
              }}
            >
              {selectedWord.hanzi}
            </div>

            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {selectedWord.pinyin}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.78rem' }}>
                  Hán-Việt: {selectedWord.hanviet}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                  • {selectedWord.meaningVi}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AudioButton text={selectedWord.hanzi} size={20} label="Phát âm" />
          </div>
        </div>
      )}
    </div>
  );
}
