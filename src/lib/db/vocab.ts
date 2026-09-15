import { getDatabase } from './index';
import { VocabItem } from '@/types';

export function getAllVocab(level?: number, search?: string): VocabItem[] {
  const db = getDatabase();
  let query = `
    SELECT 
      id, 
      hanzi, 
      pinyin, 
      hanviet, 
      meaning, 
      level, 
      part_of_speech as partOfSpeech, 
      strokes, 
      radical, 
      example_hanzi as exampleHanzi, 
      example_pinyin as examplePinyin, 
      example_meaning as exampleMeaning
    FROM vocabularies
    WHERE 1=1
  `;
  const params: (string | number)[] = [];

  if (level) {
    query += ` AND level = ?`;
    params.push(level);
  }

  if (search) {
    query += ` AND (hanzi LIKE ? OR pinyin LIKE ? OR hanviet LIKE ? OR meaning LIKE ?)`;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  query += ` ORDER BY level ASC, id ASC`;

  const rows = db.prepare(query).all(...params) as VocabItem[];
  return rows;
}

export function getVocabById(id: string): VocabItem | null {
  const db = getDatabase();
  const row = db.prepare(`
    SELECT 
      id, 
      hanzi, 
      pinyin, 
      hanviet, 
      meaning, 
      level, 
      part_of_speech as partOfSpeech, 
      strokes, 
      radical, 
      example_hanzi as exampleHanzi, 
      example_pinyin as examplePinyin, 
      example_meaning as exampleMeaning
    FROM vocabularies
    WHERE id = ?
  `).get(id) as VocabItem | undefined;

  return row || null;
}

export function getVocabByHanzi(hanzi: string): VocabItem | null {
  const db = getDatabase();
  const row = db.prepare(`
    SELECT 
      id, 
      hanzi, 
      pinyin, 
      hanviet, 
      meaning, 
      level, 
      part_of_speech as partOfSpeech, 
      strokes, 
      radical, 
      example_hanzi as exampleHanzi, 
      example_pinyin as examplePinyin, 
      example_meaning as exampleMeaning
    FROM vocabularies
    WHERE hanzi = ?
  `).get(hanzi) as VocabItem | undefined;

  return row || null;
}
