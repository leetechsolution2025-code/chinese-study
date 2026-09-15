'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSupported('speechSynthesis' in window || typeof Audio !== 'undefined');
    }
  }, []);

  const fallbackToWebSpeech = useCallback((text: string, rate: number = 0.9) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(
      (v) => v.lang.includes('zh') || v.lang.includes('cmn') || v.name.includes('Chinese')
    );
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const speak = useCallback(
    async (text: string, rate: number = 0.9) => {
      if (!text || text.trim().length === 0) return;

      // Dừng âm thanh đang phát
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      setIsSpeaking(true);

      // Thử gọi ElevenLabs qua API backend trước
      try {
        const audioUrl = `/api/tts?text=${encodeURIComponent(text.trim())}`;
        const res = await fetch(audioUrl, { method: 'GET' });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('audio')) {
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          const audio = new Audio(blobUrl);
          audioRef.current = audio;

          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(blobUrl);
          };
          audio.onerror = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(blobUrl);
            fallbackToWebSpeech(text, rate);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        // Nếu ElevenLabs có lỗi, tự động chuyển về Web Speech API
      }

      // Fallback: Web Speech API
      fallbackToWebSpeech(text, rate);
    },
    [fallbackToWebSpeech]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, supported };
}
