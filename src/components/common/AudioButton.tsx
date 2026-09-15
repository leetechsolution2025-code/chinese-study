'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface AudioButtonProps {
  text: string;
  size?: number;
  className?: string;
  label?: string;
  speed?: number;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 18,
  className = '',
  label,
  speed = 0.9,
}) => {
  const { speak, isSpeaking } = useSpeech();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text, speed);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`audio-btn inline-flex items-center gap-2 p-2 rounded-full transition-all ${
        isSpeaking ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'hover:bg-white/10 text-gray-300 hover:text-white'
      } ${className}`}
      title={`Phát âm: ${text}`}
      aria-label={`Phát âm ${text}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '8px',
        backgroundColor: isSpeaking ? 'rgba(225, 29, 72, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        border: '1px solid ' + (isSpeaking ? 'rgba(225, 29, 72, 0.4)' : 'rgba(255, 255, 255, 0.1)'),
        color: isSpeaking ? '#fb7185' : '#e5e7eb',
        cursor: 'pointer',
        fontSize: '0.85rem',
      }}
    >
      <Volume2 size={size} />
      {label && <span>{label}</span>}
    </button>
  );
};
