'use client';

import React, { useState, useEffect } from 'react';
import { RotateCw, CheckCircle, Volume2, Sparkles, Trophy, ArrowRight, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabItem, SRSItem, SRSRating } from '@/types';
import { AudioButton } from '@/components/common/AudioButton';
import { calculateNextReview, initializeSRSItem } from '@/lib/srs';
import { storage } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';

interface SRSReviewSessionProps {
  vocabList: VocabItem[];
}

export const SRSReviewSession: React.FC<SRSReviewSessionProps> = ({ vocabList }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyinHint, setShowPinyinHint] = useState(false);
  const [deck, setDeck] = useState<Record<string, SRSItem>>({});
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  useEffect(() => {
    // Tải tiến trình SRS từ SQLite backend (kèm fallback sang localStorage)
    fetch('/api/srs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setDeck(json.data);
          storage.saveSRSDeck(json.data);
        } else {
          setDeck(storage.getSRSDeck());
        }
      })
      .catch(() => {
        setDeck(storage.getSRSDeck());
      });
  }, []);

  const currentVocab = vocabList[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (rating: SRSRating) => {
    if (!currentVocab) return;

    // Lấy hoặc khởi tạo SRS state cho từ này
    const currentSRS = deck[currentVocab.id] || initializeSRSItem(currentVocab.id);
    const updatedSRS = calculateNextReview(currentSRS, rating);

    const updatedDeck = {
      ...deck,
      [currentVocab.id]: updatedSRS,
    };

    setDeck(updatedDeck);
    storage.saveSRSDeck(updatedDeck);

    // Lưu đồng bộ vào SQLite backend
    fetch('/api/srs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vocabId: currentVocab.id, rating }),
    }).catch((e) => console.error('Failed to sync SRS rating to SQLite:', e));

    // Cập nhật stats
    const stats = storage.getUserStats();
    stats.totalWordsLearned += 1;
    storage.saveUserStats(stats);

    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalWordsLearned: stats.totalWordsLearned }),
    }).catch((e) => console.error('Failed to sync stats to SQLite:', e));

    setReviewedCount((prev) => prev + 1);

    // Chuyển sang từ tiếp theo
    if (currentIndex + 1 < vocabList.length) {
      setIsFlipped(false);
      setShowPinyinHint(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowPinyinHint(false);
    setSessionCompleted(false);
    setReviewedCount(0);
  };

  if (sessionCompleted) {
    return (
      <div className="glass-panel" style={{ padding: '40px 24px', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)',
          }}
        >
          <Trophy size={36} color="#ffffff" />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>
          {isEn ? 'Review Session Completed!' : 'Hoàn thành buổi ôn tập!'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
          {isEn
            ? `You have reviewed ${reviewedCount} vocabulary words with FSRS / SM-2. Cards are scheduled for future review at the optimal time.`
            : `Bạn đã hoàn thành ghi nhớ ${reviewedCount} từ vựng theo thuật toán FSRS / SM-2. Các từ sẽ được lên lịch tự động ôn lại đúng thời điểm tối ưu.`}
        </p>

        <button
          type="button"
          onClick={handleRestart}
          className="btn-primary"
          style={{ padding: '12px 28px', fontSize: '1rem' }}
        >
          <RotateCw size={18} />
          <span>{isEn ? 'Restart Session' : 'Ôn tập lại từ đầu'}</span>
        </button>
      </div>
    );
  }

  if (!currentVocab) {
    return <div>Đang tải kho từ vựng...</div>;
  }

  const progressPercent = Math.round(((currentIndex) / vocabList.length) * 100);

  return (
    <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Session Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Thẻ <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{currentIndex + 1}</span> / {vocabList.length}
        </div>
        <div className="badge badge-crimson">HSK {currentVocab.level}</div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #e11d48, #fb7185)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* 3D Flashcard */}
      <div
        onClick={handleFlip}
        className={`srs-flashcard ${isFlipped ? 'flipped' : ''}`}
      >
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <RotateCw size={12} />
          <span>Bấm thẻ để lật</span>
        </div>

        {!isFlipped ? (
          /* Card Front: Big Hanzi, Optional Pinyin hint, Audio */
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div
              style={{
                fontSize: '5.5rem',
                fontWeight: '900',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-hanzi)',
                lineHeight: '1.1',
                marginBottom: '16px',
                letterSpacing: '2px',
              }}
            >
              {currentVocab.hanzi}
            </div>

            {/* Hint toggle for Pinyin */}
            <div style={{ marginBottom: '16px' }}>
              {showPinyinHint ? (
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent-crimson)' }}>
                  {currentVocab.pinyin}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPinyinHint(true);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Eye size={13} />
                  <span>Hiện Pinyin gợi ý</span>
                </button>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AudioButton text={currentVocab.hanzi} size={22} label="Phát âm" />
            </div>
          </div>
        ) : (
          /* Card Back: Full Information with Sino-Vietnamese, Meaning, Examples */
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-hanzi)' }}>
              {currentVocab.hanzi}
            </div>

            <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--accent-crimson)', marginTop: '4px' }}>
              {currentVocab.pinyin}
            </div>

            {/* Sino-Vietnamese or Radical */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
              {!isEn ? (
                <span className="badge badge-gold" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                  Âm Hán-Việt: {currentVocab.hanviet}
                </span>
              ) : (
                <span className="badge badge-sky" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                  Radical: {currentVocab.radical || 'HSK 1'}
                </span>
              )}
              <span className="badge badge-indigo" style={{ fontSize: '0.85rem' }}>
                {currentVocab.partOfSpeech}
              </span>
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#10b981', marginTop: '14px' }}>
              {isEn ? (currentVocab.meaningEn || currentVocab.meaning) : currentVocab.meaning}
            </div>

            {/* Example sentence */}
            <div
              style={{
                marginTop: '18px',
                padding: '12px 16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'left',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {currentVocab.exampleHanzi}
                </div>
                <AudioButton text={currentVocab.exampleHanzi} size={15} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-crimson)', marginTop: '2px' }}>
                {currentVocab.examplePinyin}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {isEn ? (currentVocab.exampleMeaningEn || currentVocab.exampleMeaning) : currentVocab.exampleMeaning}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SRS Rating Action Bar (Only active when flipped or ready) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {!isFlipped ? (
          <button
            type="button"
            onClick={handleFlip}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <span>{isEn ? 'Show Answer (Flip Card)' : 'Hiển thị đáp án (Lật thẻ)'}</span>
          </button>
        ) : (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '8px' }}>
              {isEn ? 'How well did you recall this word?' : 'Mức độ ghi nhớ của bạn đối với từ này:'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleRate('again')}
                style={{
                  padding: '10px 6px',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>{isEn ? 'Again' : 'Quên'}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px' }}>{isEn ? 'Repeat now' : 'Lặp lại ngay'}</div>
              </button>

              <button
                type="button"
                onClick={() => handleRate('hard')}
                style={{
                  padding: '10px 6px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#fbbf24',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>{isEn ? 'Hard' : 'Khó'}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px' }}>{isEn ? '+1 day' : '+1 ngày'}</div>
              </button>

              <button
                type="button"
                onClick={() => handleRate('good')}
                style={{
                  padding: '10px 6px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>{isEn ? 'Good' : 'Nhớ tốt'}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px' }}>{isEn ? '+3 days' : '+3 ngày'}</div>
              </button>

              <button
                type="button"
                onClick={() => handleRate('easy')}
                style={{
                  padding: '10px 6px',
                  borderRadius: '10px',
                  background: 'rgba(14, 165, 233, 0.15)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  color: '#38bdf8',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>{isEn ? 'Easy' : 'Rất dễ'}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px' }}>{isEn ? '+5 days' : '+5 ngày'}</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
