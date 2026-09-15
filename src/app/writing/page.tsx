'use client';

import React, { useState } from 'react';
import { PenTool, BookOpen, Layers, Sparkles, ChevronRight, Info } from 'lucide-react';
import { HanziCanvas } from '@/components/writing/HanziCanvas';
import hsk1Data from '@/data/hsk1_vocab.json';
import radicalsData from '@/data/radicals.json';

export default function WritingPage() {
  const [selectedVocabIndex, setSelectedVocabIndex] = useState(0);
  const [selectedRadicalIndex, setSelectedRadicalIndex] = useState<number | null>(null);

  const currentVocab = hsk1Data[selectedVocabIndex];

  // Tìm thông tin bộ thủ của chữ hiện tại nếu có
  const matchedRadical = radicalsData.find((r) => r.radical === currentVocab.radical);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Page Title Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-crimson">Kỹ năng viết và nhận diện Hán tự</span>
          <span className="badge badge-gold">HSK 1 cốt lõi</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Tập viết chữ Hán và <span className="gradient-text">bẻ khóa chiết tự</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Quan sát mô phỏng thứ tự từng nét vẽ chuẩn xác (笔顺), tự tay đồ nét trên lưới điền (田字格) và ghi nhớ bản chất qua bộ thủ.
        </p>
      </div>

      {/* Character Selector Ribbon */}
      <div className="glass-panel" style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: '600' }}>
          Chọn chữ Hán cần luyện tập ({hsk1Data.length} từ cơ bản):
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {hsk1Data.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedVocabIndex(idx)}
              style={{
                flexShrink: 0,
                width: '60px',
                height: '68px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: selectedVocabIndex === idx ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'var(--bg-card)',
                border: '1px solid ' + (selectedVocabIndex === idx ? 'rgba(225, 29, 72, 0.5)' : 'var(--border-subtle)'),
                boxShadow: selectedVocabIndex === idx ? '0 0 16px rgba(225, 29, 72, 0.4)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  fontSize: '1.6rem',
                  fontWeight: '800',
                  color: selectedVocabIndex === idx ? '#ffffff' : 'var(--text-primary)',
                  fontFamily: 'var(--font-hanzi)',
                  lineHeight: '1',
                }}
              >
                {item.hanzi}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: selectedVocabIndex === idx ? '#ffe4e6' : 'var(--text-secondary)',
                  marginTop: '4px',
                }}
              >
                {item.pinyin}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Studio: Canvas on Left, Radical Analysis on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Interactive Canvas */}
        <HanziCanvas
          character={currentVocab.hanzi}
          pinyin={currentVocab.pinyin}
          hanviet={currentVocab.hanviet}
          meaning={currentVocab.meaning}
          radical={currentVocab.radical}
        />

        {/* Right Column: Radical & Mnemonic Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Radical analysis card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                Chiết tự và bộ thủ cấu thành
              </h3>
            </div>

            {matchedRadical ? (
              <div
                style={{
                  padding: '16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '14px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: '800',
                      color: '#10b981',
                      fontFamily: 'var(--font-hanzi)',
                    }}
                  >
                    {matchedRadical.radical}
                  </div>

                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Bộ {matchedRadical.hanviet} ({matchedRadical.pinyin})
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#10b981' }}>
                      Ý nghĩa cốt lõi: {matchedRadical.meaning}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '10px' }}>
                  <strong style={{ color: '#f59e0b' }}>Câu chuyện ghi nhớ: </strong>
                  {matchedRadical.mnemonic}
                </div>
              </div>
            ) : (
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Chữ này mang bộ thủ <strong style={{ color: 'var(--accent-crimson)' }}>{currentVocab.radical || 'cơ bản'}</strong> gồm {currentVocab.strokes} nét.
              </div>
            )}

            {/* Vietnamese Sino-Vietnamese mnemonic advantage */}
            <div
              style={{
                marginTop: '16px',
                padding: '14px',
                borderRadius: '12px',
                background: 'var(--accent-crimson-light)',
                border: '1px solid rgba(225, 29, 72, 0.2)',
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--accent-crimson)', marginBottom: '4px' }}>
                💡 Vũ khí ghi nhớ người Việt: Âm Hán - Việt "{currentVocab.hanviet}"
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Khi bạn biết chữ <strong style={{ color: 'var(--text-primary)' }}>{currentVocab.hanzi}</strong> đọc là <strong style={{ color: '#f59e0b' }}>{currentVocab.pinyin}</strong> và có âm Hán-Việt là <strong style={{ color: '#10b981' }}>{currentVocab.hanviet}</strong>, bạn có thể dễ dàng đoán nghĩa của hàng chục từ ghép liên quan như trong câu ví dụ bên dưới.
              </div>
            </div>

            {/* Sample sentence */}
            <div style={{ marginTop: '16px', padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Câu ví dụ thực tế:</div>
              <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>{currentVocab.exampleHanzi}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-crimson)', marginTop: '2px' }}>{currentVocab.examplePinyin}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{currentVocab.exampleMeaning}</div>
            </div>
          </div>

          {/* Common Radicals Reference Gallery */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
              Các bộ thủ cốt lõi phổ biến khác
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '8px' }}>
              {radicalsData.map((rad, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#10b981', fontFamily: 'var(--font-hanzi)' }}>
                    {rad.radical}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: '600', marginTop: '2px' }}>
                    {rad.hanviet}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{rad.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
