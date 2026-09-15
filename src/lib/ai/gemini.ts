export interface GeminiChatResponse {
  hanzi: string;
  pinyin: string;
  vi: string;
  en?: string;
  correction?: string | null;
  tip?: string | null;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

let currentKeyIndex = 0;

function getGeminiApiKeys(): string[] {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
  return keysStr
    .split(',')
    .map((k) => k.trim().replace(/^["']|["']$/g, ''))
    .filter((k) => k.length > 10);
}

export async function chatWithGemini(params: {
  message: string;
  scenario?: string;
  history?: ChatMessage[];
  language?: 'vi' | 'en';
}): Promise<GeminiChatResponse> {
  const keys = getGeminiApiKeys();
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const isEn = params.language === 'en';

  const scenarioPromptsVi: Record<string, string> = {
    order_food: 'Tình huống: Người học đang ở nhà hàng Trung Quốc và muốn gọi món ăn. Bạn là người phục vụ quán ăn nhiệt tình.',
    greeting: 'Tình huống: Bạn mới gặp người học lần đầu và đang làm quen, trò chuyện thân thiện, lịch sự.',
    shopping: 'Tình huống: Người học đang ở cửa hàng mua sắm quần áo/đồ lưu niệm. Bạn là nhân viên bán hàng chu đáo.',
    directions: 'Tình huống: Người học đang hỏi đường đến địa điểm (bến xe, ga tàu, thư viện). Bạn là người dân địa phương chỉ đường nhiệt tình.',
    free_talk: 'Tình huống: Trò chuyện tự do bằng tiếng Trung về cuộc sống, sở thích, học tập.',
  };

  const scenarioPromptsEn: Record<string, string> = {
    order_food: 'Scenario: The learner is at a Chinese restaurant ordering food. You are a polite and helpful waiter.',
    greeting: 'Scenario: You meet the learner for the first time, having a warm, friendly introductory conversation.',
    shopping: 'Scenario: The learner is shopping for clothes or souvenirs. You are an attentive store clerk.',
    directions: 'Scenario: The learner is asking for directions to a subway/bus station. You are a helpful local resident.',
    free_talk: 'Scenario: Casual conversation in Chinese about daily life, hobbies, and study.',
  };

  const scenarioContext = isEn
    ? (scenarioPromptsEn[params.scenario || 'free_talk'] || scenarioPromptsEn.free_talk)
    : (scenarioPromptsVi[params.scenario || 'free_talk'] || scenarioPromptsVi.free_talk);

  const systemInstruction = isEn
    ? `
You are a friendly, professional native Chinese tutor helping English speakers learn and practice spoken Chinese.
Communication Context: ${scenarioContext}

Your mission:
1. Read the learner's message (in Chinese, Pinyin, or English).
2. Reply naturally and concisely in simplified Chinese, tailored for HSK 1 - HSK 4 learners.
3. If the learner made grammar or phrasing mistakes, provide a clear, encouraging explanation in English in the "correction" field. If they spoke accurately, set "correction": null.
4. Share a useful communication tip or grammar nuance in English in the "tip" field.
5. Provide a natural English translation of your Chinese reply in the "translation" field.
6. Return STRICTLY a valid JSON object (no markdown code blocks, no additional text):
{
  "hanzi": "Simplified Chinese reply",
  "pinyin": "Accurate pinyin with tone marks",
  "translation": "Natural English translation of the reply",
  "correction": "Correction and explanation in English if needed, or null",
  "tip": "Helpful vocabulary or conversational tip in English, or null"
}
`
    : `
Bạn là một gia sư tiếng Trung bản xứ chuyên nghiệp, hỗ trợ người Việt Nam học và luyện khẩu ngữ tiếng Trung.
Bối cảnh giao tiếp: ${scenarioContext}

Nhiệm vụ của bạn:
1. Đọc tin nhắn tiếng Trung (hoặc tiếng Việt/Pinyin) của người học.
2. Trả lời lại một cách tự nhiên, ngắn gọn, phù hợp với trình độ HSK 1 - HSK 4.
3. Nếu người học nói sai ngữ pháp hoặc dùng từ chưa chuẩn, hãy nhận xét nhẹ nhàng ở trường "correction".
4. BẮT BUỘC trả về định dạng JSON thuần túy (không bọc trong markdown code block, không thêm text ngoài JSON) theo đúng cấu trúc sau:
{
  "hanzi": "Câu trả lời bằng chữ Hán giản thể",
  "pinyin": "Phiên âm Pinyin có dấu thanh điệu chuẩn xác",
  "vi": "Bản dịch câu trả lời sang tiếng Việt tự nhiên",
  "correction": "Nhận xét sửa lỗi ngữ pháp/phát âm cho người học nếu có, hoặc null nếu người học nói tốt",
  "tip": "Mẹo học từ vựng hoặc điểm ngữ pháp hữu ích liên quan, hoặc null"
}
`;

  if (keys.length === 0) {
    return getFallbackResponse(params.scenario, isEn);
  }

  // Thử các key theo cơ chế xoay vòng (round-robin / failover)
  const startIndex = currentKeyIndex % keys.length;
  for (let i = 0; i < keys.length; i++) {
    const keyIdx = (startIndex + i) % keys.length;
    const apiKey = keys[keyIdx];

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: `${systemInstruction}\n\nLearner says: "${params.message}"`,
            },
          ],
        },
      ];

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) {
        console.warn(`Gemini Key ${keyIdx} failed with status ${res.status}. Trying next key...`);
        continue;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        currentKeyIndex = keyIdx; // Ghi nhận key đang hoạt động tốt
        try {
          const cleaned = rawText.replace(/```json\n?|```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          const translation = parsed.translation || parsed.en || parsed.vi;
          return {
            hanzi: parsed.hanzi || '你说得很好！',
            pinyin: parsed.pinyin || 'Nǐ shuō de hěn hǎo!',
            vi: parsed.vi || translation || 'Bạn nói rất tốt!',
            en: parsed.en || translation || 'You spoke very well!',
            correction: parsed.correction || null,
            tip: parsed.tip || null,
          };
        } catch (e) {
          // Cố gắng trích xuất các trường nếu JSON bị cắt cuối
          const hanziMatch = rawText.match(/"hanzi":\s*"([^"]+)"/);
          const pinyinMatch = rawText.match(/"pinyin":\s*"([^"]+)"/);
          const viMatch = rawText.match(/"(?:vi|translation)":\s*"([^"]+)"/);
          if (hanziMatch) {
            const trans = viMatch ? viMatch[1] : '';
            return {
              hanzi: hanziMatch[1],
              pinyin: pinyinMatch ? pinyinMatch[1] : '',
              vi: trans || 'Bạn nói rất tốt!',
              en: trans || 'You spoke very well!',
              correction: null,
              tip: null,
            };
          }
          console.error('Failed to parse Gemini JSON output:', rawText);
        }
      }
    } catch (err) {
      console.warn(`Error connecting with Gemini key index ${keyIdx}:`, err);
    }
  }

  // Nếu tất cả API keys đều lỗi hoặc hết quota, trả về fallback an toàn
  return getFallbackResponse(params.scenario, isEn);
}

