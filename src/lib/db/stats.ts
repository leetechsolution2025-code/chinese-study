import { getDatabase } from './index';
import { UserStats } from '@/lib/storage';

export function getUserStatsFromDB(): UserStats {
  const db = getDatabase();
  const row = db.prepare(`
    SELECT 
      streak,
      last_study_date as lastStudyDate,
      total_words_learned as totalWordsLearned,
      characters_written as charactersWritten,
      tones_practiced as tonesPracticed
    FROM user_stats
    WHERE id = 'default_user'
  `).get() as UserStats | undefined;

  if (row) {
    return row;
  }

  const defaultStats: UserStats = {
    streak: 3,
    lastStudyDate: new Date().toISOString(),
    totalWordsLearned: 15,
    charactersWritten: 8,
    tonesPracticed: 12,
  };

  db.prepare(`
    INSERT OR REPLACE INTO user_stats (id, streak, last_study_date, total_words_learned, characters_written, tones_practiced)
    VALUES ('default_user', ?, ?, ?, ?, ?)
  `).run(
    defaultStats.streak,
    defaultStats.lastStudyDate,
    defaultStats.totalWordsLearned,
    defaultStats.charactersWritten,
    defaultStats.tonesPracticed
  );

  return defaultStats;
}

export function updateUserStatsInDB(updates: Partial<UserStats>): UserStats {
  const current = getUserStatsFromDB();
  const updated: UserStats = {
    ...current,
    ...updates,
    lastStudyDate: updates.lastStudyDate || new Date().toISOString(),
  };

  const db = getDatabase();
  db.prepare(`
    UPDATE user_stats SET
      streak = ?,
      last_study_date = ?,
      total_words_learned = ?,
      characters_written = ?,
      tones_practiced = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 'default_user'
  `).run(
    updated.streak,
    updated.lastStudyDate,
    updated.totalWordsLearned,
    updated.charactersWritten,
    updated.tonesPracticed
  );

  return updated;
}
