'use client';

import React, { useState } from 'react';
import { Volume2, Play, Info } from 'lucide-react';
import { ToneInfo } from '@/types';
import { AudioButton } from '@/components/common/AudioButton';
import tonesData from '@/data/tones.json';

export const TonePitchChart: React.FC = () => {
  const [selectedToneIndex, setSelectedToneIndex] = useState(0);
  const currentTone = tonesData[selectedToneIndex] as ToneInfo;

  // Tọa độ SVG cho biểu đồ cao độ 5 bậc (1: Thấp nhất -> 5: Cao nhất)
  // Chiều cao đồ thị: Y từ 30 (bậc 5) đến 190 (bậc 1), X từ 40 đến 260
  const toneSvgPaths = [
    {
      tone: 1,
      color: '#f43f5e', // Crimson
      path: 'M 50 40 L 250 40', // 55
      label: 'Thanh 1: 55 (Ngang cao)',
    },
    {
      tone: 2,
      color: '#0ea5e9', // Sky blue
      path: 'M 50 120 Q 150 90 250 40', // 35
      label: 'Thanh 2: 35 (Vút lên)',
    },
    {
      tone: 3,
      color: '#f59e0b', // Gold/Amber
      path: 'M 50 120 Q 130 200 170 190 T 250 75', // 214
      label: 'Thanh 3: 214 (Xuống rồi lên)',
    },
    {
      tone: 4,
      color: '#10b981', // Emerald
      path: 'M 50 40 L 250 200', // 51
      label: 'Thanh 4: 51 (Rơi mạnh dứt khoát)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Tone Selection Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
        }}
      >
        {tonesData.map((t, idx) => (
          <button
            key={t.toneNumber}
            type="button"
            onClick={() => setSelectedToneIndex(idx)}
            className="glass-card"
            style={{
              textAlign: 'left',
              padding: '14px',
              cursor: 'pointer',
              border: selectedToneIndex === idx ? '2px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
              background: selectedToneIndex === idx ? 'var(--accent-crimson-light)' : 'var(--bg-card)',
              transform: selectedToneIndex === idx ? 'scale(1.02)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: selectedToneIndex === idx ? 'var(--accent-crimson)' : 'var(--text-primary)' }}>
                Thanh {t.toneNumber === 0 ? 'Nhẹ' : t.toneNumber}
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                {t.pitchContour}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {t.pinyinName}
            </div>
          </button>
        ))}
      </div>

      {/* Main Pitch Contour Visualization & Details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* SVG Contour Curve Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Biểu đồ cao độ (Tone Contour)
            </h3>
            <span className="badge badge-crimson">
              Cao độ {currentTone.pitchContour}
            </span>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', position: 'relative' }}>
            <svg viewBox="0 0 300 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Pitch level guide lines 5 down to 1 */}
              {[
                { level: 5, y: 40, label: '5 (Cao nhất)' },
                { level: 4, y: 80, label: '4 (Nửa cao)' },
                { level: 3, y: 120, label: '3 (Trung bình)' },
                { level: 2, y: 160, label: '2 (Nửa thấp)' },
                { level: 1, y: 200, label: '1 (Thấp nhất)' },
              ].map((line) => (
                <g key={line.level}>
                  <line
                    x1="45"
                    y1={line.y}
                    x2="275"
                    y2={line.y}
                    stroke="var(--border-subtle)"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="15"
                    y={line.y + 4}
                    fill="var(--text-muted)"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {line.level}
                  </text>
                </g>
              ))}

              {/* Inactive tone contour faint lines */}
              {toneSvgPaths.map((item) => {
                const isActive = item.tone === currentTone.toneNumber;
                return (
                  <path
                    key={item.tone}
                    d={item.path}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isActive ? '5' : '1.5'}
                    strokeOpacity={isActive ? '1' : '0.2'}
                    strokeLinecap="round"
                    style={{
                      transition: 'all 0.3s ease',
                      filter: isActive ? `drop-shadow(0 0 8px ${item.color})` : 'none',
                    }}
                  />
                );
              })}
            </svg>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
              {toneSvgPaths.map((item) => (
                <div key={item.tone} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '12px', height: '4px', backgroundColor: item.color, borderRadius: '2px' }} />
                  <span>T{item.tone}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            {currentTone.description}
          </div>
        </div>

        {/* Practice Syllables & Audio Samples */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Luyện đọc mẫu {currentTone.nameVi}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentTone.sampleSyllables.map((syl, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: 'var(--accent-crimson)',
                      width: '45px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-hanzi)',
                    }}
                  >
                    {syl.character}
                  </div>

                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {syl.pinyin}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '2px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#f59e0b' }}>Hán-Việt: {syl.hanviet}</span>
                      <span>•</span>
                      <span>{syl.meaning}</span>
                    </div>
                  </div>
                </div>

                <AudioButton text={syl.character} size={20} label="Nghe" />
              </div>
            ))}
          </div>

          {/* Special Mnemonic Comparison: Ma (mā, má, mǎ, mà) */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px',
              borderRadius: '12px',
              background: 'var(--accent-crimson-light)',
              border: '1px solid rgba(225, 29, 72, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--accent-crimson)', fontSize: '0.85rem' }}>
              <Info size={16} />
              <span>Ví dụ kinh điển phân biệt 4 thanh: Chữ "Ma"</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px', textAlign: 'center' }}>
              {[
                { char: '妈', py: 'mā', mean: 'Mẹ' },
                { char: '麻', py: 'má', mean: 'Cây gai' },
                { char: '马', py: 'mǎ', mean: 'Ngựa' },
                { char: '骂', py: 'mà', mean: 'Mắng' },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>{m.char}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-crimson)', fontWeight: '600' }}>{m.py}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{m.mean}</div>
                  <div style={{ marginTop: '4px' }}>
                    <AudioButton text={m.char} size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