function getFallbackResponse(scenario?: string, isEn?: boolean): GeminiChatResponse {
  if (isEn) {
    const responsesEn: Record<string, GeminiChatResponse> = {
      order_food: {
        hanzi: '你想吃点儿什么？我们这里的牛肉面和饺子非常好吃。',
        pinyin: 'Nǐ xiǎng chī diǎnr shénme? Wǒmen zhèlǐ de niúròumiàn hé jiǎozi fēicháng hǎochī.',
        vi: 'Bạn muốn ăn chút gì? Món mì bò và sủi cảo ở đây rất ngon.',
        en: 'What would you like to eat? The beef noodles and dumplings here are very delicious.',
        tip: 'When ordering dishes, you can say: 我想吃... (Wǒ xiǎng chī...) or 我要一份... (Wǒ yào yí fèn...).',
      },
      greeting: {
        hanzi: '你好！很高兴认识你。今天过得怎么样？',
        pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Jīntiān guò de zěnmeyàng?',
        vi: 'Chào bạn! Rất vui được làm quen với bạn. Hôm nay của bạn thế nào?',
        en: 'Hello! Nice to meet you. How is your day going?',
        tip: 'You can respond with: 我很好，你呢？ (Wǒ hěn hǎo, nǐ ne? - I am fine, and you?).',
      },
      shopping: {
        hanzi: '这件衣服质量很好，你要试穿一下吗？',
        pinyin: 'Zhè jiàn yīfu zhìliàng hěn hǎo, nǐ yào shìchuān yíxià ma?',
        vi: 'Chiếc áo này chất lượng rất tốt, bạn có muốn mặc thử không?',
        en: 'This garment is high quality. Would you like to try it on?',
        tip: 'The word 试穿 (shìchuān) means to try on clothes, while 试 (shì) means to try in general.',
      },
      directions: {
        hanzi: '地铁站在前面十字路口往左拐，走五分钟就到了。',
        pinyin: 'Dìtiězhàn zài qiánmian shízì lùkǒu wǎng zuǒ guǎi, zǒu wǔ fēnzhōng jiù dào le.',
        vi: 'Ga tàu điện ngầm ở ngã tư phía trước rẽ trái, đi bộ 5 phút là tới nơi.',
        en: 'Turn left at the intersection ahead, walk for five minutes, and you will arrive at the subway station.',
        tip: 'Direction grammar: 往 + Direction (左/右/前) + 拐/走 (turn/walk towards...).',
      },
    };
    return (
      responsesEn[scenario || 'greeting'] || {
        hanzi: '你说得很有道理，我们可以继续用中文聊聊！',
        pinyin: 'Nǐ shuō de hěn yǒu dàoli, wǒmen kěyǐ jìxù yòng Zhōngwén liáoliao!',
        vi: 'Bạn nói rất có lý, chúng ta có thể tiếp tục trò chuyện bằng tiếng Trung nhé!',
        en: 'That makes total sense! Let us continue chatting in Chinese.',
        tip: 'Consistent practice every day is the most effective path to fluency.',
      }
    );
  }

  const responses: Record<string, GeminiChatResponse> = {
    order_food: {
      hanzi: '你想吃点儿什么？我们这里的牛肉面和饺子非常好吃。',
      pinyin: 'Nǐ xiǎng chī diǎnr shénme? Wǒmen zhèlǐ de niúròumiàn hé jiǎozi fēicháng hǎochī.',
      vi: 'Bạn muốn ăn chút gì? Món mì bò và sủi cảo ở đây rất ngon.',
      en: 'What would you like to eat? The beef noodles and dumplings here are delicious.',
      tip: 'Khi gọi món, bạn có thể nói: 我想吃... (Wǒ xiǎng chī...) hoặc 我要一份... (Wǒ yào yí fèn...)',
    },
    greeting: {
      hanzi: '你好！很高兴认识你。今天过得怎么样？',
      pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Jīntiān guò de zěnmeyàng?',
      vi: 'Chào bạn! Rất vui được làm quen với bạn. Hôm nay của bạn thế nào?',
      en: 'Hello! Nice to meet you. How has your day been?',
      tip: 'Đáp lại câu hỏi này bạn có thể dùng: 我很好，你呢？ (Wǒ hěn hǎo, nǐ ne?)',
    },
    shopping: {
      hanzi: '这件衣服质量很好，你要试穿一下吗？',
      pinyin: 'Zhè jiàn yīfu zhìliàng hěn hǎo, nǐ yào shìchuān yíxià ma?',
      vi: 'Chiếc áo này chất lượng rất tốt, bạn có muốn mặc thử không?',
      en: 'This shirt is high quality. Would you like to try it on?',
      tip: 'Từ 试穿 (shìchuān) nghĩa là thử quần áo, còn 试 (shì) là thử nói chung.',
    },
    directions: {
      hanzi: '地铁站在前面十字路口往左拐，走五分钟就到了。',
      pinyin: 'Dìtiězhàn zài qiánmian shízì lùkǒu wǎng zuǒ guǎi, zǒu wǔ fēnzhōng jiù dào le.',
      vi: 'Ga tàu điện ngầm ở ngã tư phía trước rẽ trái, đi bộ 5 phút là tới nơi.',
      en: 'Turn left at the intersection ahead, and walk for 5 minutes to reach the subway station.',
      tip: 'Cấu trúc chỉ phương hướng: 往 + Hướng (左/右/前) + 拐/走 (wǎng... guǎi/zǒu).',
    },
  };

  return (
    responses[scenario || 'greeting'] || {
      hanzi: '你说得很有道理，我们可以继续用中文聊聊！',
      pinyin: 'Nǐ shuō de hěn yǒu dàoli, wǒmen kěyǐ jìxù yòng Zhōngwén liáoliao!',
      vi: 'Bạn nói rất có lý, chúng ta có thể tiếp tục trò chuyện bằng tiếng Trung nhé!',
      en: 'That makes total sense! Let us continue chatting in Chinese.',
      tip: 'Đừng ngại mắc lỗi khi giao tiếp tiếng Trung, thực hành hàng ngày là bí quyết thành công.',
    }
  );
}
