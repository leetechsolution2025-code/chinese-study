import { SRSItem, SRSRating } from '@/types';

/**
 * Thuật toán Spaced Repetition (SM-2 Algorithm)
 * Tự động tính toán chu kỳ lặp lại tối ưu cho từng từ vựng
 */
export function calculateNextReview(item: SRSItem, rating: SRSRating): SRSItem {
  let { interval, repetitions, easeFactor } = item;

  // Điểm số tương ứng theo thang điểm SM-2 (0 đến 5)
  // again = 1, hard = 3, good = 4, easy = 5
  let grade = 4;
  if (rating === 'again') grade = 1;
  else if (rating === 'hard') grade = 3;
  else if (rating === 'good') grade = 4;
  else if (rating === 'easy') grade = 5;

  if (grade >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Quên từ -> reset lại chu kỳ ôn tập
    repetitions = 0;
    interval = 1;
  }

  // Cập nhật Ease Factor (Hệ số độ dễ/khó)
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // Tính ngày ôn tập tiếp theo
  const now = new Date();
  const nextDate = new Date();
  nextDate.setDate(now.getDate() + interval);

  return {
    ...item,
    interval,
    repetitions,
    easeFactor,
    lastReviewedDate: now.toISOString(),
    nextReviewDate: nextDate.toISOString(),
    state: repetitions === 0 ? 'learning' : 'review',
  };
}

export function initializeSRSItem(vocabId: string): SRSItem {
  return {
    vocabId,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    state: 'new',
  };
}
