import { SRSItem } from '@/types';

const STORAGE_KEYS = {
  SRS_DECK: 'chinese_study_srs_deck',
  USER_STATS: 'chinese_study_user_stats',
  STREAK: 'chinese_study_streak',
};

export interface UserStats {
  streak: number;
  lastStudyDate: string;
  totalWordsLearned: number;
  charactersWritten: number;
  tonesPracticed: number;
}

export const storage = {
  getSRSDeck(): Record<string, SRSItem> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SRS_DECK);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveSRSDeck(deck: Record<string, SRSItem>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SRS_DECK, JSON.stringify(deck));
    } catch (e) {
      console.error('Failed to save SRS deck', e);
    }
  },

  getUserStats(): UserStats {
    if (typeof window === 'undefined') {
      return {
        streak: 1,
        lastStudyDate: new Date().toISOString(),
        totalWordsLearned: 0,
        charactersWritten: 0,
        tonesPracticed: 0,
      };
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_STATS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    const defaultStats: UserStats = {
      streak: 3, // Mock default for fresh UX presentation
      lastStudyDate: new Date().toISOString(),
      totalWordsLearned: 15,
      charactersWritten: 8,
      tonesPracticed: 12,
    };
    return defaultStats;
  },

  saveUserStats(stats: UserStats): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save user stats', e);
    }
  },
};
