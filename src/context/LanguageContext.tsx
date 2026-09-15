'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { vi } from '@/locales/vi';
import { en } from '@/locales/en';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language | null;
    if (saved === 'vi' || saved === 'en') {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error('Failed to save language to localStorage:', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const currentDict = useMemo(() => {
    return language === 'en' ? en : vi;
  }, [language]);

  const t = (path: string, params?: Record<string, string | number>): string => {
    let text = getNestedValue(currentDict as unknown as Record<string, unknown>, path);

    // Fallback to Vietnamese if English missing, or return path
    if (!text && language !== 'vi') {
      text = getNestedValue(vi as unknown as Record<string, unknown>, path);
    }

    if (!text) {
      return path;
    }

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        text = text!.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
