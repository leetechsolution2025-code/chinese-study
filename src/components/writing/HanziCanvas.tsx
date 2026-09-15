'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Edit3, Eye, EyeOff, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AudioButton } from '@/components/common/AudioButton';
import { storage } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';

interface HanziCanvasProps {
  character: string;
  pinyin: string;
  hanviet: string;
  meaning: string;
  radical?: string;
  onCharacterCompleted?: (char: string) => void;
}

export const HanziCanvas: React.FC<HanziCanvasProps> = ({
  character,
  pinyin,
  hanviet,
  meaning,
  radical,
  onCharacterCompleted,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [strokeMistakes, setStrokeMistakes] = useState(0);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initWriter() {
      if (!containerRef.current || typeof window === 'undefined') return;

      // Xóa nội dung cũ trong container
      containerRef.current.innerHTML = '';
      setQuizSuccess(false);
      setStrokeMistakes(0);

      try {
        const HanziWriterModule = await import('hanzi-writer');
        const HanziWriter = HanziWriterModule.default;

        if (!isMounted || !containerRef.current) return;

        const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';

        writerRef.current = HanziWriter.create(containerRef.current, character, {
          width: 260,
          height: 260,
          padding: 15,
          showOutline: showOutline,
          strokeAnimationSpeed: 1.2,
          delayBetweenStrokes: 150,
          strokeColor: isLight ? '#e11d48' : '#f43f5e',
          radicalColor: '#10b981',
          outlineColor: isLight ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.15)',
          drawingColor: isLight ? '#0284c7' : '#38bdf8',
          drawingWidth: 16,
          showHintAfterMisses: 2,
        });

        // Tự động chạy animation mẫu một lần khi chuyển chữ mới
        writerRef.current.animateCharacter({
          onComplete: () => {
            if (isMounted) setIsAnimating(false);
          },
        });
        setIsAnimating(true);
      } catch (err) {
        console.error('Error initializing HanziWriter:', err);
      }
    }

    initWriter();

    return () => {
      isMounted = false;
      if (writerRef.current) {
        try {
          writerRef.current.cancelQuiz?.();
        } catch {
          // ignore
        }
      }
    };
  }, [character]);

  const handleAnimate = () => {
    if (!writerRef.current) return;
    setIsQuizMode(false);
    setQuizSuccess(false);
    setIsAnimating(true);
    writerRef.current.animateCharacter({
      onComplete: () => setIsAnimating(false),
    });
  };

  const handleStartQuiz = () => {
    if (!writerRef.current) return;
    setIsQuizMode(true);
    setQuizSuccess(false);
    setStrokeMistakes(0);

    writerRef.current.quiz({
      onMistake: (strokeData: any) => {
        setStrokeMistakes((prev) => prev + 1);
      },
      onCorrectStroke: () => {
        // Correct stroke sound / feedback if needed
      },
      onComplete: (summary: any) => {
        setQuizSuccess(true);
        setIsQuizMode(false);

        // Hiệu ứng pháo hoa chúc mừng
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });

        // Cập nhật stats
        const stats = storage.getUserStats();
        stats.charactersWritten += 1;
        storage.saveUserStats(stats);

        if (onCharacterCompleted) {
          onCharacterCompleted(character);
        }
      },
    });
  };

  const toggleOutline = () => {
    if (!writerRef.current) return;
    const nextState = !showOutline;
    setShowOutline(nextState);
    if (nextState) {
      writerRef.current.showOutline();
    } else {
      writerRef.current.hideOutline();
    }
  };

  const handleReset = () => {
    if (!writerRef.current) return;
    setIsQuizMode(false);
    setQuizSuccess(false);
    setStrokeMistakes(0);
    writerRef.current.cancelQuiz();
    writerRef.current.showCharacter();
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
      {/* Header Info: Hanzi, Pinyin, Han-Viet, Meaning */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent-crimson)' }}>
              {pinyin}
            </span>
            <AudioButton text={character} size={20} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
            {!isEn && (
              <span className="badge badge-gold" title="Âm Hán Việt tương ứng">
                Hán-Việt: {hanviet}
              </span>
            )}
            {radical && (
              <span className="badge badge-emerald" title={isEn ? 'Primary Radical' : 'Bộ thủ chính'}>
                {isEn ? `Radical: ${radical}` : `Bộ thủ: ${radical}`}
              </span>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {isEn ? 'Meaning' : 'Nghĩa tiếng Việt'}
          </div>
          <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.05rem', marginTop: '2px' }}>
            {meaning}
          </div>
        </div>
      </div>

      {/* Interactive Hanzi Canvas with Tianzige Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div
          className="tianzige"
          style={{
            width: '260px',
            height: '260px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div ref={containerRef} style={{ width: '260px', height: '260px' }} />
        </div>

        {/* Quiz Success Overlay */}
        {quizSuccess && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(16, 185, 129, 0.95)',
              color: '#ffffff',
              padding: '6px 16px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
              zIndex: 10,
            }}
          >
            <CheckCircle2 size={16} />
            <span>{isEn ? 'Excellent! Correct stroke order' : 'Xuất sắc! Viết đúng thứ tự nét'}</span>
          </div>
        )}

        {isQuizMode && (
          <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Edit3 size={14} />
            <span>{isEn ? 'Trace strokes in correct order' : 'Dùng chuột hoặc ngón tay để đồ theo thứ tự từng nét'}</span>
            {strokeMistakes > 0 && (
              <span style={{ color: '#f43f5e', marginLeft: '6px' }}>
                ({isEn ? `Mistakes: ${strokeMistakes}` : `Lỗi nét: ${strokeMistakes}`})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Control Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginTop: '22px',
        }}
      >
        <button
          type="button"
          onClick={handleAnimate}
          disabled={isAnimating}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          title={isEn ? 'Watch stroke order animation' : 'Xem lại mô phỏng thứ tự nét vẽ'}
        >
          <Play size={15} />
          <span>{isEn ? 'Animate' : 'Vẽ nét'}</span>
        </button>

        <button
          type="button"
          onClick={handleStartQuiz}
          className="btn-primary"
          style={{
            padding: '8px 12px',
            fontSize: '0.85rem',
            background: isQuizMode
              ? 'linear-gradient(135deg, #0284c7, #0369a1)'
              : 'linear-gradient(135deg, var(--accent-crimson), #be123c)',
          }}
          title={isEn ? 'Practice writing character strokes' : 'Bật chế độ tự luyện viết và chấm điểm nét'}
        >
          <Edit3 size={15} />
          <span>
            {isQuizMode
              ? (isEn ? 'Writing...' : 'Đang viết...')
              : (isEn ? 'Practice' : 'Tập viết')}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleOutline}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          title={isEn ? 'Toggle background stroke guide' : 'Bật/tắt nét mờ gợi ý'}
        >
          {showOutline ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>
            {showOutline
              ? (isEn ? 'Hide Guide' : 'Ẩn nét')
              : (isEn ? 'Show Guide' : 'Hiện nét')}
          </span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary"
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          title={isEn ? 'Clear canvas and restart' : 'Xóa và vẽ lại từ đầu'}
        >
          <RotateCcw size={15} />
          <span>{isEn ? 'Reset' : 'Làm lại'}</span>
        </button>
      </div>
    </div>
  );
};
