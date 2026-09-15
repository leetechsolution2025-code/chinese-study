// Cache in-memory để tiết kiệm ký tự và tốc độ phản hồi
const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();

export async function generateElevenLabsSpeech(text: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey.length < 10) {
    return null;
  }

  const voiceId = process.env.ELEVENLABS_VOICE_ID || 'Xb7hH8MSUJpSbSDYk0k2'; // Alice (premade voice)
  const cacheKey = `${voiceId}:${text.trim()}`;

  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`ElevenLabs TTS failed (${response.status}):`, errText);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = { buffer, contentType: 'audio/mpeg' };

    // Lưu cache (tối đa 200 items)
    if (audioCache.size > 200) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Error in ElevenLabs TTS fetch:', error);
    return null;
  }
}
