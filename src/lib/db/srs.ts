import { getDatabase } from './index';
import { SRSItem, SRSRating } from '@/types';
import { calculateNextReview, initializeSRSItem } from '@/lib/srs';

export function getAllSRSItems(): Record<string, SRSItem> {
  const db = getDatabase();
  const rows = db.prepare(`
    SELECT 
      vocab_id as vocabId,
      interval,
      repetitions,
      ease_factor as easeFactor,
      next_review_date as nextReviewDate,
      last_reviewed_date as lastReviewedDate,
      state
    FROM srs_progress
  `).all() as SRSItem[];

  const deck: Record<string, SRSItem> = {};
  for (const row of rows) {
    deck[row.vocabId] = row;
  }
  return deck;
}

export function getSRSItem(vocabId: string): SRSItem {
  const db = getDatabase();
  const row = db.prepare(`
    SELECT 
      vocab_id as vocabId,
      interval,
      repetitions,
      ease_factor as easeFactor,
      next_review_date as nextReviewDate,
      last_reviewed_date as lastReviewedDate,
      state
    FROM srs_progress
    WHERE vocab_id = ?
  `).get(vocabId) as SRSItem | undefined;

  return row || initializeSRSItem(vocabId);
}

export function recordSRSRating(vocabId: string, rating: SRSRating): SRSItem {
  const db = getDatabase();
  const currentItem = getSRSItem(vocabId);
  const updated = calculateNextReview(currentItem, rating);

  db.prepare(`
    INSERT INTO srs_progress (vocab_id, interval, repetitions, ease_factor, next_review_date, last_reviewed_date, state)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(vocab_id) DO UPDATE SET
      interval = excluded.interval,
      repetitions = excluded.repetitions,
      ease_factor = excluded.ease_factor,
      next_review_date = excluded.next_review_date,
      last_reviewed_date = excluded.last_reviewed_date,
      state = excluded.state
  `).run(
    updated.vocabId,
    updated.interval,
    updated.repetitions,
    updated.easeFactor,
    updated.nextReviewDate,
    updated.lastReviewedDate || new Date().toISOString(),
    updated.state
  );

  return updated;
}
