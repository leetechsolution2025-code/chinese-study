'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, List, PlayCircle, BookOpen } from 'lucide-react';
import { SRSReviewSession } from '@/components/flashcards/SRSReviewSession';
import { AudioButton } from '@/components/common/AudioButton';
import hsk1Data from '@/data/hsk1_vocab.json';

export default function FlashcardsPage() {
  const [viewMode, setViewMode] = useState<'study' | 'list'>('study');

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-gold">Spaced Repetition System</span>
            <span className="badge badge-crimson">HSK 1 (150 từ vựng)</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
            Ôn tập thông minh <span className="gradient-gold-text">Flashcard SRS</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Thuật toán FSRS / SM-2 ghi nhớ ngắt quãng, tự động tính toán thời điểm vàng để ôn lại từ vựng trước khi bạn quên.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={() => setViewMode('study')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: viewMode === 'study' ? 'var(--accent-crimson)' : 'transparent',
              color: viewMode === 'study' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <PlayCircle size={15} />
            <span>Chế độ học (SRS)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('list')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: viewMode === 'list' ? 'var(--bg-card)' : 'transparent',
              color: viewMode === 'list' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <List size={15} />
            <span>Danh sách từ ({hsk1Data.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'study' ? (
        <SRSReviewSession vocabList={hsk1Data} />
      ) : (
        /* Vocabulary List Directory */
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {hsk1Data.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: 'var(--accent-crimson)',
                      fontFamily: 'var(--font-hanzi)',
                      width: '40px',
                      textAlign: 'center',
                    }}
                  >
                    {item.hanzi}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {item.pinyin}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', fontSize: '0.78rem', marginTop: '2px' }}>
                      <span style={{ color: 'var(--accent-gold)' }}>Hán-Việt: {item.hanviet}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>• {item.meaning}</span>
                    </div>
                  </div>
                </div>

                <AudioButton text={item.hanzi} size={16} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
