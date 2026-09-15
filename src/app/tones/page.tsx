'use client';

import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { TonePitchChart } from '@/components/tones/TonePitchChart';
import { AudioButton } from '@/components/common/AudioButton';
import { useSpeech } from '@/hooks/useSpeech';

export default function TonesPage() {
  const { speak } = useSpeech();
  const [quizQuestion, setQuizQuestion] = useState({
    character: '马',
    pinyin: 'mǎ',
    correctTone: 3,
  });
  const [selectedToneGuess, setSelectedToneGuess] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const practiceQuestions = [
    { character: '马', pinyin: 'mǎ', correctTone: 3 },
    { character: '妈', pinyin: 'mā', correctTone: 1 },
    { character: '麻', pinyin: 'má', correctTone: 2 },
    { character: '骂', pinyin: 'mà', correctTone: 4 },
    { character: '八', pinyin: 'bā', correctTone: 1 },
    { character: '大', pinyin: 'dà', correctTone: 4 },
    { character: '水', pinyin: 'shuǐ', correctTone: 3 },
    { character: '国', pinyin: 'guó', correctTone: 2 },
  ];

  const handleSelectQuiz = (tone: number) => {
    setSelectedToneGuess(tone);
    if (tone === quizQuestion.correctTone) {
      setQuizFeedback('correct');
    } else {
      setQuizFeedback('wrong');
    }
  };

  const handleNextQuiz = () => {
    const nextQ = practiceQuestions[Math.floor(Math.random() * practiceQuestions.length)];
    setQuizQuestion(nextQ);
    setSelectedToneGuess(null);
    setQuizFeedback(null);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-sky">Kỹ năng phát âm và nghe</span>
          <span className="badge badge-gold">Cao độ thanh điệu</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Làm chủ 4 thanh điệu <span className="gradient-text">tiếng Trung chuẩn</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Hiểu sâu bản chất âm vực qua biểu đồ cao độ 5 bậc (55, 35, 214, 51), phân biệt rõ thanh 1 với thanh 4, thanh 2 với thanh 3.
        </p>
      </div>

      {/* Main Tone Pitch Visualizer */}
      <TonePitchChart />

      {/* Mini Quiz: Đoán Thanh Điệu Qua Âm Thanh */}
      <div className="glass-panel" style={{ padding: '28px', maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={18} color="#fbbf24" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
            Thử thách thính giác: Đoán thanh điệu
          </h3>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Bấm nút phát âm bên dưới để nghe âm thanh mẫu, sau đó chọn thanh điệu tương ứng (Thanh 1, 2, 3 hay 4).
        </p>

        <div
          style={{
            padding: '24px',
            background: 'var(--bg-tertiary)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={() => speak(quizQuestion.character, 0.85)}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '1rem' }}
            >
              <Volume2 size={20} />
              <span>Nghe âm thanh</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', width: '100%', maxWidth: '450px', marginTop: '12px' }}>
            {[1, 2, 3, 4].map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => handleSelectQuiz(tone)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background:
                    selectedToneGuess === tone
                      ? tone === quizQuestion.correctTone
                        ? 'rgba(16, 185, 129, 0.25)'
                        : 'rgba(239, 68, 68, 0.25)'
                      : 'var(--bg-card)',
                  border:
                    selectedToneGuess === tone
                      ? tone === quizQuestion.correctTone
                        ? '2px solid #10b981'
                        : '2px solid #ef4444'
                      : '1px solid var(--border-subtle)',
                  color:
                    selectedToneGuess === tone
                      ? tone === quizQuestion.correctTone
                        ? '#10b981'
                        : '#ef4444'
                      : 'var(--text-primary)',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                }}
              >
                Thanh {tone}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '12px',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: quizFeedback === 'correct' ? '#34d399' : '#f87171',
              }}
            >
              {quizFeedback === 'correct' ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Chính xác! Từ phát âm là "{quizQuestion.character}" ({quizQuestion.pinyin}) - Thanh {quizQuestion.correctTone}</span>
                </>
              ) : (
                <>
                  <XCircle size={18} />
                  <span>Chưa đúng! Đáp án đúng là Thanh {quizQuestion.correctTone}: "{quizQuestion.character}" ({quizQuestion.pinyin})</span>
                </>
              )}
            </div>
          )}

          {quizFeedback && (
            <button
              type="button"
              onClick={handleNextQuiz}
              className="btn-secondary"
              style={{ marginTop: '10px', padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Câu tiếp theo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
