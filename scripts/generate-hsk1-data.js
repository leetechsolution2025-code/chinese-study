const fs = require('fs');
const path = require('path');

const hsk1Lessons = [
  {
    id: 'hsk1-lesson-01',
    courseId: 'hsk1',
    lessonNumber: 1,
    stage: 1,
    stageTitleVi: 'Chặng 1: Nhập môn Ngữ âm & Chào hỏi cơ bản',
    stageTitleEn: 'Stage 1: Pinyin Phonetics & Basic Greetings',
    titleHanzi: '你好',
    titlePinyin: 'Nǐ hǎo',
    titleVi: 'Chào bạn',
    titleEn: 'Hello',
    radicals: ['一 (Nhất)', '丨 (Cổn)', '丿 (Phiệt)', '丶 (Điểm)', '乙 (Ất)'],
    writingChars: ['一', '二', '三', '十', '八', '六'],
    audioFile: '/audio/hsk1/01-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1 (Chào hỏi cá nhân)', file: '/audio/hsk1/01-1.mp3' },
      { name: 'Bài khóa 2 (Kính ngữ & Số nhiều)', file: '/audio/hsk1/01-2.mp3' },
      { name: 'Ngữ âm: Luyện 4 thanh điệu', file: '/audio/hsk1/01-4.mp3' }
    ],
    objectives: [
      'Biết cách chào hỏi và đáp lại lời chào thông dụng trong tiếng Trung.',
      'Nắm vững đại từ nhân xưng ngôi thứ 2 (你) và thể kính trọng (您).',
      'Làm quen với 4 thanh điệu và quy tắc biến điệu hai thanh 3 (nǐ hǎo -> ní hǎo).'
    ],
    objectivesEn: [
      'Learn how to greet and respond to greetings politely in Chinese.',
      'Master 2nd-person pronouns: informal (你) and polite (您).',
      'Understand the 4 tones and 3rd tone sandhi rule (nǐ hǎo -> ní hǎo).'
    ],
    dialogue: [
      {
        speaker: 'A',
        hanzi: '你好！',
        pinyin: 'Nǐ hǎo!',
        vi: 'Chào bạn!',
        en: 'Hello!'
      },
      {
        speaker: 'B',
        hanzi: '你好！',
        pinyin: 'Nǐ hǎo!',
        vi: 'Chào bạn!',
        en: 'Hello!'
      },
      {
        speaker: 'A',
        hanzi: '您好！',
        pinyin: 'Nín hǎo!',
        vi: 'Kính chào ngài / thầy / cô!',
        en: 'Hello! (polite form)'
      },
      {
        speaker: 'B',
        hanzi: '你们好！',
        pinyin: 'Nǐmen hǎo!',
        vi: 'Chào các bạn!',
        en: 'Hello everyone!'
      },
      {
        speaker: 'A',
        hanzi: '对不起！',
        pinyin: 'Duìbuqǐ!',
        vi: 'Xin lỗi!',
        en: 'I am sorry!'
      },
      {
        speaker: 'B',
        hanzi: '没关系！',
        pinyin: 'Méi guānxi!',
        vi: 'Không sao đâu!',
        en: "It doesn't matter!"
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-001',
        hanzi: '你',
        pinyin: 'nǐ',
        hanviet: 'Nhĩ',
        meaning: 'Bạn, anh, chị (ngôi thứ 2 số ít)',
        meaningEn: 'you (singular, informal)',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 7,
        radical: '亻',
        exampleHanzi: '你好！',
        examplePinyin: 'Nǐ hǎo!',
        exampleMeaning: 'Chào bạn!',
        exampleMeaningEn: 'Hello!'
      },
      {
        id: 'hsk1-002',
        hanzi: '好',
        pinyin: 'hǎo',
        hanviet: 'Hảo',
        meaning: 'Tốt, đẹp, khỏe, an lành',
        meaningEn: 'good, fine, well',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 6,
        radical: '女',
        exampleHanzi: '很好！',
        examplePinyin: 'Hěn hǎo!',
        exampleMeaning: 'Rất tốt!',
        exampleMeaningEn: 'Very good!'
      },
      {
        id: 'hsk1-003',
        hanzi: '您',
        pinyin: 'nín',
        hanviet: 'Nẫm',
        meaning: 'Ngài, ông, bà (kính ngữ của 你)',
        meaningEn: 'you (polite, formal)',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 11,
        radical: '心',
        exampleHanzi: '老师，您好！',
        examplePinyin: 'Lǎoshī, nín hǎo!',
        exampleMeaning: 'Em chào thầy/cô ạ!',
        exampleMeaningEn: 'Hello teacher!'
      },
      {
        id: 'hsk1-004',
        hanzi: '你们',
        pinyin: 'nǐmen',
        hanviet: 'Nhĩ môn',
        meaning: 'Các bạn, các anh chị',
        meaningEn: 'you (plural)',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 9,
        radical: '亻',
        exampleHanzi: '你们好！',
        examplePinyin: 'Nǐmen hǎo!',
        exampleMeaning: 'Chào các bạn!',
        exampleMeaningEn: 'Hello everyone!'
      },
      {
        id: 'hsk1-005',
        hanzi: '对不起',
        pinyin: 'duìbuqǐ',
        hanviet: 'Đối bất khởi',
        meaning: 'Xin lỗi',
        meaningEn: 'sorry, excuse me',
        level: 1,
        partOfSpeech: 'Cụm từ',
        strokes: 12,
        radical: '寸',
        exampleHanzi: '对不起，我来晚了。',
        examplePinyin: 'Duìbuqǐ, wǒ lái wǎn le.',
        exampleMeaning: 'Xin lỗi, tôi đến muộn.',
        exampleMeaningEn: 'Sorry, I am late.'
      },
      {
        id: 'hsk1-006',
        hanzi: '没关系',
        pinyin: 'méi guānxi',
        hanviet: 'Một quan hệ',
        meaning: 'Không sao đâu, không hề gì',
        meaningEn: "that's all right, no problem",
        level: 1,
        partOfSpeech: 'Cụm từ',
        strokes: 17,
        radical: '氵',
        exampleHanzi: '没关系，请进！',
        examplePinyin: 'Méi guānxi, qǐng jìn!',
        exampleMeaning: 'Không sao đâu, mời vào!',
        exampleMeaningEn: "No problem, please come in!"
      }
    ],
    grammarPoints: [
      {
        title: 'Đại từ nhân xưng ngôi 2: 你 vs 您',
        titleEn: 'Personal Pronouns: 你 vs 您',
        explanation: '你 (nǐ) dùng với bạn bè, người bằng hoặc nhỏ tuổi hơn. 您 (nín) gồm 你 ở trên và bộ 心 (trái tim) ở dưới, dùng để bày tỏ sự kính trọng với người lớn tuổi, thầy cô, khách hàng.',
        explanationEn: '你 (nǐ) is used for peers and juniors. 您 (nín) includes the heart radical 心 at the bottom, expressing deep respect to elders, teachers, or clients.',
        structure: 'Bạn bè: 你好 / Tiền bối, thầy cô: 您好',
        examples: [
          { hanzi: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Chào bạn!', en: 'Hello!' },
          { hanzi: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', vi: 'Chào thầy cô ạ!', en: 'Hello teacher!' }
        ]
      },
      {
        title: 'Quy tắc biến điệu hai thanh 3',
        titleEn: '3rd Tone Sandhi Rule',
        explanation: 'Khi hai âm tiết mang thanh 3 đi liền nhau, âm tiết thứ nhất sẽ biến đổi phát âm thành thanh 2. Cách viết pinyin và chữ Hán vẫn giữ nguyên.',
        explanationEn: 'When two third-tone syllables appear consecutively, the first syllable is pronounced as a second tone (e.g. nǐ hǎo -> ní hǎo). Pinyin spelling remains unchanged.',
        structure: 'Thanh 3 + Thanh 3 => Đọc thành Thanh 2 + Thanh 3',
        examples: [
          { hanzi: '你好', pinyin: 'nǐ hǎo (đọc: ní hǎo)', vi: 'Chào bạn', en: 'Hello' },
          { hanzi: '可以', pinyin: 'kěyǐ (đọc: kéyǐ)', vi: 'Có thể', en: 'Can / May' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q1-1',
        question: 'Khi ai đó nói "对不起！" (Xin lỗi), bạn nên đáp lại như thế nào?',
        questionEn: 'When someone says "对不起！" (Sorry), what should you reply?',
        options: ['没关系！', '不客气！', '你好！', '再见！'],
        correctIndex: 0,
        explanation: 'Đáp lại lời xin lỗi "对不起" là "没关系" (Không sao đâu).'
      },
      {
        id: 'q1-2',
        question: 'Từ nào dùng để chào hỏi người lớn tuổi hoặc thầy cô một cách lịch sự, tôn trọng?',
        questionEn: 'Which word is used to greet an elder or teacher politely?',
        options: ['你好', '您好', '你们好', '对不起'],
        correctIndex: 1,
        explanation: '您 (nín) là dạng kính ngữ của 你 (nǐ), dùng để chào hỏi trang trọng.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-02',
    courseId: 'hsk1',
    lessonNumber: 2,
    stage: 1,
    stageTitleVi: 'Chặng 1: Nhập môn Ngữ âm & Chào hỏi cơ bản',
    stageTitleEn: 'Stage 1: Pinyin Phonetics & Basic Greetings',
    titleHanzi: '谢谢你',
    titlePinyin: 'Xièxie nǐ',
    titleVi: 'Cảm ơn bạn',
    titleEn: 'Thank you',
    radicals: ['口 (Khẩu)', '见 (Kiến)', '山 (Sơn)', '小 (Tiểu)', '不 (Bất)'],
    writingChars: ['口', '见', '山', '小', '不'],
    audioFile: '/audio/hsk1/02-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1 (Cảm ơn & Đáp lại)', file: '/audio/hsk1/02-1.mp3' },
      { name: 'Bài khóa 2 (Tạm biệt)', file: '/audio/hsk1/02-3.mp3' },
      { name: 'Ngữ âm: Thanh nhẹ & Biến điệu của 不', file: '/audio/hsk1/02-4.mp3' }
    ],
    objectives: [
      'Học cách nói lời cảm ơn và đáp lại lời cảm ơn một cách tự nhiên.',
      'Biết cách chào tạm biệt trong các hoàn cảnh hàng ngày.',
      'Nắm vững quy tắc phát âm thanh nhẹ (khinh thanh) và biến điệu của từ 不 (bù).'
    ],
    objectivesEn: [
      'Learn how to express gratitude and respond gracefully.',
      'Learn standard farewell expressions.',
      'Master neutral tones and tone changes of 不 (bù).'
    ],
    dialogue: [
      {
        speaker: 'A',
        hanzi: '谢谢！',
        pinyin: 'Xièxie!',
        vi: 'Cảm ơn!',
        en: 'Thanks!'
      },
      {
        speaker: 'B',
        hanzi: '不谢！',
        pinyin: 'Bú xiè!',
        vi: 'Không có gì!',
        en: "Don't mention it!"
      },
      {
        speaker: 'A',
        hanzi: '谢谢你！',
        pinyin: 'Xièxie nǐ!',
        vi: 'Cảm ơn bạn!',
        en: 'Thank you!'
      },
      {
        speaker: 'B',
        hanzi: '不客气！',
        pinyin: 'Bú kèqi!',
        vi: 'Đừng khách sáo / Không có chi!',
        en: "You're welcome!"
      },
      {
        speaker: 'A',
        hanzi: '再见！',
        pinyin: 'Zàijiàn!',
        vi: 'Tạm biệt!',
        en: 'Goodbye!'
      },
      {
        speaker: 'B',
        hanzi: '再见！',
        pinyin: 'Zàijiàn!',
        vi: 'Tạm biệt!',
        en: 'Goodbye!'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-007',
        hanzi: '谢谢',
        pinyin: 'xièxie',
        hanviet: 'Tạ tạ',
        meaning: 'Cảm ơn',
        meaningEn: 'to thank, thanks',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 12,
        radical: '讠',
        exampleHanzi: '谢谢你！',
        examplePinyin: 'Xièxie nǐ!',
        exampleMeaning: 'Cảm ơn bạn!',
        exampleMeaningEn: 'Thank you!'
      },
      {
        id: 'hsk1-008',
        hanzi: '不',
        pinyin: 'bù',
        hanviet: 'Bất',
        meaning: 'Không (phó từ phủ định)',
        meaningEn: 'not, no',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 4,
        radical: '一',
        exampleHanzi: '不好。',
        examplePinyin: 'Bù hǎo.',
        exampleMeaning: 'Không tốt.',
        exampleMeaningEn: 'Not good.'
      },
      {
        id: 'hsk1-009',
        hanzi: '客气',
        pinyin: 'kèqi',
        hanviet: 'Khách khí',
        meaning: 'Khách sáo, lịch thiệp',
        meaningEn: 'polite, courteous',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 13,
        radical: '宀',
        exampleHanzi: '太客气了！',
        examplePinyin: 'Tài kèqi le!',
        exampleMeaning: 'Khách sáo quá rồi!',
        exampleMeaningEn: 'Too polite!'
      },
      {
        id: 'hsk1-010',
        hanzi: '不客气',
        pinyin: 'bú kèqi',
        hanviet: 'Bất khách khí',
        meaning: 'Không có chi, đừng khách sáo',
        meaningEn: "you're welcome",
        level: 1,
        partOfSpeech: 'Cụm từ',
        strokes: 17,
        radical: '宀',
        exampleHanzi: '别客气，快请坐。',
        examplePinyin: 'Bié kèqi, kuài qǐng zuò.',
        exampleMeaning: 'Đừng khách sáo, mau ngồi đi.',
        exampleMeaningEn: "Don't be polite, please sit down."
      },
      {
        id: 'hsk1-011',
        hanzi: '再见',
        pinyin: 'zàijiàn',
        hanviet: 'Tái kiến',
        meaning: 'Tạm biệt (hẹn gặp lại)',
        meaningEn: 'goodbye, see you again',
        level: 1,
        partOfSpeech: 'Cụm từ',
        strokes: 10,
        radical: '冂',
        exampleHanzi: '明天再见！',
        examplePinyin: 'Míngtiān zàijiàn!',
        exampleMeaning: 'Ngày mai gặp lại nhé!',
        exampleMeaningEn: 'See you tomorrow!'
      }
    ],
    grammarPoints: [
      {
        title: 'Biến điệu của phó từ phủ định "不" (bù)',
        titleEn: 'Tone Change of "不" (bù)',
        explanation: 'Từ "不" gốc mang thanh 4 (bù). Nhưng khi đứng trước một từ mang thanh 4, nó sẽ biến thành thanh 2 (bú). Đứng trước các thanh 1, 2, 3 thì giữ nguyên thanh 4.',
        explanationEn: '"不" is originally 4th tone (bù). When followed by another 4th tone syllable, it changes to 2nd tone (bú). Before 1st, 2nd, and 3rd tones, it remains 4th tone.',
        structure: '不 (bù) + Thanh 4 => Đọc là bú (ví dụ: 不客气 bú kèqi, 不是 bú shì)',
        examples: [
          { hanzi: '不谢', pinyin: 'bú xiè', vi: 'Không có gì', en: "Don't mention it" },
          { hanzi: '不好', pinyin: 'bù hǎo', vi: 'Không tốt', en: 'Not good' }
        ]
      },
      {
        title: 'Thanh nhẹ (Neutral tone)',
        titleEn: 'Neutral Tone in Chinese',
        explanation: 'Một số âm tiết trong tiếng Trung phát âm ngắn, nhẹ và không có dấu thanh điệu (ví dụ: xièxie, kèqi, nǐmen).',
        explanationEn: 'Certain syllables are pronounced short and light without tonal marks, known as the neutral tone (e.g., xièxie, kèqi).',
        structure: 'Âm tiết chính (có thanh) + Âm tiết nhẹ (không dấu thanh)',
        examples: [
          { hanzi: '谢谢', pinyin: 'xièxie', vi: 'Cảm ơn', en: 'Thanks' },
          { hanzi: '他们', pinyin: 'tāmen', vi: 'Họ', en: 'They' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q2-1',
        question: 'Khi đứng trước âm tiết mang thanh 4 (ví dụ: 谢 xiè), từ "不" đọc theo thanh điệu nào?',
        questionEn: 'When placed before a 4th tone syllable, which tone does "不" take?',
        options: ['Thanh 1 (bū)', 'Thanh 2 (bú)', 'Thanh 3 (bǔ)', 'Thanh 4 (bù)'],
        correctIndex: 1,
        explanation: 'Quy tắc biến điệu: 不 (bù) + Thanh 4 đổi thành bú (Thanh 2).'
      },
      {
        id: 'q2-2',
        question: 'Đáp lại lời cảm ơn "谢谢你！" thì câu nào chuẩn mực nhất?',
        questionEn: 'Which is the most standard response to "谢谢你！"?',
        options: ['没关系', '不客气', '再见', '对不起'],
        correctIndex: 1,
        explanation: 'Khi ai đó cảm ơn "谢谢你", ta đáp lại "不客气" (Đừng khách sáo).'
      }
    ]
  },
  {
    id: 'hsk1-lesson-03',
    courseId: 'hsk1',
    lessonNumber: 3,
    stage: 1,
    stageTitleVi: 'Chặng 1: Nhập môn Ngữ âm & Chào hỏi cơ bản',
    stageTitleEn: 'Stage 1: Pinyin Phonetics & Basic Greetings',
    titleHanzi: '你叫什么名字',
    titlePinyin: 'Nǐ jiào shénme míngzi',
    titleVi: 'Bạn tên là gì',
    titleEn: "What's your name",
    radicals: ['月 (Nguyệt)', '心 (Tâm)', '中 (Trung)', '人 (Nhân)', '大 (Đại)'],
    writingChars: ['月', '心', '中', '人', '大'],
    audioFile: '/audio/hsk1/03-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Hỏi và trả lời tên họ', file: '/audio/hsk1/03-1.mp3' },
      { name: 'Bài khóa 2: Hỏi quốc tịch', file: '/audio/hsk1/03-2.mp3' },
      { name: 'Bài khóa 3: Giới thiệu thân phận', file: '/audio/hsk1/03-3.mp3' }
    ],
    objectives: [
      'Biết cách hỏi tên và tự giới thiệu họ tên của bản thân.',
      'Làm chủ đại từ nghi vấn 什么 (shénme - cái gì) trong câu hỏi.',
      'Nắm vững động từ phán đoán 是 (shì - là) và cấu trúc câu hỏi 吗 (ma).'
    ],
    objectivesEn: [
      'Learn how to ask and introduce names in Chinese.',
      'Master the interrogative pronoun 什么 (shénme - what).',
      'Learn the equative verb 是 (shì - to be) and yes/no question particle 吗 (ma).'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你叫什么名字？',
        pinyin: 'Nǐ jiào shénme míngzi?',
        vi: 'Bạn tên là gì?',
        en: "What's your name?"
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我叫大卫。',
        pinyin: 'Wǒ jiào Dàwèi.',
        vi: 'Tôi tên là David.',
        en: 'My name is David.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你是中国人吗？',
        pinyin: 'Nǐ shì Zhōngguó rén ma?',
        vi: 'Bạn là người Trung Quốc phải không?',
        en: 'Are you Chinese?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我不是中国人，我是美国人。',
        pinyin: 'Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.',
        vi: 'Tôi không phải người Trung Quốc, tôi là người Mỹ.',
        en: 'I am not Chinese, I am American.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你是老师吗？',
        pinyin: 'Nǐ shì lǎoshī ma?',
        vi: 'Bạn là giáo viên phải không?',
        en: 'Are you a teacher?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我不是老师，我是学生。',
        pinyin: 'Wǒ bú shì lǎoshī, wǒ shì xuésheng.',
        vi: 'Tôi không phải giáo viên, tôi là học sinh.',
        en: 'I am not a teacher, I am a student.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-012',
        hanzi: '叫',
        pinyin: 'jiào',
        hanviet: 'Khiếu',
        meaning: 'Tên là, gọi là, kêu',
        meaningEn: 'to be called, to call',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 5,
        radical: '口',
        exampleHanzi: '你叫什么？',
        examplePinyin: 'Nǐ jiào shénme?',
        exampleMeaning: 'Bạn tên là gì?',
        exampleMeaningEn: "What's your name?"
      },
      {
        id: 'hsk1-013',
        hanzi: '什么',
        pinyin: 'shénme',
        hanviet: 'Thập ma',
        meaning: 'Cái gì, gì',
        meaningEn: 'what',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 7,
        radical: '亻',
        exampleHanzi: '这是什么？',
        examplePinyin: 'Zhè shì shénme?',
        exampleMeaning: 'Đây là cái gì?',
        exampleMeaningEn: 'What is this?'
      },
      {
        id: 'hsk1-014',
        hanzi: '名字',
        pinyin: 'míngzi',
        hanviet: 'Danh tự',
        meaning: 'Tên, họ tên',
        meaningEn: 'name',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '夕',
        exampleHanzi: '我的名字叫李月。',
        examplePinyin: 'Wǒ de míngzi jiào Lǐ Yuè.',
        exampleMeaning: 'Tên tôi là Lý Nguyệt.',
        exampleMeaningEn: 'My name is Li Yue.'
      },
      {
        id: 'hsk1-015',
        hanzi: '我',
        pinyin: 'wǒ',
        hanviet: 'Ngã',
        meaning: 'Tôi, mình, ta (ngôi thứ nhất)',
        meaningEn: 'I, me',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 7,
        radical: '戈',
        exampleHanzi: '我是学生。',
        examplePinyin: 'Wǒ shì xuésheng.',
        exampleMeaning: 'Tôi là học sinh.',
        exampleMeaningEn: 'I am a student.'
      },
      {
        id: 'hsk1-016',
        hanzi: '是',
        pinyin: 'shì',
        hanviet: 'Thị',
        meaning: 'Là, phải, đúng',
        meaningEn: 'to be, yes',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 9,
        radical: '日',
        exampleHanzi: '我是越南人。',
        examplePinyin: 'Wǒ shì Yuènán rén.',
        exampleMeaning: 'Tôi là người Việt Nam.',
        exampleMeaningEn: 'I am Vietnamese.'
      },
      {
        id: 'hsk1-017',
        hanzi: '老师',
        pinyin: 'lǎoshī',
        hanviet: 'Lão sư',
        meaning: 'Giáo viên, thầy cô giáo',
        meaningEn: 'teacher',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '老',
        exampleHanzi: '李老师很好。',
        examplePinyin: 'Lǐ lǎoshī hěn hǎo.',
        exampleMeaning: 'Thầy Lý rất tốt.',
        exampleMeaningEn: 'Teacher Li is very good.'
      },
      {
        id: 'hsk1-018',
        hanzi: '吗',
        pinyin: 'ma',
        hanviet: 'Ma',
        meaning: '...không? (trợ từ nghi vấn)',
        meaningEn: 'question particle for yes/no',
        level: 1,
        partOfSpeech: 'Trợ từ',
        strokes: 6,
        radical: '口',
        exampleHanzi: '你好吗？',
        examplePinyin: 'Nǐ hǎo ma?',
        exampleMeaning: 'Bạn khỏe không?',
        exampleMeaningEn: 'How are you?'
      },
      {
        id: 'hsk1-019',
        hanzi: '学生',
        pinyin: 'xuésheng',
        hanviet: 'Học sinh',
        meaning: 'Học sinh, sinh viên',
        meaningEn: 'student',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 13,
        radical: '子',
        exampleHanzi: '他们是学生。',
        examplePinyin: 'Tāmen shì xuésheng.',
        exampleMeaning: 'Họ là học sinh.',
        exampleMeaningEn: 'They are students.'
      },
      {
        id: 'hsk1-020',
        hanzi: '人',
        pinyin: 'rén',
        hanviet: 'Nhân',
        meaning: 'Người',
        meaningEn: 'person, people',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 2,
        radical: '人',
        exampleHanzi: '中国人',
        examplePinyin: 'Zhōngguó rén',
        exampleMeaning: 'Người Trung Quốc',
        exampleMeaningEn: 'Chinese person'
      },
      {
        id: 'hsk1-021',
        hanzi: '中国',
        pinyin: 'Zhōngguó',
        hanviet: 'Trung Quốc',
        meaning: 'Nước Trung Quốc',
        meaningEn: 'China',
        level: 1,
        partOfSpeech: 'Danh từ riêng',
        strokes: 12,
        radical: '丨',
        exampleHanzi: '我在中国。',
        examplePinyin: 'Wǒ zài Zhōngguó.',
        exampleMeaning: 'Tôi ở Trung Quốc.',
        exampleMeaningEn: 'I am in China.'
      },
      {
        id: 'hsk1-022',
        hanzi: '美国',
        pinyin: 'Měiguó',
        hanviet: 'Mỹ Quốc',
        meaning: 'Nước Mỹ',
        meaningEn: 'United States, America',
        level: 1,
        partOfSpeech: 'Danh từ riêng',
        strokes: 17,
        radical: '八',
        exampleHanzi: '他是美国人。',
        examplePinyin: 'Tā shì Měiguó rén.',
        exampleMeaning: 'Anh ấy là người Mỹ.',
        exampleMeaningEn: 'He is American.'
      }
    ],
    grammarPoints: [
      {
        title: 'Đại từ nghi vấn "什么" (shénme)',
        titleEn: 'Interrogative Pronoun "什么" (shénme)',
        explanation: 'Dùng để hỏi "cái gì". Trong tiếng Trung, đại từ nghi vấn giữ nguyên vị trí trong câu như thành phần mà nó thay thế, không cần đảo ngữ lên đầu câu như tiếng Anh.',
        explanationEn: '"什么" means "what". In Chinese questions, question words remain in the same syntactic position as the answer, without subject-auxiliary inversion.',
        structure: 'Chủ ngữ + Động từ + 什么 (+ Danh từ)?',
        examples: [
          { hanzi: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?', en: "What's your name?" },
          { hanzi: '这是什么？', pinyin: 'Zhè shì shénme?', vi: 'Đây là cái gì?', en: 'What is this?' }
        ]
      },
      {
        title: 'Động từ phán đoán "是" (shì) và phủ định "不是"',
        titleEn: 'The Equative Verb "是" and Negation "不是"',
        explanation: '"是" tương đương động từ "to be" trong tiếng Anh, dùng để nối chủ ngữ với định ngữ danh từ biểu thị danh tính, quốc tịch, nghề nghiệp. Thể phủ định là "不是" (bú shì).',
        explanationEn: '"是" links two nouns/pronouns indicating identity or nationality (A is B). The negative form is "不是" (bú shì).',
        structure: 'A + 是 + B / A + 不是 + B',
        examples: [
          { hanzi: '我是学生。', pinyin: 'Wǒ shì xuésheng.', vi: 'Tôi là học sinh.', en: 'I am a student.' },
          { hanzi: '我不是中国人。', pinyin: 'Wǒ bú shì Zhōngguó rén.', vi: 'Tôi không phải người Trung Quốc.', en: 'I am not Chinese.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q3-1',
        question: 'Chọn trật tự từ đúng để hỏi tên ai đó:',
        questionEn: 'Choose the correct word order to ask someone’s name:',
        options: ['你叫什么名字？', '你名字是什么叫？', '叫你什么名字？', '什么叫你名字？'],
        correctIndex: 0,
        explanation: 'Cấu trúc hỏi tên chuẩn: 你 (Chủ ngữ) + 叫 (Động từ) + 什么 (Đại từ) + 名字 (Danh từ)？'
      },
      {
        id: 'q3-2',
        question: 'Muốn chuyển câu "她是老师" (Cô ấy là giáo viên) thành câu hỏi "Cô ấy là giáo viên phải không?", ta làm cách nào?',
        questionEn: 'How do you turn "她是老师" into a yes/no question?',
        options: ['Thêm 什么 vào đầu câu', 'Thêm 吗 vào cuối câu', 'Đổi 是 lên đầu câu', 'Thêm 呢 vào giữa câu'],
        correctIndex: 1,
        explanation: 'Thêm trợ từ nghi vấn 吗 vào cuối câu trần thuật: 她是老师吗？'
      }
    ]
  },
  {
    id: 'hsk1-lesson-04',
    courseId: 'hsk1',
    lessonNumber: 4,
    stage: 1,
    stageTitleVi: 'Chặng 1: Nhập môn Ngữ âm & Chào hỏi cơ bản',
    stageTitleEn: 'Stage 1: Pinyin Phonetics & Basic Greetings',
    titleHanzi: '她是我的汉语老师',
    titlePinyin: 'Tā shì wǒ de Hànyǔ lǎoshī',
    titleVi: 'Cô ấy là giáo viên tiếng Trung của tôi',
    titleEn: 'She is my Chinese teacher',
    radicals: ['日 (Nhật - Mặt trời)', '目 (Mục - Mắt)'],
    writingChars: ['七', '儿', '几', '九', '了'],
    audioFile: '/audio/hsk1/04-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Cô ấy là ai?', file: '/audio/hsk1/04-1.mp3' },
      { name: 'Bài khóa 2: Bạn là người nước nào?', file: '/audio/hsk1/04-2.mp3' },
      { name: 'Bài khóa 3: Bạn học và bạn bè', file: '/audio/hsk1/04-3.mp3' }
    ],
    objectives: [
      'Biết cách hỏi và giới thiệu người khác (thầy cô, bạn bè, bạn học).',
      'Hỏi quốc tịch với đại từ 哪 (nǎ) và hỏi nhân vật với 谁 (shéi).',
      'Làm chủ trợ từ kết cấu sở hữu 的 (de) và câu hỏi tỉnh lược 呢 (ne).'
    ],
    objectivesEn: [
      'Learn how to inquire about and introduce others (teachers, friends, classmates).',
      'Ask nationality using 哪 (nǎ) and identify people using 谁 (shéi).',
      'Master the structural possessive particle 的 (de) and the elliptical question particle 呢 (ne).'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '她是谁？',
        pinyin: 'Tā shì shéi?',
        vi: 'Cô ấy là ai vậy?',
        en: 'Who is she?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '她是我的汉语老师，她叫李月。',
        pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī, tā jiào Lǐ Yuè.',
        vi: 'Cô ấy là giáo viên tiếng Trung của tôi, cô ấy tên là Lý Nguyệt.',
        en: 'She is my Chinese teacher, her name is Li Yue.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你是哪国人？',
        pinyin: 'Nǐ shì nǎ guó rén?',
        vi: 'Bạn là người nước nào?',
        en: 'Which country are you from?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我是中国人。你呢？',
        pinyin: 'Wǒ shì Zhōngguó rén. Nǐ ne?',
        vi: 'Tôi là người Trung Quốc. Còn bạn thì sao?',
        en: 'I am Chinese. What about you?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我是美国人。他是我同学。',
        pinyin: 'Wǒ shì Měiguó rén. Tā shì wǒ tóngxué.',
        vi: 'Tôi là người Mỹ. Cậu ấy là bạn học của tôi.',
        en: 'I am American. He is my classmate.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '她是你同学吗？',
        pinyin: 'Tā shì nǐ tóngxué ma?',
        vi: 'Cô ấy là bạn học của bạn à?',
        en: 'Is she your classmate?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '她不是我同学，她是我朋友。',
        pinyin: 'Tā bú shì wǒ tóngxué, tā shì wǒ péngyou.',
        vi: 'Cô ấy không phải bạn học của tôi, cô ấy là bạn của tôi.',
        en: 'She is not my classmate, she is my friend.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-023',
        hanzi: '她',
        pinyin: 'tā',
        hanviet: 'Tha',
        meaning: 'Cô ấy, bà ấy, chị ấy (ngôi thứ 3 nữ)',
        meaningEn: 'she, her',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 6,
        radical: '女',
        exampleHanzi: '她是老师。',
        examplePinyin: 'Tā shì lǎoshī.',
        exampleMeaning: 'Cô ấy là giáo viên.',
        exampleMeaningEn: 'She is a teacher.'
      },
      {
        id: 'hsk1-024',
        hanzi: '谁',
        pinyin: 'shéi',
        hanviet: 'Thùy',
        meaning: 'Ai (đại từ nghi vấn)',
        meaningEn: 'who, whom',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 10,
        radical: '讠',
        exampleHanzi: '他是谁？',
        examplePinyin: 'Tā shì shéi?',
        exampleMeaning: 'Anh ấy là ai?',
        exampleMeaningEn: 'Who is he?'
      },
      {
        id: 'hsk1-025',
        hanzi: '的',
        pinyin: 'de',
        hanviet: 'Đích',
        meaning: 'Của (trợ từ kết cấu sở hữu)',
        meaningEn: 'possessive or descriptive particle',
        level: 1,
        partOfSpeech: 'Trợ từ',
        strokes: 8,
        radical: '白',
        exampleHanzi: '我的书',
        examplePinyin: 'Wǒ de shū',
        exampleMeaning: 'Sách của tôi',
        exampleMeaningEn: 'My book'
      },
      {
        id: 'hsk1-026',
        hanzi: '汉语',
        pinyin: 'Hànyǔ',
        hanviet: 'Hán ngữ',
        meaning: 'Tiếng Hán, tiếng Trung',
        meaningEn: 'Chinese language',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 14,
        radical: '氵',
        exampleHanzi: '学汉语',
        examplePinyin: 'Xué Hànyǔ',
        exampleMeaning: 'Học tiếng Trung',
        exampleMeaningEn: 'Learn Chinese'
      },
      {
        id: 'hsk1-027',
        hanzi: '哪',
        pinyin: 'nǎ',
        hanviet: 'Nả',
        meaning: 'Nào, đâu (đại từ nghi vấn)',
        meaningEn: 'which',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 9,
        radical: '口',
        exampleHanzi: '哪国人？',
        examplePinyin: 'Nǎ guó rén?',
        exampleMeaning: 'Người nước nào?',
        exampleMeaningEn: 'Which nationality?'
      },
      {
        id: 'hsk1-028',
        hanzi: '国',
        pinyin: 'guó',
        hanviet: 'Quốc',
        meaning: 'Nước, quốc gia',
        meaningEn: 'country, nation',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '囗',
        exampleHanzi: '国家',
        examplePinyin: 'Guójiā',
        exampleMeaning: 'Quốc gia',
        exampleMeaningEn: 'Country'
      },
      {
        id: 'hsk1-029',
        hanzi: '呢',
        pinyin: 'ne',
        hanviet: 'Ni',
        meaning: 'Còn...thì sao? (trợ từ ngữ khí)',
        meaningEn: 'question particle for subjects already mentioned',
        level: 1,
        partOfSpeech: 'Trợ từ',
        strokes: 8,
        radical: '口',
        exampleHanzi: '你呢？',
        examplePinyin: 'Nǐ ne?',
        exampleMeaning: 'Còn bạn thì sao?',
        exampleMeaningEn: 'What about you?'
      },
      {
        id: 'hsk1-030',
        hanzi: '他',
        pinyin: 'tā',
        hanviet: 'Tha',
        meaning: 'Anh ấy, ông ấy (ngôi thứ 3 nam)',
        meaningEn: 'he, him',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 5,
        radical: '亻',
        exampleHanzi: '他是我的朋友。',
        examplePinyin: 'Tā shì wǒ de péngyou.',
        exampleMeaning: 'Anh ấy là bạn của tôi.',
        exampleMeaningEn: 'He is my friend.'
      },
      {
        id: 'hsk1-031',
        hanzi: '同学',
        pinyin: 'tóngxué',
        hanviet: 'Đồng học',
        meaning: 'Bạn cùng lớp, bạn học',
        meaningEn: 'classmate',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 14,
        radical: '口',
        exampleHanzi: '我们是同学。',
        examplePinyin: 'Wǒmen shì tóngxué.',
        exampleMeaning: 'Chúng tôi là bạn cùng lớp.',
        exampleMeaningEn: 'We are classmates.'
      },
      {
        id: 'hsk1-032',
        hanzi: '朋友',
        pinyin: 'péngyou',
        hanviet: 'Bằng hữu',
        meaning: 'Bạn bè',
        meaningEn: 'friend',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '月',
        exampleHanzi: '好朋友',
        examplePinyin: 'Hǎo péngyou',
        exampleMeaning: 'Bạn thân / bạn tốt',
        exampleMeaningEn: 'Good friend'
      }
    ],
    grammarPoints: [
      {
        title: 'Đại từ nghi vấn "谁" (shéi) và "哪" (nǎ)',
        titleEn: 'Interrogatives "谁" (shéi) and "哪" (nǎ)',
        explanation: '谁 dùng để hỏi người ("Ai"). 哪 dùng kết hợp với danh từ để hỏi lựa chọn ("Cái nào / Nước nào").',
        explanationEn: '"谁" asks about identity (who). "哪" is paired with a measure word/noun to ask which specific one (which country).',
        structure: '他是谁？ (Anh ấy là ai?) / 你是哪国人？ (Bạn là người nước nào?)',
        examples: [
          { hanzi: '她是谁？', pinyin: 'Tā shì shéi?', vi: 'Cô ấy là ai?', en: 'Who is she?' },
          { hanzi: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', vi: 'Bạn là người nước nào?', en: 'Which country are you from?' }
        ]
      },
      {
        title: 'Trợ từ kết cấu "的" (de) biểu thị quan hệ sở hữu',
        titleEn: 'Structural Particle "的" for Possession',
        explanation: 'Dùng cấu trúc: Định ngữ + 的 + Trung tâm ngữ. Khi mối quan hệ thân thuộc (gia đình, bạn bè thân thiết), chữ 的 có thể lược bỏ.',
        explanationEn: 'Structure: Modifier + 的 + Head Noun. When describing close familial or intimate relationships, 的 can be omitted (e.g. 我同学, 我妈妈).',
        structure: 'Chủ thể sở hữu + 的 + Vật sở hữu (Ví dụ: 我的书, 老师的电脑)',
        examples: [
          { hanzi: '她是我的汉语老师。', pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī.', vi: 'Cô ấy là giáo viên tiếng Trung của tôi.', en: 'She is my Chinese teacher.' },
          { hanzi: '我朋友', pinyin: 'Wǒ péngyou', vi: 'Bạn tôi (lược 的)', en: 'My friend' }
        ]
      },
      {
        title: 'Câu hỏi tỉnh lược với trợ từ ngữ khí "呢" (ne)',
        titleEn: 'Elliptical Questions with "呢" (ne)',
        explanation: 'Khi ngữ cảnh đã rõ ràng, ta có thể dùng "Danh từ / Đại từ + 呢？" để hỏi lại thông tin vừa đề cập mà không cần lặp lại cả câu hỏi.',
        explanationEn: 'When the context is clear, "Noun/Pronoun + 呢？" bounces the question back without repeating the full sentence ("How about ...?").',
        structure: 'A: 我是中国人。你呢？ B: 我是越南人。',
        examples: [
          { hanzi: '我是中国人。你呢？', pinyin: 'Wǒ shì Zhōngguó rén. Nǐ ne?', vi: 'Tôi là người Trung Quốc. Còn bạn?', en: 'I am Chinese. What about you?' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q4-1',
        question: 'Để hỏi người đối diện "Bạn là người nước nào?", câu nào sau đây là chính xác?',
        questionEn: 'Which sentence correctly asks "Which country are you from?"',
        options: ['你是哪国人？', '你是谁国人？', '你是什么国人？', '你国人是哪？'],
        correctIndex: 0,
        explanation: 'Cấu trúc chuẩn là: 你是哪国人？ (Chủ ngữ + 是 + 哪 + 国 + 人).'
      },
      {
        id: 'q4-2',
        question: 'Trong câu "她是我的汉语老师", từ "的" đóng vai trò gì?',
        questionEn: 'What is the role of "的" in "她是我的汉语老师"?',
        options: ['Hỏi nghi vấn', 'Nối sở hữu định ngữ', 'Chỉ thời gian', 'Phủ định hành động'],
        correctIndex: 1,
        explanation: 'Trợ từ kết cấu 的 biểu thị mối quan hệ sở hữu hoặc định ngữ phẩm chất.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-05',
    courseId: 'hsk1',
    lessonNumber: 5,
    stage: 2,
    stageTitleVi: 'Chặng 2: Làm quen, Tuổi tác & Gia đình',
    stageTitleEn: 'Stage 2: Family, Age & Daily Routine',
    titleHanzi: '她女儿今年二十岁',
    titlePinyin: 'Tā nǚ’ér jīnnián èrshí suì',
    titleVi: 'Con gái cô ấy năm nay 20 tuổi',
    titleEn: 'Her daughter is 20 years old this year',
    radicals: ['氵 (Ba chấm thủy - Nước)', '女 (Nữ - Phụ nữ)'],
    writingChars: ['水', '女', '了', '大'],
    audioFile: '/audio/hsk1/05-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Gia đình có mấy người', file: '/audio/hsk1/05-1.mp3' },
      { name: 'Bài khóa 2: Con gái mấy tuổi', file: '/audio/hsk1/05-2.mp3' },
      { name: 'Bài khóa 3: Thầy Lý bao nhiêu tuổi', file: '/audio/hsk1/05-3.mp3' }
    ],
    objectives: [
      'Biết hỏi và trả lời số thành viên trong gia đình bằng lượng từ 口 (kǒu).',
      'Phân biệt cách hỏi tuổi cho trẻ em (几岁) và người lớn (多大).',
      'Nắm vững số đếm từ 1 đến 100 và trợ từ ngữ khí biểu thị biến hóa 了 (le).'
    ],
    objectivesEn: [
      'Ask and tell family members using measure word 口 (kǒu).',
      'Distinguish age questions for children (几岁) vs adults (多大).',
      'Master numbers 1-100 and the modal particle 了 indicating change of state.'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '你家有几口人？',
        pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?',
        vi: 'Nhà bạn có mấy người?',
        en: 'How many people are there in your family?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我家有三口人。',
        pinyin: 'Wǒ jiā yǒu sān kǒu rén.',
        vi: 'Nhà tôi có 3 người.',
        en: 'There are three people in my family.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你女儿几岁了？',
        pinyin: 'Nǐ nǚ’ér jǐ suì le?',
        vi: 'Con gái bạn mấy tuổi rồi?',
        en: 'How old is your daughter?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '她今年四岁了。',
        pinyin: 'Tā jīnnián sì suì le.',
        vi: 'Cháu năm nay 4 tuổi rồi.',
        en: 'She is four years old this year.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '李老师多大了？',
        pinyin: 'Lǐ lǎoshī duō dà le?',
        vi: 'Cô Lý bao nhiêu tuổi rồi ạ?',
        en: 'How old is teacher Li?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '她今年五十岁了。她女儿今年二十岁。',
        pinyin: 'Tā jīnnián wǔshí suì le. Tā nǚ’ér jīnnián èrshí suì.',
        vi: 'Cô ấy năm nay 50 tuổi rồi. Con gái cô ấy năm nay 20 tuổi.',
        en: 'She is 50 years old this year. Her daughter is 20.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-033',
        hanzi: '家',
        pinyin: 'jiā',
        hanviet: 'Gia',
        meaning: 'Nhà, gia đình',
        meaningEn: 'family, home',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 10,
        radical: '宀',
        exampleHanzi: '我家在北京。',
        examplePinyin: 'Wǒ jiā zài Běijīng.',
        exampleMeaning: 'Nhà tôi ở Bắc Kinh.',
        exampleMeaningEn: 'My home is in Beijing.'
      },
      {
        id: 'hsk1-034',
        hanzi: '有',
        pinyin: 'yǒu',
        hanviet: 'Hữu',
        meaning: 'Có, tồn tại',
        meaningEn: 'to have, there is/are',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 6,
        radical: '月',
        exampleHanzi: '我有汉语书。',
        examplePinyin: 'Wǒ yǒu Hànyǔ shū.',
        exampleMeaning: 'Tôi có sách tiếng Trung.',
        exampleMeaningEn: 'I have Chinese books.'
      },
      {
        id: 'hsk1-035',
        hanzi: '口',
        pinyin: 'kǒu',
        hanviet: 'Khẩu',
        meaning: 'Miệng / Lượng từ chỉ người trong gia đình',
        meaningEn: 'measure word for family members',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 3,
        radical: '口',
        exampleHanzi: '三口人',
        examplePinyin: 'Sān kǒu rén',
        exampleMeaning: '3 người trong nhà',
        exampleMeaningEn: 'Three family members'
      },
      {
        id: 'hsk1-036',
        hanzi: '女儿',
        pinyin: 'nǚ’ér',
        hanviet: 'Nữ nhi',
        meaning: 'Con gái',
        meaningEn: 'daughter',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 5,
        radical: '女',
        exampleHanzi: '她女儿很漂亮。',
        examplePinyin: 'Tā nǚ’ér hěn piàoliang.',
        exampleMeaning: 'Con gái cô ấy rất xinh đẹp.',
        exampleMeaningEn: 'Her daughter is very pretty.'
      },
      {
        id: 'hsk1-037',
        hanzi: '几',
        pinyin: 'jǐ',
        hanviet: 'Kỷ',
        meaning: 'Mấy, vài (hỏi số lượng dưới 10)',
        meaningEn: 'how many (usually < 10)',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 2,
        radical: '几',
        exampleHanzi: '几个人？',
        examplePinyin: 'Jǐ gè rén?',
        exampleMeaning: 'Mấy người?',
        exampleMeaningEn: 'How many people?'
      },
      {
        id: 'hsk1-038',
        hanzi: '岁',
        pinyin: 'suì',
        hanviet: 'Tuế',
        meaning: 'Tuổi',
        meaningEn: 'years old (age)',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 6,
        radical: '山',
        exampleHanzi: '二十岁',
        examplePinyin: 'Èrshí suì',
        exampleMeaning: '20 tuổi',
        exampleMeaningEn: '20 years old'
      },
      {
        id: 'hsk1-039',
        hanzi: '了',
        pinyin: 'le',
        hanviet: 'Liễu',
        meaning: 'Rồi (trợ từ ngữ khí chỉ sự thay đổi, đạt đến mức độ)',
        meaningEn: 'modal particle indicating change',
        level: 1,
        partOfSpeech: 'Trợ từ',
        strokes: 2,
        radical: '乙',
        exampleHanzi: '我二十岁了。',
        examplePinyin: 'Wǒ èrshí suì le.',
        exampleMeaning: 'Tôi 20 tuổi rồi.',
        exampleMeaningEn: 'I am 20 now.'
      },
      {
        id: 'hsk1-040',
        hanzi: '今年',
        pinyin: 'jīnnián',
        hanviet: 'Kim niên',
        meaning: 'Năm nay',
        meaningEn: 'this year',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 10,
        radical: '人',
        exampleHanzi: '今年是2026年。',
        examplePinyin: 'Jīnnián shì èr líng èr liù nián.',
        exampleMeaning: 'Năm nay là năm 2026.',
        exampleMeaningEn: 'This year is 2026.'
      },
      {
        id: 'hsk1-041',
        hanzi: '多',
        pinyin: 'duō',
        hanviet: 'Đa',
        meaning: 'Nhiều / Bao nhiêu (dùng trong câu hỏi mức độ)',
        meaningEn: 'many, much / how (in questions)',
        level: 1,
        partOfSpeech: 'Phó từ / Tính từ',
        strokes: 6,
        radical: '夕',
        exampleHanzi: '多大？',
        examplePinyin: 'Duō dà?',
        exampleMeaning: 'Bao nhiêu tuổi / lớn cỡ nào?',
        exampleMeaningEn: 'How old?'
      },
      {
        id: 'hsk1-042',
        hanzi: '大',
        pinyin: 'dà',
        hanviet: 'Đại',
        meaning: 'Lớn, to, nhiều tuổi',
        meaningEn: 'big, large, old in age',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 3,
        radical: '大',
        exampleHanzi: '多大了？',
        examplePinyin: 'Duō dà le?',
        exampleMeaning: 'Bao nhiêu tuổi rồi?',
        exampleMeaningEn: 'How old?'
      }
    ],
    grammarPoints: [
      {
        title: 'Hỏi số lượng dưới 10 bằng "几" (jǐ)',
        titleEn: 'Asking Numbers under 10 with "几" (jǐ)',
        explanation: 'Đại từ "几" dùng để hỏi số lượng thường nhỏ hơn 10. Luôn đi kèm lượng từ phía sau: 几 + Lượng từ + Danh từ.',
        explanationEn: '"几" is used to ask about small quantities (usually < 10). It must precede a measure word: 几 + Measure Word + Noun.',
        structure: '你家有几口人？ / 你有几个苹果？',
        examples: [
          { hanzi: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', vi: 'Nhà bạn có mấy người?', en: 'How many people in your family?' },
          { hanzi: '你女儿几岁了？', pinyin: 'Nǐ nǚ’ér jǐ suì le?', vi: 'Con gái bạn mấy tuổi rồi?', en: 'How old is your daughter?' }
        ]
      },
      {
        title: 'Hỏi tuổi tác: "几岁" vs "多大"',
        titleEn: 'Asking Age: "几岁" vs "多大"',
        explanation: 'Hỏi trẻ em dưới 10 tuổi: dùng "几岁了？". Hỏi người cùng trang lứa hoặc người lớn: dùng "多大了？".',
        explanationEn: 'For young children (<10): use "几岁了？". For peers or older people: use "多大了？".',
        structure: 'Trẻ em: Chủ ngữ + 几岁了？ / Người lớn: Chủ ngữ + 多大了？',
        examples: [
          { hanzi: '你女儿几岁了？', pinyin: 'Nǐ nǚ’ér jǐ suì le?', vi: 'Con gái bạn mấy tuổi rồi?', en: 'How old is your daughter?' },
          { hanzi: '李老师今年多大了？', pinyin: 'Lǐ lǎoshī jīnnián duō dà le?', vi: 'Cô Lý năm nay bao nhiêu tuổi rồi?', en: 'How old is teacher Li this year?' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q5-1',
        question: 'Khi hỏi tuổi một đồng nghiệp hoặc người lớn, cách hỏi nào là tự nhiên và đúng mực nhất?',
        questionEn: 'How do you ask an adult’s age naturally?',
        options: ['你几岁了？', '你今年多大了？', '你是几岁？', '你今年多少？'],
        correctIndex: 1,
        explanation: 'Người lớn hỏi tuổi dùng: 你多大了？ hoặc 你今年多大了？ (几岁 chỉ dùng cho trẻ em < 10 tuổi).'
      },
      {
        id: 'q5-2',
        question: 'Lượng từ nào chuyên dùng khi đếm thành viên trong gia đình?',
        questionEn: 'Which measure word is specifically used for family members?',
        options: ['个 (gè)', '口 (kǒu)', '本 (běn)', '岁 (suì)'],
        correctIndex: 1,
        explanation: 'Lượng từ "口" (kǒu) dùng cho thành viên trong gia đình: 三口人, 四口人.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-06',
    courseId: 'hsk1',
    lessonNumber: 6,
    stage: 2,
    stageTitleVi: 'Chặng 2: Làm quen, Tuổi tác & Gia đình',
    stageTitleEn: 'Stage 2: Family, Age & Daily Routine',
    titleHanzi: '我会说汉语',
    titlePinyin: 'Wǒ huì shuō Hànyǔ',
    titleVi: 'Tôi biết nói tiếng Trung',
    titleEn: 'I can speak Chinese',
    radicals: ['饣 (Bộ Thực - Thức ăn)', '冫 (Bộ Băng - Băng giá)'],
    writingChars: ['八', '十', '会', '说', '字'],
    audioFile: '/audio/hsk1/06-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Bạn biết nói tiếng Trung không?', file: '/audio/hsk1/06-1.mp3' },
      { name: 'Bài khóa 2: Món ăn Trung Quốc', file: '/audio/hsk1/06-2.mp3' },
      { name: 'Bài khóa 3: Viết chữ Hán', file: '/audio/hsk1/06-3.mp3' }
    ],
    objectives: [
      'Biết diễn đạt năng lực và kỹ năng có được qua học tập bằng động từ năng nguyện 会 (huì).',
      'Miêu tả đánh giá tính chất sự vật bằng câu vị ngữ tính từ (Chủ ngữ + 很 + Tính từ).',
      'Hỏi cách thực hiện một hành động bằng đại từ nghi vấn 怎么 (zěnme + Động từ).'
    ],
    objectivesEn: [
      'Express learned skills and abilities using modal verb 会 (huì).',
      'Describe qualities using adjective predicate sentences (Subject + 很 + Adjective).',
      'Ask how to do something using 怎么 (zěnme + Verb).'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '你会说汉语吗？',
        pinyin: 'Nǐ huì shuō Hànyǔ ma?',
        vi: 'Bạn biết nói tiếng Trung không?',
        en: 'Can you speak Chinese?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我会说汉语。',
        pinyin: 'Wǒ huì shuō Hànyǔ.',
        vi: 'Tôi biết nói tiếng Trung.',
        en: 'I can speak Chinese.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你妈妈会说汉语吗？',
        pinyin: 'Nǐ māma huì shuō Hànyǔ ma?',
        vi: 'Mẹ bạn biết nói tiếng Trung không?',
        en: 'Can your mother speak Chinese?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '她不会说。',
        pinyin: 'Tā bú huì shuō.',
        vi: 'Bà ấy không biết nói.',
        en: 'She cannot speak it.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '中国菜好吃吗？你会做中国菜吗？',
        pinyin: 'Zhōngguó cài hǎochī ma? Nǐ huì zuò Zhōngguó cài ma?',
        vi: 'Món Trung Quốc ngon không? Bạn biết nấu món Trung Quốc không?',
        en: 'Is Chinese food delicious? Can you cook Chinese food?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '中国菜很好吃。我不会做。你会写汉字吗？',
        pinyin: 'Zhōngguó cài hěn hǎochī. Wǒ bú huì zuò. Nǐ huì xiě hànzì ma?',
        vi: 'Món Trung Quốc rất ngon. Tôi không biết nấu. Bạn biết viết chữ Hán không?',
        en: 'Chinese food is delicious. I cannot cook. Can you write Chinese characters?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我会写。这个字怎么写？对不起，这个字我会读，不会写。',
        pinyin: 'Wǒ huì xiě. Zhège zì zěnme xiě? Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.',
        vi: 'Tôi biết viết. Chữ này viết như thế nào? Xin lỗi, chữ này tôi biết đọc nhưng không biết viết.',
        en: 'I can write. How do you write this character? Sorry, I can read it but cannot write it.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-043',
        hanzi: '会',
        pinyin: 'huì',
        hanviet: 'Hội',
        meaning: 'Biết, có thể (kỹ năng qua học tập rèn luyện)',
        meaningEn: 'can, to be able to (learned skill)',
        level: 1,
        partOfSpeech: 'Động từ năng nguyện',
        strokes: 6,
        radical: '人',
        exampleHanzi: '我会说汉语。',
        examplePinyin: 'Wǒ huì shuō Hànyǔ.',
        exampleMeaning: 'Tôi biết nói tiếng Trung.',
        exampleMeaningEn: 'I can speak Chinese.'
      },
      {
        id: 'hsk1-044',
        hanzi: '说',
        pinyin: 'shuō',
        hanviet: 'Thuyết',
        meaning: 'Nói',
        meaningEn: 'to speak, to say',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 9,
        radical: '讠',
        exampleHanzi: '说话',
        examplePinyin: 'Shuōhuà',
        exampleMeaning: 'Nói chuyện',
        exampleMeaningEn: 'To talk'
      },
      {
        id: 'hsk1-045',
        hanzi: '妈妈',
        pinyin: 'māma',
        hanviet: 'Ma ma',
        meaning: 'Mẹ',
        meaningEn: 'mother, mom',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '女',
        exampleHanzi: '我妈妈很爱我。',
        examplePinyin: 'Wǒ māma hěn ài wǒ.',
        exampleMeaning: 'Mẹ tôi rất yêu tôi.',
        exampleMeaningEn: 'My mom loves me very much.'
      },
      {
        id: 'hsk1-046',
        hanzi: '菜',
        pinyin: 'cài',
        hanviet: 'Thái',
        meaning: 'Món ăn, rau',
        meaningEn: 'dish, cuisine, vegetable',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '艹',
        exampleHanzi: '中国菜',
        examplePinyin: 'Zhōngguó cài',
        exampleMeaning: 'Món ăn Trung Quốc',
        exampleMeaningEn: 'Chinese food'
      },
      {
        id: 'hsk1-047',
        hanzi: '很',
        pinyin: 'hěn',
        hanviet: 'Hẩn',
        meaning: 'Rất (phó từ chỉ mức độ)',
        meaningEn: 'very, quite',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 9,
        radical: '彳',
        exampleHanzi: '很好吃',
        examplePinyin: 'Hěn hǎochī',
        exampleMeaning: 'Rất ngon',
        exampleMeaningEn: 'Very delicious'
      },
      {
        id: 'hsk1-048',
        hanzi: '好吃',
        pinyin: 'hǎochī',
        hanviet: 'Hảo ngật',
        meaning: 'Ngon (ăn ngon)',
        meaningEn: 'delicious, tasty',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 12,
        radical: '女',
        exampleHanzi: '这个菜很好吃。',
        examplePinyin: 'Zhège cài hěn hǎochī.',
        exampleMeaning: 'Món này rất ngon.',
        exampleMeaningEn: 'This dish is delicious.'
      },
      {
        id: 'hsk1-049',
        hanzi: '做',
        pinyin: 'zuò',
        hanviet: 'Tác',
        meaning: 'Làm, nấu, chế tác',
        meaningEn: 'to make, to do, to cook',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 11,
        radical: '亻',
        exampleHanzi: '做菜',
        examplePinyin: 'Zuò cài',
        exampleMeaning: 'Nấu ăn',
        exampleMeaningEn: 'To cook'
      },
      {
        id: 'hsk1-050',
        hanzi: '写',
        pinyin: 'xiě',
        hanviet: 'Tả',
        meaning: 'Viết',
        meaningEn: 'to write',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 5,
        radical: '冖',
        exampleHanzi: '写汉字',
        examplePinyin: 'Xiě hànzì',
        exampleMeaning: 'Viết chữ Hán',
        exampleMeaningEn: 'Write Chinese characters'
      },
      {
        id: 'hsk1-051',
        hanzi: '汉字',
        pinyin: 'hànzì',
        hanviet: 'Hán tự',
        meaning: 'Chữ Hán',
        meaningEn: 'Chinese character',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '氵',
        exampleHanzi: '学写汉字',
        examplePinyin: 'Xué xiě hànzì',
        exampleMeaning: 'Học viết chữ Hán',
        exampleMeaningEn: 'Learn writing characters'
      },
      {
        id: 'hsk1-052',
        hanzi: '字',
        pinyin: 'zì',
        hanviet: 'Tự',
        meaning: 'Chữ',
        meaningEn: 'character, word',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 6,
        radical: '子',
        exampleHanzi: '这个字',
        examplePinyin: 'Zhège zì',
        exampleMeaning: 'Chữ này',
        exampleMeaningEn: 'This character'
      },
      {
        id: 'hsk1-053',
        hanzi: '怎么',
        pinyin: 'zěnme',
        hanviet: 'Chẩm ma',
        meaning: 'Như thế nào, làm sao (hỏi phương thức)',
        meaningEn: 'how',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 9,
        radical: '心',
        exampleHanzi: '这个字怎么读？',
        examplePinyin: 'Zhège zì zěnme dú?',
        exampleMeaning: 'Chữ này đọc như thế nào?',
        exampleMeaningEn: 'How to read this character?'
      },
      {
        id: 'hsk1-054',
        hanzi: '读',
        pinyin: 'dú',
        hanviet: 'Độc',
        meaning: 'Đọc',
        meaningEn: 'to read',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 10,
        radical: '讠',
        exampleHanzi: '请读生词。',
        examplePinyin: 'Qǐng dú shēngcí.',
        exampleMeaning: 'Xin mời đọc từ mới.',
        exampleMeaningEn: 'Please read the new words.'
      }
    ],
    grammarPoints: [
      {
        title: 'Động từ năng nguyện "会" (huì)',
        titleEn: 'Modal Verb "会" (huì) for Acquired Skills',
        explanation: '"会" biểu thị năng lực có được thông qua việc học tập, rèn luyện (biết nói, biết viết, biết nấu...). Thể phủ định dùng "不会" (bú huì).',
        explanationEn: '"会" indicates an acquired ability through study or training. The negation is "不会" (bú huì).',
        structure: 'Chủ ngữ + 会 / 不会 + Động từ + (Tân ngữ)',
        examples: [
          { hanzi: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', vi: 'Tôi biết nói tiếng Trung.', en: 'I can speak Chinese.' },
          { hanzi: '我妈妈不会做中国菜。', pinyin: 'Wǒ māma bú huì zuò Zhōngguó cài.', vi: 'Mẹ tôi không biết nấu món Trung Quốc.', en: 'My mother cannot cook Chinese food.' }
        ]
      },
      {
        title: 'Đại từ nghi vấn "怎么" (zěnme) hỏi phương thức',
        titleEn: 'Interrogative "怎么" (zěnme) for Manner',
        explanation: 'Dùng "怎么 + Động từ" để hỏi cách thức tiến hành một hành vi: làm như thế nào, viết thế nào, đọc thế nào.',
        explanationEn: 'Use "怎么 + Verb" to inquire about the manner or method of performing an action (how to write, how to say, how to read).',
        structure: '怎么 + Động từ? (Ví dụ: 怎么写？, 怎么读？)',
        examples: [
          { hanzi: '这个字怎么写？', pinyin: 'Zhège zì zěnme xiě?', vi: 'Chữ này viết thế nào?', en: 'How do you write this character?' },
          { hanzi: '这个字怎么读？', pinyin: 'Zhège zì zěnme dú?', vi: 'Chữ này đọc thế nào?', en: 'How do you read this character?' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q6-1',
        question: 'Để hỏi "Chữ này đọc như thế nào?", câu nào đúng?',
        questionEn: 'Which sentence means "How is this character read?"',
        options: ['这个字什么读？', '这个字怎么读？', '这个字哪儿读？', '这个字谁读？'],
        correctIndex: 1,
        explanation: 'Hỏi phương thức làm một việc dùng: 怎么 + Động từ (这个字怎么读？).'
      },
      {
        id: 'q6-2',
        question: 'Dạng phủ định của câu "我会做中国菜" là gì?',
        questionEn: 'What is the negative form of "我会做中国菜"?',
        options: ['我没会做中国菜', '我不会做中国菜', '我不是做中国菜', '我没做中国菜'],
        correctIndex: 1,
        explanation: 'Phủ định của động từ năng nguyện 会 là 不会 (bú huì).'
      }
    ]
  },
  {
    id: 'hsk1-lesson-07',
    courseId: 'hsk1',
    lessonNumber: 7,
    stage: 2,
    stageTitleVi: 'Chặng 2: Làm quen, Tuổi tác & Gia đình',
    stageTitleEn: 'Stage 2: Family, Age & Daily Routine',
    titleHanzi: '今天几号',
    titlePinyin: 'Jīntiān jǐ hào',
    titleVi: 'Hôm nay ngày mấy',
    titleEn: 'What date is today',
    radicals: ['讠 (Ngôn - Lời nói)', '饣 (Thực - Ăn uống)'],
    writingChars: ['四', '五', '书', '本'],
    audioFile: '/audio/hsk1/07-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Hỏi ngày tháng hôm nay', file: '/audio/hsk1/07-1.mp3' },
      { name: 'Bài khóa 2: Hôm qua và ngày mai', file: '/audio/hsk1/07-2.mp3' },
      { name: 'Bài khóa 3: Đi đâu làm gì (Câu liên động)', file: '/audio/hsk1/07-3.mp3' }
    ],
    objectives: [
      'Nắm vững quy tắc nói Ngày, Tháng, Năm và Thứ trong tuần theo tư duy tiếng Trung (từ lớn đến nhỏ).',
      'Sử dụng câu liên động chỉ mục đích: 去 + Nơi chốn + Làm gì.',
      'Sử dụng từ ngữ thời gian: 昨天 (hôm qua), 今天 (hôm nay), 明天 (ngày mai).'
    ],
    objectivesEn: [
      'Master the date order in Chinese (Year -> Month -> Day -> Day of week).',
      'Use serial verb construction for purpose: 去 + Place + Action.',
      'Use time words: 昨天 (yesterday), 今天 (today), 明天 (tomorrow).'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '请问，今天几号？',
        pinyin: 'Qǐngwèn, jīntiān jǐ hào?',
        vi: 'Xin hỏi, hôm nay ngày mấy?',
        en: 'Excuse me, what date is today?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '今天9月1号。',
        pinyin: 'Jīntiān jiǔ yuè yī hào.',
        vi: 'Hôm nay là ngày 1 tháng 9.',
        en: 'Today is September 1st.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '今天星期几？',
        pinyin: 'Jīntiān xīngqī jǐ?',
        vi: 'Hôm nay là thứ mấy?',
        en: 'What day is it today?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '星期三。昨天是8月31号，星期二。明天是9月2号，星期四。',
        pinyin: 'Xīngqīsān. Zuótiān shì bā yuè sānshíyī hào, xīngqī’èr. Míngtiān shì jiǔ yuè èr hào, xīngqīsì.',
        vi: 'Thứ Tư. Hôm qua là ngày 31 tháng 8, thứ Ba. Ngày mai là ngày 2 tháng 9, thứ Năm.',
        en: 'Wednesday. Yesterday was Aug 31st, Tuesday. Tomorrow is Sept 2nd, Thursday.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '明天星期六，你去学校吗？',
        pinyin: 'Míngtiān xīngqīliù, nǐ qù xuéxiào ma?',
        vi: 'Ngày mai thứ Bảy, bạn có đi đến trường không?',
        en: 'Tomorrow is Saturday, are you going to school?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我去学校。我去学校看书。',
        pinyin: 'Wǒ qù xuéxiào. Wǒ qù xuéxiào kàn shū.',
        vi: 'Tôi đi đến trường. Tôi đi đến trường đọc sách.',
        en: 'I am going to school. I go to school to read books.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-055',
        hanzi: '请问',
        pinyin: 'qǐngwèn',
        hanviet: 'Thỉnh vấn',
        meaning: 'Xin hỏi (lịch sự khi mở đầu câu hỏi)',
        meaningEn: 'excuse me, may I ask',
        level: 1,
        partOfSpeech: 'Cụm từ',
        strokes: 16,
        radical: '讠',
        exampleHanzi: '请问，你叫什么？',
        examplePinyin: 'Qǐngwèn, nǐ jiào shénme?',
        exampleMeaning: 'Xin hỏi, bạn tên là gì?',
        exampleMeaningEn: 'May I ask your name?'
      },
      {
        id: 'hsk1-056',
        hanzi: '今天',
        pinyin: 'jīntiān',
        hanviet: 'Kim thiên',
        meaning: 'Hôm nay',
        meaningEn: 'today',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '人',
        exampleHanzi: '今天星期天。',
        examplePinyin: 'Jīntiān xīngqītiān.',
        exampleMeaning: 'Hôm nay là Chủ nhật.',
        exampleMeaningEn: 'Today is Sunday.'
      },
      {
        id: 'hsk1-057',
        hanzi: '号',
        pinyin: 'hào',
        hanviet: 'Hiệu',
        meaning: 'Ngày (trong văn nói), số',
        meaningEn: 'date of month, number',
        level: 1,
        partOfSpeech: 'Lượng từ / Danh từ',
        strokes: 5,
        radical: '口',
        exampleHanzi: '5号',
        examplePinyin: 'Wǔ hào',
        exampleMeaning: 'Ngày mùng 5',
        exampleMeaningEn: '5th of the month'
      },
      {
        id: 'hsk1-058',
        hanzi: '月',
        pinyin: 'yuè',
        hanviet: 'Nguyệt',
        meaning: 'Tháng, mặt trăng',
        meaningEn: 'month, moon',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 4,
        radical: '月',
        exampleHanzi: '九月',
        examplePinyin: 'Jiǔ yuè',
        exampleMeaning: 'Tháng 9',
        exampleMeaningEn: 'September'
      },
      {
        id: 'hsk1-059',
        hanzi: '星期',
        pinyin: 'xīngqī',
        hanviet: 'Tinh kỳ',
        meaning: 'Thứ, tuần lễ',
        meaningEn: 'week, day of the week',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 21,
        radical: '日',
        exampleHanzi: '星期一',
        examplePinyin: 'Xīngqīyī',
        exampleMeaning: 'Thứ Hai',
        exampleMeaningEn: 'Monday'
      },
      {
        id: 'hsk1-060',
        hanzi: '昨天',
        pinyin: 'zuótiān',
        hanviet: 'Tạc thiên',
        meaning: 'Hôm qua',
        meaningEn: 'yesterday',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 13,
        radical: '日',
        exampleHanzi: '昨天我很忙。',
        examplePinyin: 'Zuótiān wǒ hěn máng.',
        exampleMeaning: 'Hôm qua tôi rất bận.',
        exampleMeaningEn: 'Yesterday I was very busy.'
      },
      {
        id: 'hsk1-061',
        hanzi: '明天',
        pinyin: 'míngtiān',
        hanviet: 'Minh thiên',
        meaning: 'Ngày mai',
        meaningEn: 'tomorrow',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '日',
        exampleHanzi: '明天见！',
        examplePinyin: 'Míngtiān jiàn!',
        exampleMeaning: 'Ngày mai gặp lại!',
        exampleMeaningEn: 'See you tomorrow!'
      },
      {
        id: 'hsk1-062',
        hanzi: '去',
        pinyin: 'qù',
        hanviet: 'Khứ',
        meaning: 'Đi (rời xa vị trí hiện tại)',
        meaningEn: 'to go',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 5,
        radical: '厶',
        exampleHanzi: '你去哪儿？',
        examplePinyin: 'Nǐ qù nǎr?',
        exampleMeaning: 'Bạn đi đâu đấy?',
        exampleMeaningEn: 'Where are you going?'
      },
      {
        id: 'hsk1-063',
        hanzi: '学校',
        pinyin: 'xuéxiào',
        hanviet: 'Học hiệu',
        meaning: 'Trường học',
        meaningEn: 'school',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 18,
        radical: '木',
        exampleHanzi: '在学校',
        examplePinyin: 'Zài xuéxiào',
        exampleMeaning: 'Ở trường học',
        exampleMeaningEn: 'At school'
      },
      {
        id: 'hsk1-064',
        hanzi: '看',
        pinyin: 'kàn',
        hanviet: 'Khán',
        meaning: 'Nhìn, xem, ngắm, đọc',
        meaningEn: 'to look, to see, to watch, to read',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 9,
        radical: '目',
        exampleHanzi: '看书',
        examplePinyin: 'Kàn shū',
        exampleMeaning: 'Đọc sách',
        exampleMeaningEn: 'Read a book'
      },
      {
        id: 'hsk1-065',
        hanzi: '书',
        pinyin: 'shū',
        hanviet: 'Thư',
        meaning: 'Sách',
        meaningEn: 'book',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 4,
        radical: '乙',
        exampleHanzi: '汉语书',
        examplePinyin: 'Hànyǔ shū',
        exampleMeaning: 'Sách tiếng Trung',
        exampleMeaningEn: 'Chinese book'
      }
    ],
    grammarPoints: [
      {
        title: 'Quy tắc diễn đạt Thời gian (Năm -> Tháng -> Ngày -> Thứ)',
        titleEn: 'Expression of Dates in Chinese',
        explanation: 'Khác với tiếng Việt (ngày trước tháng sau), tiếng Trung luôn đi từ đơn vị lớn nhất đến đơn vị nhỏ nhất: Năm (年) -> Tháng (月) -> Ngày (号/日) -> Thứ (星期...).',
        explanationEn: 'Chinese states dates strictly from largest unit to smallest: Year (年) -> Month (月) -> Day (号/日) -> Day of the week (星期).',
        structure: '...年 + ...月 + ...号 + 星期...',
        examples: [
          { hanzi: '2026年9月15号星期二', pinyin: 'Èr líng èr liù nián jiǔ yuè shíwǔ hào xīngqī’èr', vi: 'Thứ Ba, ngày 15 tháng 9 năm 2026', en: 'Tuesday, September 15, 2026' }
        ]
      },
      {
        title: 'Câu liên động chỉ mục đích: 去 + Nơi chốn + Hành động',
        titleEn: 'Serial Verb Construction: 去 + Place + Purpose',
        explanation: 'Cấu trúc diễn đạt một người đi đến địa điểm nào đó để thực hiện một hành vi, mục đích cụ thể.',
        explanationEn: 'Used to express going to a place in order to do something.',
        structure: 'Chủ ngữ + 去 + Địa điểm + Động từ (Ví dụ: 我去学校看书)',
        examples: [
          { hanzi: '我去学校看书。', pinyin: 'Wǒ qù xuéxiào kàn shū.', vi: 'Tôi đến trường để đọc sách.', en: 'I go to school to read.' },
          { hanzi: '他去中国学汉语。', pinyin: 'Tā qù Zhōngguó xué Hànyǔ.', vi: 'Anh ấy đi Trung Quốc học tiếng Hán.', en: 'He goes to China to study Chinese.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q7-1',
        question: 'Trong tiếng Trung, ngày "1 tháng 9" được nói theo thứ tự nào?',
        questionEn: 'How is "September 1st" expressed in Chinese?',
        options: ['1号9月', '9月1号', '1号月9', '9号1月'],
        correctIndex: 1,
        explanation: 'Quy tắc từ lớn đến nhỏ: Tháng trước, Ngày sau -> 9月1号.'
      },
      {
        id: 'q7-2',
        question: 'Chọn câu diễn đạt đúng ngữ pháp: "Tôi đến trường học tiếng Trung":',
        questionEn: 'Choose the correct grammatical order for "I go to school to study Chinese":',
        options: ['我学汉语去学校。', '我去学校学汉语。', '我去学汉语学校。', '学校我去学汉语。'],
        correctIndex: 1,
        explanation: 'Câu liên động: Chủ ngữ + 去 + Địa điểm + Hành động -> 我去学校学汉语.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-08',
    courseId: 'hsk1',
    lessonNumber: 8,
    stage: 3,
    stageTitleVi: 'Chặng 3: Mua sắm, Địa điểm & Không gian sống',
    stageTitleEn: 'Stage 3: Locations, Directions & Shopping',
    titleHanzi: '我想喝茶',
    titlePinyin: 'Wǒ xiǎng hē chá',
    titleVi: 'Tôi muốn uống trà',
    titleEn: 'I want to drink tea',
    radicals: ['宀 (Bộ Miên - Mái nhà)', '广 (Bộ Quảng - Mái hiên rộng)'],
    writingChars: ['个', '十', '木', '天'],
    audioFile: '/audio/hsk1/08-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Muốn ăn gì, uống gì?', file: '/audio/hsk1/08-1.mp3' },
      { name: 'Bài khóa 2: Chiều nay đi cửa hàng', file: '/audio/hsk1/08-2.mp3' },
      { name: 'Bài khóa 3: Hỏi giá tiền cái cốc', file: '/audio/hsk1/08-3.mp3' }
    ],
    objectives: [
      'Diễn đạt nguyện vọng, mong muốn bằng động từ năng nguyện 想 (xiǎng).',
      'Hỏi giá tiền và số lượng lớn (>10) bằng đại từ 多少 (duōshao) và đơn vị tiền tệ 块 (kuài).',
      'Làm chủ lượng từ đa năng 个 (gè) và phân biệt 這 (này) - 那 (kia).'
    ],
    objectivesEn: [
      'Express wishes and desires using modal verb 想 (xiǎng).',
      'Ask prices and large quantities (>10) using 多少 (duōshao) and currency unit 块 (kuài).',
      'Master the generic measure word 个 (gè) and pronouns 这 (this) vs 那 (that).'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你想喝什么？',
        pinyin: 'Nǐ xiǎng hē shénme?',
        vi: 'Bạn muốn uống gì?',
        en: 'What would you like to drink?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我想喝茶。你想吃什么？',
        pinyin: 'Wǒ xiǎng hē chá. Nǐ xiǎng chī shénme?',
        vi: 'Tôi muốn uống trà. Bạn muốn ăn gì?',
        en: 'I want to drink tea. What would you like to eat?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我想吃米饭。下午你想做什么？',
        pinyin: 'Wǒ xiǎng chī mǐfàn. Xiàwǔ nǐ xiǎng zuò shénme?',
        vi: 'Tôi muốn ăn cơm. Buổi chiều bạn muốn làm gì?',
        en: 'I want to eat rice. What do you want to do this afternoon?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '下午我想去商店。我想买一个杯子。',
        pinyin: 'Xiàwǔ wǒ xiǎng qù shāngdiàn. Wǒ xiǎng mǎi yí gè bēizi.',
        vi: 'Buổi chiều tôi muốn đi cửa hàng. Tôi muốn mua một cái cốc.',
        en: 'This afternoon I want to go to the store. I want to buy a cup.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你好！这个杯子多少钱？',
        pinyin: 'Nǐ hǎo! Zhège bēizi duōshao qián?',
        vi: 'Chào anh! Cái cốc này bao nhiêu tiền?',
        en: 'Hello! How much is this cup?'
      },
      {
        speaker: '店员 (Nhân viên)',
        hanzi: '28块。那个杯子18块钱。',
        pinyin: 'Èrshíbā kuài. Nàge bēizi shíbā kuài qián.',
        vi: '28 tệ. Cái cốc kia 18 tệ.',
        en: '28 yuan. That cup is 18 yuan.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-066',
        hanzi: '想',
        pinyin: 'xiǎng',
        hanviet: 'Tưởng',
        meaning: 'Muốn, nghĩ, nhớ',
        meaningEn: 'to want, to think, to miss',
        level: 1,
        partOfSpeech: 'Động từ năng nguyện',
        strokes: 13,
        radical: '心',
        exampleHanzi: '我想喝水。',
        examplePinyin: 'Wǒ xiǎng hē shuǐ.',
        exampleMeaning: 'Tôi muốn uống nước.',
        exampleMeaningEn: 'I want to drink water.'
      },
      {
        id: 'hsk1-067',
        hanzi: '喝',
        pinyin: 'hē',
        hanviet: 'Hát',
        meaning: 'Uống',
        meaningEn: 'to drink',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 12,
        radical: '口',
        exampleHanzi: '喝茶',
        examplePinyin: 'Hē chá',
        exampleMeaning: 'Uống trà',
        exampleMeaningEn: 'Drink tea'
      },
      {
        id: 'hsk1-068',
        hanzi: '茶',
        pinyin: 'chá',
        hanviet: 'Trà',
        meaning: 'Trà, chè',
        meaningEn: 'tea',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 9,
        radical: '艹',
        exampleHanzi: '绿茶',
        examplePinyin: 'Lǜchá',
        exampleMeaning: 'Trà xanh',
        exampleMeaningEn: 'Green tea'
      },
      {
        id: 'hsk1-069',
        hanzi: '吃',
        pinyin: 'chī',
        hanviet: 'Ngật',
        meaning: 'Ăn',
        meaningEn: 'to eat',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 6,
        radical: '口',
        exampleHanzi: '吃饭',
        examplePinyin: 'Chīfàn',
        exampleMeaning: 'Ăn cơm',
        exampleMeaningEn: 'Eat a meal'
      },
      {
        id: 'hsk1-070',
        hanzi: '米饭',
        pinyin: 'mǐfàn',
        hanviet: 'Mễ phạn',
        meaning: 'Cơm trắng',
        meaningEn: 'cooked rice',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 13,
        radical: '米',
        exampleHanzi: '吃米饭',
        examplePinyin: 'Chī mǐfàn',
        exampleMeaning: 'Ăn cơm',
        exampleMeaningEn: 'Eat rice'
      },
      {
        id: 'hsk1-071',
        hanzi: '下午',
        pinyin: 'xiàwǔ',
        hanviet: 'Hạ ngọ',
        meaning: 'Buổi chiều',
        meaningEn: 'afternoon',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 7,
        radical: '一',
        exampleHanzi: '下午好！',
        examplePinyin: 'Xiàwǔ hǎo!',
        exampleMeaning: 'Chào buổi chiều!',
        exampleMeaningEn: 'Good afternoon!'
      },
      {
        id: 'hsk1-072',
        hanzi: '商店',
        pinyin: 'shāngdiàn',
        hanviet: 'Thương điếm',
        meaning: 'Cửa hàng, tiệm tạp hóa',
        meaningEn: 'shop, store',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 19,
        radical: '口',
        exampleHanzi: '去商店',
        examplePinyin: 'Qù shāngdiàn',
        exampleMeaning: 'Đi cửa hàng',
        exampleMeaningEn: 'Go to the store'
      },
      {
        id: 'hsk1-073',
        hanzi: '买',
        pinyin: 'mǎi',
        hanviet: 'Mãi',
        meaning: 'Mua',
        meaningEn: 'to buy',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 6,
        radical: '乙',
        exampleHanzi: '买东西',
        examplePinyin: 'Mǎi dōngxi',
        exampleMeaning: 'Mua sắm đồ đạc',
        exampleMeaningEn: 'Go shopping'
      },
      {
        id: 'hsk1-074',
        hanzi: '个',
        pinyin: 'gè',
        hanviet: 'Cá',
        meaning: 'Cái, chiếc (lượng từ chung)',
        meaningEn: 'general measure word',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 3,
        radical: '人',
        exampleHanzi: '一个人',
        examplePinyin: 'Yí gè rén',
        exampleMeaning: 'Một người',
        exampleMeaningEn: 'One person'
      },
      {
        id: 'hsk1-075',
        hanzi: '杯子',
        pinyin: 'bēizi',
        hanviet: 'Bôi tử',
        meaning: 'Cái cốc, cái chén, cái ly',
        meaningEn: 'cup, glass',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '木',
        exampleHanzi: '茶杯',
        examplePinyin: 'Chábēi',
        exampleMeaning: 'Tách trà',
        exampleMeaningEn: 'Teacup'
      },
      {
        id: 'hsk1-076',
        hanzi: '多少',
        pinyin: 'duōshao',
        hanviet: 'Đa thiểu',
        meaning: 'Bao nhiêu',
        meaningEn: 'how much, how many',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 10,
        radical: '夕',
        exampleHanzi: '多少钱？',
        examplePinyin: 'Duōshao qián?',
        exampleMeaning: 'Bao nhiêu tiền?',
        exampleMeaningEn: 'How much money?'
      },
      {
        id: 'hsk1-077',
        hanzi: '钱',
        pinyin: 'qián',
        hanviet: 'Tiền',
        meaning: 'Tiền',
        meaningEn: 'money',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 10,
        radical: '钅',
        exampleHanzi: '有钱',
        examplePinyin: 'Yǒu qián',
        exampleMeaning: 'Có tiền / giàu có',
        exampleMeaningEn: 'Rich, have money'
      },
      {
        id: 'hsk1-078',
        hanzi: '块',
        pinyin: 'kuài',
        hanviet: 'Khối',
        meaning: 'Đồng, tệ (đơn vị tiền tệ khẩu ngữ)',
        meaningEn: 'yuan, dollar (colloquial money unit)',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 7,
        radical: '土',
        exampleHanzi: '十块钱',
        examplePinyin: 'Shí kuài qián',
        exampleMeaning: '10 tệ',
        exampleMeaningEn: '10 yuan'
      },
      {
        id: 'hsk1-079',
        hanzi: '那',
        pinyin: 'nà',
        hanviet: 'Na',
        meaning: 'Kia, đó (chỉ sự vật xa)',
        meaningEn: 'that, those',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 6,
        radical: '阝',
        exampleHanzi: '那个杯子',
        examplePinyin: 'Nàge bēizi',
        exampleMeaning: 'Cái cốc kia',
        exampleMeaningEn: 'That cup'
      }
    ],
    grammarPoints: [
      {
        title: 'Động từ năng nguyện "想" (xiǎng)',
        titleEn: 'Modal Verb "想" (xiǎng) for Desire',
        explanation: 'Đứng trước động từ khác biểu thị mong muốn, dự định làm một việc gì đó: 想 + Động từ.',
        explanationEn: 'Placed before another verb to express a desire, plan or intention: 想 + Verb.',
        structure: 'Chủ ngữ + 想 + Động từ + Tân ngữ',
        examples: [
          { hanzi: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', vi: 'Tôi muốn uống trà.', en: 'I want to drink tea.' },
          { hanzi: '我想买一个杯子。', pinyin: 'Wǒ xiǎng mǎi yí gè bēizi.', vi: 'Tôi muốn mua một cái cốc.', en: 'I want to buy a cup.' }
        ]
      },
      {
        title: 'Hỏi giá tiền: ... 多少钱？',
        titleEn: 'Asking Price: ... 多少钱？',
        explanation: 'Cấu trúc thông dụng nhất khi mua sắm: Sự vật + 多少钱？ Trả lời: Số tiền + 块 (hoặc 块钱).',
        explanationEn: 'The standard shopping question: Item + 多少钱？ Answer: Amount + 块 (or 块钱).',
        structure: '这个 / 那个 + Danh từ + 多少钱？',
        examples: [
          { hanzi: '这个杯子多少钱？', pinyin: 'Zhège bēizi duōshao qián?', vi: 'Cái cốc này bao nhiêu tiền?', en: 'How much is this cup?' },
          { hanzi: '二十八块。', pinyin: 'Èrshíbā kuài.', vi: '28 tệ.', en: '28 yuan.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q8-1',
        question: 'Khi muốn hỏi nhân viên bán hàng "Cái này bao nhiêu tiền?", ta nói thế nào?',
        questionEn: 'How do you ask "How much is this?"',
        options: ['这个多少钱？', '这个几块钱？', '这个什么钱？', '这个怎么钱？'],
        correctIndex: 0,
        explanation: 'Hỏi giá tiền dùng đại từ 多少: 这个多少钱？'
      },
      {
        id: 'q8-2',
        question: 'Chọn từ điền vào chỗ trống: "下午我____去商店买东西。"',
        questionEn: 'Fill in the blank: "下午我____去商店买东西。"',
        options: ['想', '是', '在', '很'],
        correctIndex: 0,
        explanation: 'Muốn đi cửa hàng mua đồ dùng động từ năng nguyện 想 (xiǎng).'
      }
    ]
  },
  {
    id: 'hsk1-lesson-09',
    courseId: 'hsk1',
    lessonNumber: 9,
    stage: 3,
    stageTitleVi: 'Chặng 3: Mua sắm, Địa điểm & Không gian sống',
    stageTitleEn: 'Stage 3: Locations, Directions & Shopping',
    titleHanzi: '你儿子在哪儿工作',
    titlePinyin: 'Nǐ érzi zài nǎr gōngzuò',
    titleVi: 'Con trai bạn làm việc ở đâu',
    titleEn: 'Where does your son work',
    radicals: ['辶 (Bộ Quai Xước - Bước đi)', '门 (Bộ Môn - Cửa)'],
    writingChars: ['小', '少', '山', '不'],
    audioFile: '/audio/hsk1/09-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Con mèo con cún ở đâu?', file: '/audio/hsk1/09-1.mp3' },
      { name: 'Bài khóa 2: Con trai bạn làm việc ở đâu?', file: '/audio/hsk1/09-2.mp3' },
      { name: 'Bài khóa 3: Bố có ở nhà không?', file: '/audio/hsk1/09-3.mp3' }
    ],
    objectives: [
      'Biết hỏi và diễn đạt vị trí nơi chốn với động từ và giới từ 在 (zài).',
      'Hỏi nơi làm việc và nghề nghiệp: 哪儿 (ở đâu), 医院 (bệnh viện), 医生 (bác sĩ).',
      'Dùng trợ từ 呢 để truy vấn tung tích vị trí (Danh từ + 呢？ = Ở đâu rồi?).'
    ],
    objectivesEn: [
      'Ask and express locations using verb/preposition 在 (zài).',
      'Inquire about workplaces and professions: 哪儿 (where), 医院 (hospital), 医生 (doctor).',
      'Use 呢 for location queries (Noun + 呢？ = Where is ...?).'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '小狗在哪儿？',
        pinyin: 'Xiǎo gǒu zài nǎr?',
        vi: 'Con cún con ở đâu vậy?',
        en: 'Where is the puppy?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '小狗在椅子下面。小猫在那儿。',
        pinyin: 'Xiǎo gǒu zài yǐzi xiàmiàn. Xiǎo māo zài nàr.',
        vi: 'Con cún con ở dưới gầm ghế. Con mèo con ở đằng kia kìa.',
        en: 'The puppy is under the chair. The kitten is over there.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你在哪儿工作？',
        pinyin: 'Nǐ zài nǎr gōngzuò?',
        vi: 'Bạn làm việc ở đâu?',
        en: 'Where do you work?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我在学校工作。你儿子在哪儿工作？',
        pinyin: 'Wǒ zài xuéxiào gōngzuò. Nǐ érzi zài nǎr gōngzuò?',
        vi: 'Tôi làm việc ở trường học. Con trai bạn làm việc ở đâu?',
        en: 'I work at school. Where does your son work?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我儿子在医院工作，他是医生。',
        pinyin: 'Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.',
        vi: 'Con trai tôi làm việc ở bệnh viện, nó là bác sĩ.',
        en: 'My son works in a hospital, he is a doctor.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你爸爸在家里吗？',
        pinyin: 'Nǐ bàba zài jiā lǐ ma?',
        vi: 'Bố bạn có ở nhà không?',
        en: 'Is your father at home?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '不在家里。他在哪儿呢？他在医院。',
        pinyin: 'Bú zài jiā lǐ. Tā zài nǎr ne? Tā zài yīyuàn.',
        vi: 'Không có ở nhà. Ông ấy đang ở đâu thế? Ông ấy ở bệnh viện.',
        en: 'Not at home. Where is he? He is at the hospital.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-080',
        hanzi: '小',
        pinyin: 'xiǎo',
        hanviet: 'Tiểu',
        meaning: 'Nhỏ, bé',
        meaningEn: 'small, little',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 3,
        radical: '小',
        exampleHanzi: '小狗',
        examplePinyin: 'Xiǎo gǒu',
        exampleMeaning: 'Chó con',
        exampleMeaningEn: 'Puppy'
      },
      {
        id: 'hsk1-081',
        hanzi: '猫',
        pinyin: 'māo',
        hanviet: 'Miêu',
        meaning: 'Con mèo',
        meaningEn: 'cat',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '犭',
        exampleHanzi: '小猫很可爱。',
        examplePinyin: 'Xiǎo māo hěn kě’ài.',
        exampleMeaning: 'Mèo con rất đáng yêu.',
        exampleMeaningEn: 'The kitten is very cute.'
      },
      {
        id: 'hsk1-082',
        hanzi: '在',
        pinyin: 'zài',
        hanviet: 'Tại',
        meaning: 'Ở, tại (động từ chỉ tồn tại / giới từ)',
        meaningEn: 'at, in, on (verb or prep)',
        level: 1,
        partOfSpeech: 'Động từ / Giới từ',
        strokes: 6,
        radical: '土',
        exampleHanzi: '我在家。',
        examplePinyin: 'Wǒ zài jiā.',
        exampleMeaning: 'Tôi ở nhà.',
        exampleMeaningEn: 'I am at home.'
      },
      {
        id: 'hsk1-083',
        hanzi: '狗',
        pinyin: 'gǒu',
        hanviet: 'Cẩu',
        meaning: 'Con chó',
        meaningEn: 'dog',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '犭',
        exampleHanzi: '我家有一只狗。',
        examplePinyin: 'Wǒ jiā yǒu yì zhī gǒu.',
        exampleMeaning: 'Nhà tôi có một chú chó.',
        exampleMeaningEn: 'My family has a dog.'
      },
      {
        id: 'hsk1-084',
        hanzi: '椅子',
        pinyin: 'yǐzi',
        hanviet: 'Ỷ tử',
        meaning: 'Cái ghế',
        meaningEn: 'chair',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '木',
        exampleHanzi: '坐在椅子上',
        examplePinyin: 'Zuò zài yǐzi shàng',
        exampleMeaning: 'Ngồi trên ghế',
        exampleMeaningEn: 'Sit on the chair'
      },
      {
        id: 'hsk1-085',
        hanzi: '下面',
        pinyin: 'xiàmiàn',
        hanviet: 'Hạ diện',
        meaning: 'Phía dưới, bên dưới',
        meaningEn: 'under, below',
        level: 1,
        partOfSpeech: 'Danh từ chỉ phương vị',
        strokes: 12,
        radical: '一',
        exampleHanzi: '椅子下面',
        examplePinyin: 'Yǐzi xiàmiàn',
        exampleMeaning: 'Dưới gầm ghế',
        exampleMeaningEn: 'Under the chair'
      },
      {
        id: 'hsk1-086',
        hanzi: '哪儿',
        pinyin: 'nǎr',
        hanviet: 'Nả nhi',
        meaning: 'Ở đâu, chỗ nào (đại từ nghi vấn)',
        meaningEn: 'where',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 11,
        radical: '口',
        exampleHanzi: '你在哪儿？',
        examplePinyin: 'Nǐ zài nǎr?',
        exampleMeaning: 'Bạn đang ở đâu?',
        exampleMeaningEn: 'Where are you?'
      },
      {
        id: 'hsk1-087',
        hanzi: '工作',
        pinyin: 'gōngzuò',
        hanviet: 'Công tác',
        meaning: 'Làm việc, công việc',
        meaningEn: 'work, job, to work',
        level: 1,
        partOfSpeech: 'Động từ / Danh từ',
        strokes: 10,
        radical: '工',
        exampleHanzi: '找工作',
        examplePinyin: 'Zhǎo gōngzuò',
        exampleMeaning: 'Tìm việc làm',
        exampleMeaningEn: 'Look for a job'
      },
      {
        id: 'hsk1-088',
        hanzi: '儿子',
        pinyin: 'érzi',
        hanviet: 'Nhi tử',
        meaning: 'Con trai',
        meaningEn: 'son',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 5,
        radical: '儿',
        exampleHanzi: '他儿子十岁了。',
        examplePinyin: 'Tā érzi shí suì le.',
        exampleMeaning: 'Con trai anh ấy 10 tuổi rồi.',
        exampleMeaningEn: 'His son is 10 years old.'
      },
      {
        id: 'hsk1-089',
        hanzi: '医院',
        pinyin: 'yīyuàn',
        hanviet: 'Y viện',
        meaning: 'Bệnh viện',
        meaningEn: 'hospital',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 16,
        radical: '匚',
        exampleHanzi: '去医院',
        examplePinyin: 'Qù yīyuàn',
        exampleMeaning: 'Đi bệnh viện',
        exampleMeaningEn: 'Go to hospital'
      },
      {
        id: 'hsk1-090',
        hanzi: '医生',
        pinyin: 'yīshēng',
        hanviet: 'Y sinh',
        meaning: 'Bác sĩ',
        meaningEn: 'doctor',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 12,
        radical: '匚',
        exampleHanzi: '他是医生。',
        examplePinyin: 'Tā shì yīshēng.',
        exampleMeaning: 'Anh ấy là bác sĩ.',
        exampleMeaningEn: 'He is a doctor.'
      },
      {
        id: 'hsk1-091',
        hanzi: '爸爸',
        pinyin: 'bàba',
        hanviet: 'Bá bá',
        meaning: 'Bố, ba, cha',
        meaningEn: 'father, dad',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '父',
        exampleHanzi: '我爸爸很好。',
        examplePinyin: 'Wǒ bàba hěn hǎo.',
        exampleMeaning: 'Bố tôi rất khỏe.',
        exampleMeaningEn: 'My dad is fine.'
      }
    ],
    grammarPoints: [
      {
        title: 'Giới từ nơi chốn "在" (zài): Chủ ngữ + 在 + Nơi chốn + Động từ',
        titleEn: 'Preposition "在" for Location of Action',
        explanation: 'Trong tiếng Trung, trạng ngữ chỉ địa điểm đứng trước động từ chính (ngược với tiếng Việt: "Làm việc ở bệnh viện" -> 在医院工作).',
        explanationEn: 'Location adjuncts precede the main verb in Chinese (Subject + 在 + Place + Verb).',
        structure: 'Chủ ngữ + 在 + Nơi chốn + Động từ + Tân ngữ',
        examples: [
          { hanzi: '我在学校工作。', pinyin: 'Wǒ zài xuéxiào gōngzuò.', vi: 'Tôi làm việc ở trường học.', en: 'I work at school.' },
          { hanzi: '他在医院看书。', pinyin: 'Tā zài yīyuàn kàn shū.', vi: 'Anh ấy đọc sách ở bệnh viện.', en: 'He reads books at the hospital.' }
        ]
      },
      {
        title: 'Trợ từ "呢" truy vấn nơi chốn',
        titleEn: 'Querying Location with "呢"',
        explanation: 'Khi dùng "Danh từ + 呢？", nó mang nghĩa hỏi địa điểm người hoặc vật đó đang ở đâu (tương đương 在哪儿).',
        explanationEn: '"Noun + 呢？" asks where somebody or something is located (equivalent to "在哪儿").',
        structure: '我的书呢？ (Sách của tôi đâu rồi?) / 爸爸呢？ (Bố đâu rồi?)',
        examples: [
          { hanzi: '小猫呢？', pinyin: 'Xiǎo māo ne?', vi: 'Mèo con đâu rồi?', en: 'Where is the kitten?' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q9-1',
        question: 'Dịch câu "Tôi làm việc ở bệnh viện" sang tiếng Trung:',
        questionEn: 'Translate "I work at the hospital" into Chinese:',
        options: ['我工作在医院。', '我在医院工作。', '我医院在工作。', '在医院我工作。'],
        correctIndex: 1,
        explanation: 'Quy tắc ngữ pháp tiếng Trung: Địa điểm đứng trước động từ -> 我在医院工作.'
      },
      {
        id: 'q9-2',
        question: 'Câu hỏi "小狗在哪儿？" có nghĩa là gì?',
        questionEn: 'What does "小狗在哪儿？" mean?',
        options: ['Con chó con tên là gì?', 'Con chó con ở đâu?', 'Con chó con bao nhiêu tiền?', 'Con chó con mấy tuổi?'],
        correctIndex: 1,
        explanation: '在哪儿 (zài nǎr) là cụm từ hỏi vị trí: "ở đâu".'
      }
    ]
  },
  {
    id: 'hsk1-lesson-10',
    courseId: 'hsk1',
    lessonNumber: 10,
    stage: 3,
    stageTitleVi: 'Chặng 3: Mua sắm, Địa điểm & Không gian sống',
    stageTitleEn: 'Stage 3: Locations, Directions & Shopping',
    titleHanzi: '我能坐这儿吗',
    titlePinyin: 'Wǒ néng zuò zhèr ma',
    titleVi: 'Tôi có thể ngồi đây không',
    titleEn: 'Can I sit here',
    radicals: ['冂 (Bộ Quynh - Vùng biên ải)', '礻 (Bộ Thị - Tâm linh, tế tự)'],
    writingChars: ['上', '下', '东', '西'],
    audioFile: '/audio/hsk1/10-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Trên bàn có gì?', file: '/audio/hsk1/10-1.mp3' },
      { name: 'Bài khóa 2: Người phía trước và phía sau', file: '/audio/hsk1/10-2.mp3' },
      { name: 'Bài khóa 3: Tôi có thể ngồi đây không?', file: '/audio/hsk1/10-3.mp3' }
    ],
    objectives: [
      'Nắm vững câu tồn hiện với động từ 有 (Địa điểm + 有 + Sự vật).',
      'Diễn đạt vị trí không gian với các từ chỉ phương vị: 前面 (phía trước), 后面 (phía sau), 上 (trên), 里 (trong).',
      'Hỏi xin phép lịch sự bằng động từ năng nguyện 能 (néng) và đáp lời bằng 请 (qǐng).'
    ],
    objectivesEn: [
      'Master existential sentences with 有 (Location + 有 + Objects).',
      'Express spatial orientation using 前面 (front), 后面 (back), 上 (top), 里 (inside).',
      'Politely ask for permission using 能 (néng) and reply with 请 (qǐng).'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '桌子上有什么？',
        pinyin: 'Zhuōzi shàng yǒu shénme?',
        vi: 'Trên bàn có những gì thế?',
        en: 'What is on the table?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '桌子上有一个电脑和一本书。杯子在桌子里。',
        pinyin: 'Zhuōzi shàng yǒu yí gè diànnǎo hé yì běn shū. Bēizi zài zhuōzi lǐ.',
        vi: 'Trên bàn có một chiếc máy tính và một cuốn sách. Cái cốc ở trong bàn.',
        en: 'There is a computer and a book on the table. The cup is inside the desk.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '前面那个人叫什么名字？',
        pinyin: 'Qiánmiàn nàge rén jiào shénme míngzi?',
        vi: 'Người đằng trước kia tên là gì vậy?',
        en: "What's the name of the person in front?"
      },
      {
        speaker: '大卫 (David)',
        hanzi: '她叫王方，在医院工作。后面那个人叫谢朋，在商店工作。',
        pinyin: 'Tā jiào Wáng Fāng, zài yīyuàn gōngzuò. Hòumiàn nàge rén jiào Xiè Péng, zài shāngdiàn gōngzuò.',
        vi: 'Cô ấy tên là Vương Phương, làm việc ở bệnh viện. Người đằng sau tên là Tạ Bằng, làm việc ở cửa hàng.',
        en: 'Her name is Wang Fang, she works in a hospital. The person behind is Xie Peng, working in a shop.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '这儿有人吗？我能坐这儿吗？',
        pinyin: 'Zhèr yǒu rén ma? Wǒ néng zuò zhèr ma?',
        vi: 'Ở đây có người ngồi không? Tôi có thể ngồi đây được không?',
        en: 'Is there anyone here? Can I sit here?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '没有。请坐！',
        pinyin: 'Méiyǒu. Qǐng zuò!',
        vi: 'Không có ai đâu. Mời bạn ngồi!',
        en: 'Nobody. Please sit down!'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-092',
        hanzi: '桌子',
        pinyin: 'zhuōzi',
        hanviet: 'Trác tử',
        meaning: 'Cái bàn',
        meaningEn: 'table, desk',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 13,
        radical: '木',
        exampleHanzi: '在桌子上',
        examplePinyin: 'Zài zhuōzi shàng',
        exampleMeaning: 'Ở trên bàn',
        exampleMeaningEn: 'On the table'
      },
      {
        id: 'hsk1-093',
        hanzi: '上',
        pinyin: 'shàng',
        hanviet: 'Thượng',
        meaning: 'Trên, phía trên / Lên',
        meaningEn: 'on, above, up',
        level: 1,
        partOfSpeech: 'Danh từ chỉ phương vị',
        strokes: 3,
        radical: '一',
        exampleHanzi: '桌子上',
        examplePinyin: 'Zhuōzi shàng',
        exampleMeaning: 'Trên bàn',
        exampleMeaningEn: 'On the table'
      },
      {
        id: 'hsk1-094',
        hanzi: '电脑',
        pinyin: 'diànnǎo',
        hanviet: 'Điện não',
        meaning: 'Máy vi tính',
        meaningEn: 'computer',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 18,
        radical: '雨',
        exampleHanzi: '一台电脑',
        examplePinyin: 'Yì tái diànnǎo',
        exampleMeaning: 'Một chiếc máy tính',
        exampleMeaningEn: 'A computer'
      },
      {
        id: 'hsk1-095',
        hanzi: '和',
        pinyin: 'hé',
        hanviet: 'Hòa',
        meaning: 'Và, cùng (liên từ nối danh từ)',
        meaningEn: 'and, with',
        level: 1,
        partOfSpeech: 'Liên từ',
        strokes: 8,
        radical: '口',
        exampleHanzi: '我和你',
        examplePinyin: 'Wǒ hé nǐ',
        exampleMeaning: 'Tôi và bạn',
        exampleMeaningEn: 'Me and you'
      },
      {
        id: 'hsk1-096',
        hanzi: '本',
        pinyin: 'běn',
        hanviet: 'Bản',
        meaning: 'Quyển, cuốn (lượng từ cho sách vở)',
        meaningEn: 'measure word for books',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 5,
        radical: '木',
        exampleHanzi: '一本书',
        examplePinyin: 'Yì běn shū',
        exampleMeaning: 'Một cuốn sách',
        exampleMeaningEn: 'A book'
      },
      {
        id: 'hsk1-097',
        hanzi: '里',
        pinyin: 'lǐ',
        hanviet: 'Lý',
        meaning: 'Trong, bên trong',
        meaningEn: 'inside, in',
        level: 1,
        partOfSpeech: 'Danh từ chỉ phương vị',
        strokes: 7,
        radical: '里',
        exampleHanzi: '家里',
        examplePinyin: 'Jiā lǐ',
        exampleMeaning: 'Trong nhà',
        exampleMeaningEn: 'Inside the house'
      },
      {
        id: 'hsk1-098',
        hanzi: '前面',
        pinyin: 'qiánmiàn',
        hanviet: 'Tiền diện',
        meaning: 'Phía trước, đằng trước',
        meaningEn: 'front, ahead',
        level: 1,
        partOfSpeech: 'Danh từ chỉ phương vị',
        strokes: 18,
        radical: '刀',
        exampleHanzi: '他在前面。',
        examplePinyin: 'Tā zài qiánmiàn.',
        exampleMeaning: 'Anh ấy ở phía trước.',
        exampleMeaningEn: 'He is in front.'
      },
      {
        id: 'hsk1-099',
        hanzi: '后面',
        pinyin: 'hòumiàn',
        hanviet: 'Hậu diện',
        meaning: 'Phía sau, đằng sau',
        meaningEn: 'back, behind',
        level: 1,
        partOfSpeech: 'Danh từ chỉ phương vị',
        strokes: 15,
        radical: '口',
        exampleHanzi: '学校后面',
        examplePinyin: 'Xuéxiào hòumiàn',
        exampleMeaning: 'Sau trường học',
        exampleMeaningEn: 'Behind the school'
      },
      {
        id: 'hsk1-100',
        hanzi: '这儿',
        pinyin: 'zhèr',
        hanviet: 'Giá nhi',
        meaning: 'Ở đây, chỗ này',
        meaningEn: 'here',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 9,
        radical: '辶',
        exampleHanzi: '请来这儿。',
        examplePinyin: 'Qǐng lái zhèr.',
        exampleMeaning: 'Xin mời đến đây.',
        exampleMeaningEn: 'Please come here.'
      },
      {
        id: 'hsk1-101',
        hanzi: '没有',
        pinyin: 'méiyǒu',
        hanviet: 'Một hữu',
        meaning: 'Không có',
        meaningEn: 'there is not, not have',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 13,
        radical: '氵',
        exampleHanzi: '这儿没有人。',
        examplePinyin: 'Zhèr méiyǒu rén.',
        exampleMeaning: 'Ở đây không có người.',
        exampleMeaningEn: 'No one is here.'
      },
      {
        id: 'hsk1-102',
        hanzi: '能',
        pinyin: 'néng',
        hanviet: 'Năng',
        meaning: 'Có thể (chỉ điều kiện, sự cho phép)',
        meaningEn: 'can, may, to be able to',
        level: 1,
        partOfSpeech: 'Động từ năng nguyện',
        strokes: 10,
        radical: '月',
        exampleHanzi: '我能坐这儿吗？',
        examplePinyin: 'Wǒ néng zuò zhèr ma?',
        exampleMeaning: 'Tôi có thể ngồi đây không?',
        exampleMeaningEn: 'Can I sit here?'
      },
      {
        id: 'hsk1-103',
        hanzi: '坐',
        pinyin: 'zuò',
        hanviet: 'Tọa',
        meaning: 'Ngồi',
        meaningEn: 'to sit',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 7,
        radical: '土',
        exampleHanzi: '请坐！',
        examplePinyin: 'Qǐng zuò!',
        exampleMeaning: 'Mời ngồi!',
        exampleMeaningEn: 'Please sit!'
      },
      {
        id: 'hsk1-104',
        hanzi: '请',
        pinyin: 'qǐng',
        hanviet: 'Thỉnh',
        meaning: 'Mời, xin mời, làm ơn',
        meaningEn: 'please, to invite',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 10,
        radical: '讠',
        exampleHanzi: '请进！',
        examplePinyin: 'Qǐng jìn!',
        exampleMeaning: 'Mời vào!',
        exampleMeaningEn: 'Please come in!'
      }
    ],
    grammarPoints: [
      {
        title: 'Câu tồn hiện với động từ "有" (yǒu)',
        titleEn: 'Existential Sentences with "有"',
        explanation: 'Dùng để diễn đạt ở một vị trí hay địa điểm nào đó có sự vật hoặc người tồn tại: Nơi chốn + 有 + Danh từ.',
        explanationEn: 'States that something or somebody exists at a specific place: Place + 有 + Object.',
        structure: 'Địa điểm + 有 + Sự vật / Phủ định: Địa điểm + 没有 + Sự vật',
        examples: [
          { hanzi: '桌子上有一个电脑。', pinyin: 'Zhuōzi shàng yǒu yí gè diànnǎo.', vi: 'Trên bàn có một chiếc máy vi tính.', en: 'There is a computer on the table.' },
          { hanzi: '这儿没有人。', pinyin: 'Zhèr méiyǒu rén.', vi: 'Ở đây không có ai.', en: 'Nobody is here.' }
        ]
      },
      {
        title: 'Động từ năng nguyện "能" (néng) trong câu xin phép',
        titleEn: 'Modal Verb "能" for Permission',
        explanation: 'Dùng "能 + Động từ" để hỏi sự cho phép hoặc khả năng hoàn cảnh: "Tôi có thể... được không?".',
        explanationEn: 'Expresses permission or circumstantial possibility: "Can I ...?"',
        structure: '我能 + Động từ + (Tân ngữ) + 吗？',
        examples: [
          { hanzi: '我能坐这儿吗？', pinyin: 'Wǒ néng zuò zhèr ma?', vi: 'Tôi có thể ngồi đây không?', en: 'May I sit here?' },
          { hanzi: '请坐。', pinyin: 'Qǐng zuò.', vi: 'Xin mời ngồi.', en: 'Please take a seat.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q10-1',
        question: 'Khi muốn xin phép ngồi vào một ghế trống, câu nói lịch sự nhất là gì?',
        questionEn: 'What is the most polite way to ask to sit down?',
        options: ['我能坐这儿吗？', '我要坐这儿！', '我是坐这儿。', '坐这儿的人是谁？'],
        correctIndex: 0,
        explanation: 'Xin phép lịch sự dùng động từ năng nguyện 能: 我能坐这儿吗？'
      },
      {
        id: 'q10-2',
        question: 'Điền từ thích hợp: "桌子____有一个电脑。"',
        questionEn: 'Fill in the blank: "桌子____有一个电脑。"',
        options: ['上', '下', '前', '后'],
        correctIndex: 0,
        explanation: 'Máy tính đặt trên mặt bàn dùng từ phương vị 上 (shàng): 桌子上.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-11',
    courseId: 'hsk1',
    lessonNumber: 11,
    stage: 4,
    stageTitleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    stageTitleEn: 'Stage 4: Schedules, Weather & Plans',
    titleHanzi: '现在几点',
    titlePinyin: 'Xiànzài jǐ diǎn',
    titleVi: 'Bây giờ mấy giờ',
    titleEn: 'What time is it now',
    radicals: ['阝 (Bộ Phụ / Ấp - Gò đất, thành trì)', '亻 (Bộ Nhân đứng)'],
    writingChars: ['午', '半', '雨', '电'],
    audioFile: '/audio/hsk1/11-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Bây giờ mấy giờ?', file: '/audio/hsk1/11-1.mp3' },
      { name: 'Bài khóa 2: Khi nào ăn cơm, xem phim?', file: '/audio/hsk1/11-2.mp3' },
      { name: 'Bài khóa 3: Lịch trình đi Bắc Kinh', file: '/audio/hsk1/11-3.mp3' }
    ],
    objectives: [
      'Biết cách hỏi và trả lời giờ giấc chính xác trong ngày (点 - giờ, 分 - phút, 半 - rưỡi).',
      'Sử dụng cụm từ nghi vấn 什么时候 (shénme shíhou - khi nào) để hỏi thời điểm xảy ra sự việc.',
      'Sử dụng cụm từ ...前 (qián - trước...) để đặt mốc thời gian giới hạn.'
    ],
    objectivesEn: [
      'Ask and tell the exact time of day (点 - o’clock, 分 - minute, 半 - half).',
      'Use 什么时候 (shénme shíhou - when) to ask about schedules.',
      'Use ...前 (qián - before/prior to) to define time limits.'
    ],
    dialogue: [
      {
        speaker: '大卫 (David)',
        hanzi: '现在几点？',
        pinyin: 'Xiànzài jǐ diǎn?',
        vi: 'Bây giờ là mấy giờ rồi?',
        en: 'What time is it now?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '现在十点十分。中午几点吃饭？',
        pinyin: 'Xiànzài shí diǎn shí fēn. Zhōngwǔ jǐ diǎn chīfàn?',
        vi: 'Bây giờ là 10 giờ 10 phút. Buổi trưa mấy giờ ăn cơm vậy?',
        en: 'It is 10:10 now. What time do we have lunch at noon?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '十二点吃饭。爸爸什么时候回家？',
        pinyin: 'Shí’èr diǎn chīfàn. Bàba shénme shíhou huí jiā?',
        vi: '12 giờ ăn cơm. Khi nào thì bố về nhà?',
        en: 'Lunch at 12 o’clock. When is dad coming home?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '下午五点。我们什么时候去看电影？',
        pinyin: 'Xiàwǔ wǔ diǎn. Wǒmen shénme shíhou qù kàn diànyǐng?',
        vi: '5 giờ chiều. Chúng ta khi nào đi xem phim?',
        en: 'At 5 PM. When are we going to watch a movie?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '六点三十分。我星期一去北京。你想在北京住几天？住三天。',
        pinyin: 'Liù diǎn sānshí fēn. Wǒ xīngqīyī qù Běijīng. Nǐ xiǎng zài Běijīng zhù jǐ tiān? Zhù sān tiān.',
        vi: '6 giờ 30 phút. Thứ Hai tôi đi Bắc Kinh. Bạn muốn ở lại Bắc Kinh mấy ngày? Ở 3 ngày.',
        en: 'At 6:30. I am going to Beijing on Monday. How many days will you stay? Stay for three days.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '星期五前能回家吗？',
        pinyin: 'Xīngqīwǔ qián néng huí jiā ma?',
        vi: 'Trước thứ Sáu có thể về đến nhà không?',
        en: 'Can you get back home before Friday?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '能。',
        pinyin: 'Néng.',
        vi: 'Có thể.',
        en: 'Yes, I can.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-105',
        hanzi: '现在',
        pinyin: 'xiànzài',
        hanviet: 'Hiện tại',
        meaning: 'Bây giờ, hiện nay',
        meaningEn: 'now, at present',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 16,
        radical: '玉',
        exampleHanzi: '现在几点？',
        examplePinyin: 'Xiànzài jǐ diǎn?',
        exampleMeaning: 'Bây giờ mấy giờ?',
        exampleMeaningEn: 'What time is it now?'
      },
      {
        id: 'hsk1-106',
        hanzi: '点',
        pinyin: 'diǎn',
        hanviet: 'Điểm',
        meaning: 'Giờ (đơn vị giờ đồng hồ)',
        meaningEn: 'o’clock, hour',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 9,
        radical: '灬',
        exampleHanzi: '八点',
        examplePinyin: 'Bā diǎn',
        exampleMeaning: '8 giờ',
        exampleMeaningEn: '8 o’clock'
      },
      {
        id: 'hsk1-107',
        hanzi: '分',
        pinyin: 'fēn',
        hanviet: 'Phân',
        meaning: 'Phút',
        meaningEn: 'minute',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 4,
        radical: '刀',
        exampleHanzi: '十分钟',
        examplePinyin: 'Shí fēnzhōng',
        exampleMeaning: '10 phút',
        exampleMeaningEn: '10 minutes'
      },
      {
        id: 'hsk1-108',
        hanzi: '中午',
        pinyin: 'zhōngwǔ',
        hanviet: 'Trung ngọ',
        meaning: 'Buổi trưa',
        meaningEn: 'noon, midday',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '丨',
        exampleHanzi: '中午好！',
        examplePinyin: 'Zhōngwǔ hǎo!',
        exampleMeaning: 'Chào buổi trưa!',
        exampleMeaningEn: 'Good noon!'
      },
      {
        id: 'hsk1-109',
        hanzi: '吃饭',
        pinyin: 'chīfàn',
        hanviet: 'Ngật phạn',
        meaning: 'Ăn cơm, dùng bữa',
        meaningEn: 'to eat a meal',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 13,
        radical: '口',
        exampleHanzi: '去吃饭',
        examplePinyin: 'Qù chīfàn',
        exampleMeaning: 'Đi ăn cơm',
        exampleMeaningEn: 'Go have a meal'
      },
      {
        id: 'hsk1-110',
        hanzi: '时候',
        pinyin: 'shíhou',
        hanviet: 'Thời hậu',
        meaning: 'Lúc, khi, thời điểm',
        meaningEn: 'time, moment',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 20,
        radical: '日',
        exampleHanzi: '什么时候？',
        examplePinyin: 'Shénme shíhou?',
        exampleMeaning: 'Khi nào?',
        exampleMeaningEn: 'When?'
      },
      {
        id: 'hsk1-111',
        hanzi: '回',
        pinyin: 'huí',
        hanviet: 'Hồi',
        meaning: 'Về, quay lại',
        meaningEn: 'to return, to go back',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 6,
        radical: '囗',
        exampleHanzi: '回家',
        examplePinyin: 'Huí jiā',
        exampleMeaning: 'Về nhà',
        exampleMeaningEn: 'Go home'
      },
      {
        id: 'hsk1-112',
        hanzi: '我们',
        pinyin: 'wǒmen',
        hanviet: 'Ngã môn',
        meaning: 'Chúng tôi, chúng ta',
        meaningEn: 'we, us',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 12,
        radical: '亻',
        exampleHanzi: '我们一起走。',
        examplePinyin: 'Wǒmen yìqǐ zǒu.',
        exampleMeaning: 'Chúng ta cùng đi.',
        exampleMeaningEn: 'Let’s go together.'
      },
      {
        id: 'hsk1-113',
        hanzi: '电影',
        pinyin: 'diànyǐng',
        hanviet: 'Điện ảnh',
        meaning: 'Phim ảnh, bộ phim',
        meaningEn: 'movie, film',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 28,
        radical: '雨',
        exampleHanzi: '看电影',
        examplePinyin: 'Kàn diànyǐng',
        exampleMeaning: 'Xem phim',
        exampleMeaningEn: 'Watch a movie'
      },
      {
        id: 'hsk1-114',
        hanzi: '住',
        pinyin: 'zhù',
        hanviet: 'Trú',
        meaning: 'Ở, trú ngụ, cư trú',
        meaningEn: 'to live, to stay',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 7,
        radical: '亻',
        exampleHanzi: '住在北京',
        examplePinyin: 'Zhù zài Běijīng',
        exampleMeaning: 'Sống ở Bắc Kinh',
        exampleMeaningEn: 'Live in Beijing'
      },
      {
        id: 'hsk1-115',
        hanzi: '前',
        pinyin: 'qián',
        hanviet: 'Tiền',
        meaning: 'Trước, phía trước',
        meaningEn: 'before, earlier, ago',
        level: 1,
        partOfSpeech: 'Danh từ chỉ thời gian',
        strokes: 9,
        radical: '刀',
        exampleHanzi: '三天前',
        examplePinyin: 'Sān tiān qián',
        exampleMeaning: '3 ngày trước',
        exampleMeaningEn: '3 days ago'
      },
      {
        id: 'hsk1-116',
        hanzi: '北京',
        pinyin: 'Běijīng',
        hanviet: 'Bắc Kinh',
        meaning: 'Thủ đô Bắc Kinh (Trung Quốc)',
        meaningEn: 'Beijing',
        level: 1,
        partOfSpeech: 'Danh từ riêng',
        strokes: 13,
        radical: '亠',
        exampleHanzi: '去北京',
        examplePinyin: 'Qù Běijīng',
        exampleMeaning: 'Đi Bắc Kinh',
        exampleMeaningEn: 'Go to Beijing'
      }
    ],
    grammarPoints: [
      {
        title: 'Cách nói Giờ giấc: ...点...分',
        titleEn: 'Telling Time: ...点...分',
        explanation: 'Giờ đứng trước, phút đứng sau: Số + 点 + Số + 分. 30 phút có thể nói là 半 (bàn - rưỡi).',
        explanationEn: 'Hours precede minutes: Number + 点 + Number + 分. 30 minutes can also be said as 半 (half).',
        structure: '...点 + ...分 (Ví dụ: 10点10分, 6点30分 / 6点半)',
        examples: [
          { hanzi: '现在十点十分。', pinyin: 'Xiànzài shí diǎn shí fēn.', vi: 'Bây giờ 10 giờ 10 phút.', en: 'It is 10:10 now.' },
          { hanzi: '六点半', pinyin: 'Liù diǎn bàn', vi: '6 giờ rưỡi', en: 'Half past six' }
        ]
      },
      {
        title: 'Cụm từ nghi vấn "什么时候" (shénme shíhou - khi nào)',
        titleEn: 'Interrogative "什么时候" (when)',
        explanation: 'Dùng để hỏi thời điểm tiến hành một hành động. Trong câu, nó đứng trước động từ (sau hoặc trước chủ ngữ).',
        explanationEn: 'Used to ask about the time an event occurs. Placed directly before the verb or before the subject.',
        structure: 'Chủ ngữ + 什么时候 + Động từ + (Tân ngữ)?',
        examples: [
          { hanzi: '爸爸什么时候回家？', pinyin: 'Bàba shénme shíhou huí jiā?', vi: 'Bố khi nào về nhà?', en: 'When will dad go home?' },
          { hanzi: '我们什么时候去看电影？', pinyin: 'Wǒmen shénme shíhou qù kàn diànyǐng?', vi: 'Chúng ta khi nào đi xem phim?', en: 'When do we go watch the movie?' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q11-1',
        question: 'Muốn hỏi "Khi nào chúng ta đi xem phim?", câu nào đúng?',
        questionEn: 'How to ask "When are we going to watch a movie?"',
        options: ['我们什么时候去看电影？', '我们几点去看电影？ (chỉ hỏi giờ cụ thể)', '我们去哪儿看电影？', '我们怎么看电影？'],
        correctIndex: 0,
        explanation: 'Hỏi mốc thời điểm chung "khi nào" dùng cụm từ: 什么时候 (shénme shíhou).'
      },
      {
        id: 'q11-2',
        question: '"9 giờ 30 phút" trong khẩu ngữ tiếng Trung có thể nói tắt là gì?',
        questionEn: 'How to colloquially say "9:30" in Chinese?',
        options: ['九点半', '九点分', '九点三', '半九点'],
        correctIndex: 0,
        explanation: '30 phút có thể thay bằng từ 半 (bàn - rưỡi): 九点半.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-12',
    courseId: 'hsk1',
    lessonNumber: 12,
    stage: 4,
    stageTitleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    stageTitleEn: 'Stage 4: Schedules, Weather & Plans',
    titleHanzi: '明天天气怎么样',
    titlePinyin: 'Míngtiān tiānqì zěnmeyàng',
    titleVi: 'Thời tiết ngày mai thế nào',
    titleEn: 'How is the weather tomorrow',
    radicals: ['女 (Bộ Nữ)', '饣 (Bộ Thực)'],
    writingChars: ['车', '长', '雨', '果'],
    audioFile: '/audio/hsk1/12-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Thời tiết Bắc Kinh thế nào?', file: '/audio/hsk1/12-1.mp3' },
      { name: 'Bài khóa 2: Hôm nay có mưa không?', file: '/audio/hsk1/12-2.mp3' },
      { name: 'Bài khóa 3: Sức khỏe và uống nhiều nước', file: '/audio/hsk1/12-3.mp3' }
    ],
    objectives: [
      'Hỏi và miêu tả thời tiết, khí hậu với đại từ 怎么样 (zěnmeyàng) và các tính từ: 热 (nóng), 冷 (lạnh), 下雨 (mưa).',
      'Biểu thị cảm thán cảm xúc mức độ cao bằng cấu trúc: 太...了 (tài...le).',
      'Dùng động từ năng nguyện 会 (huì) để dự đoán khả năng sự việc xảy ra trong tương lai.'
    ],
    objectivesEn: [
      'Inquire about and describe weather using 怎么样, 热 (hot), 冷 (cold), 下雨 (rain).',
      'Express high degree and exclamation using: 太...了 (tài...le).',
      'Use modal verb 会 (huì) to predict future possibilities.'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '昨天北京的天气怎么样？',
        pinyin: 'Zuótiān Běijīng de tiānqì zěnmeyàng?',
        vi: 'Hôm qua thời tiết Bắc Kinh thế nào?',
        en: 'How was the weather in Beijing yesterday?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '太热了。明天天气很好，不冷不热。',
        pinyin: 'Tài rè le. Míngtiān tiānqì hěn hǎo, bù lěng bú rè.',
        vi: 'Nóng quá. Ngày mai thời tiết rất đẹp, không lạnh không nóng.',
        en: 'Too hot. Tomorrow the weather will be very good, neither cold nor hot.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '今天会下雨吗？',
        pinyin: 'Jīntiān huì xiàyǔ ma?',
        vi: 'Hôm nay trời có mưa không?',
        en: 'Will it rain today?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '今天不会下雨。王小姐今天会来吗？不会来，天气太冷了。',
        pinyin: 'Jīntiān bú huì xiàyǔ. Wáng xiǎojiě jīntiān huì lái ma? Bú huì lái, tiānqì tài lěng le.',
        vi: 'Hôm nay sẽ không mưa. Cô Vương hôm nay có đến không? Sẽ không đến đâu, trời lạnh quá.',
        en: 'It will not rain today. Will Miss Wang come today? No, the weather is too cold.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '你身体怎么样？',
        pinyin: 'Nǐ shēntǐ zěnmeyàng?',
        vi: 'Sức khỏe của bạn thế nào rồi?',
        en: 'How is your health?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我身体很好。天气太热了，多喝些水吧。谢谢你，李老师。',
        pinyin: 'Wǒ shēntǐ hěn hǎo. Tiānqì tài rè le, duō hē xiē shuǐ ba. Xièxie nǐ, Lǐ lǎoshī.',
        vi: 'Sức khỏe tôi rất tốt. Trời nóng quá, uống nhiều nước chút nhé. Cảm ơn thầy Lý.',
        en: 'I feel great. It is too hot, drink some more water. Thank you, Teacher Li.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-117',
        hanzi: '天气',
        pinyin: 'tiānqì',
        hanviet: 'Thiên khí',
        meaning: 'Thời tiết',
        meaningEn: 'weather',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 8,
        radical: '大',
        exampleHanzi: '好天气',
        examplePinyin: 'Hǎo tiānqì',
        exampleMeaning: 'Thời tiết đẹp',
        exampleMeaningEn: 'Good weather'
      },
      {
        id: 'hsk1-118',
        hanzi: '怎么样',
        pinyin: 'zěnmeyàng',
        hanviet: 'Chẩm ma dạng',
        meaning: 'Thế nào, ra sao (hỏi tính chất, tình trạng)',
        meaningEn: 'how is it, what about',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 18,
        radical: '心',
        exampleHanzi: '天气怎么样？',
        examplePinyin: 'Tiānqì zěnmeyàng?',
        exampleMeaning: 'Thời tiết thế nào?',
        exampleMeaningEn: 'How is the weather?'
      },
      {
        id: 'hsk1-119',
        hanzi: '太',
        pinyin: 'tài',
        hanviet: 'Thái',
        meaning: 'Quá, lắm',
        meaningEn: 'too, extremely',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 4,
        radical: '大',
        exampleHanzi: '太好了！',
        examplePinyin: 'Tài hǎo le!',
        exampleMeaning: 'Quá tốt rồi / Tuyệt vời!',
        exampleMeaningEn: 'Great!'
      },
      {
        id: 'hsk1-120',
        hanzi: '热',
        pinyin: 'rè',
        hanviet: 'Nhiệt',
        meaning: 'Nóng',
        meaningEn: 'hot',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 10,
        radical: '灬',
        exampleHanzi: '很热',
        examplePinyin: 'Hěn rè',
        exampleMeaning: 'Rất nóng',
        exampleMeaningEn: 'Very hot'
      },
      {
        id: 'hsk1-121',
        hanzi: '冷',
        pinyin: 'lěng',
        hanviet: 'Lãnh',
        meaning: 'Lạnh',
        meaningEn: 'cold',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 7,
        radical: '冫',
        exampleHanzi: '太冷了',
        examplePinyin: 'Tài lěng le',
        exampleMeaning: 'Lạnh quá',
        exampleMeaningEn: 'Too cold'
      },
      {
        id: 'hsk1-122',
        hanzi: '下雨',
        pinyin: 'xiàyǔ',
        hanviet: 'Hạ vũ',
        meaning: 'Trời mưa, mưa rơi',
        meaningEn: 'to rain',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 11,
        radical: '一',
        exampleHanzi: '下大雨',
        examplePinyin: 'Xià dà yǔ',
        exampleMeaning: 'Mưa to',
        exampleMeaningEn: 'Heavy rain'
      },
      {
        id: 'hsk1-123',
        hanzi: '小姐',
        pinyin: 'xiǎojiě',
        hanviet: 'Tiểu thư',
        meaning: 'Cô, tiểu thư (xưng hô phụ nữ trẻ)',
        meaningEn: 'Miss, young lady',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '小',
        exampleHanzi: '王小姐',
        examplePinyin: 'Wáng xiǎojiě',
        exampleMeaning: 'Cô Vương',
        exampleMeaningEn: 'Miss Wang'
      },
      {
        id: 'hsk1-124',
        hanzi: '来',
        pinyin: 'lái',
        hanviet: 'Lai',
        meaning: 'Đến, lại',
        meaningEn: 'to come',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 7,
        radical: '木',
        exampleHanzi: '来我家',
        examplePinyin: 'Lái wǒ jiā',
        exampleMeaning: 'Đến nhà tôi',
        exampleMeaningEn: 'Come to my home'
      },
      {
        id: 'hsk1-125',
        hanzi: '身体',
        pinyin: 'shēntǐ',
        hanviet: 'Thân thể',
        meaning: 'Thân thể, sức khỏe',
        meaningEn: 'body, health',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 14,
        radical: '身',
        exampleHanzi: '身体好',
        examplePinyin: 'Shēntǐ hǎo',
        exampleMeaning: 'Sức khỏe tốt',
        exampleMeaningEn: 'In good health'
      },
      {
        id: 'hsk1-126',
        hanzi: '水',
        pinyin: 'shuǐ',
        hanviet: 'Thủy',
        meaning: 'Nước',
        meaningEn: 'water',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 4,
        radical: '水',
        exampleHanzi: '喝水',
        examplePinyin: 'Hē shuǐ',
        exampleMeaning: 'Uống nước',
        exampleMeaningEn: 'Drink water'
      },
      {
        id: 'hsk1-127',
        hanzi: '些',
        pinyin: 'xiē',
        hanviet: 'Ta',
        meaning: 'Một ít, một số',
        meaningEn: 'some, a few',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 8,
        radical: '二',
        exampleHanzi: '这些',
        examplePinyin: 'Zhèxiē',
        exampleMeaning: 'Những cái này',
        exampleMeaningEn: 'These'
      }
    ],
    grammarPoints: [
      {
        title: 'Cấu trúc cảm thán: 太 + Tính từ + 了',
        titleEn: 'Exclamation with "太...了" (tài...le)',
        explanation: 'Biểu thị mức độ cao vượt trội hoặc cảm thán tán thưởng / phàn nàn: 太 + Tính từ + 了.',
        explanationEn: 'Expresses an extreme degree or exclamation: 太 + Adjective + 了 (too... / extremely...).',
        structure: '太 + Tính từ + 了 (Ví dụ: 太热了！, 太好了！)',
        examples: [
          { hanzi: '太热了！', pinyin: 'Tài rè le!', vi: 'Nóng quá!', en: 'Too hot!' },
          { hanzi: '太好了！', pinyin: 'Tài hǎo le!', vi: 'Tuyệt vời quá!', en: 'Awesome!' }
        ]
      },
      {
        title: 'Động từ năng nguyện "会" dự đoán tương lai',
        titleEn: 'Modal Verb "会" for Future Possibility',
        explanation: 'Khác với bài 6 (kỹ năng), chữ 会 ở đây mang nghĩa dự đoán: "sẽ" xảy ra hoặc không xảy ra việc gì.',
        explanationEn: 'Here "会" indicates probability or future occurrence: something "will" or "will not" happen.',
        structure: 'Chủ ngữ + 会 / 不会 + Động từ',
        examples: [
          { hanzi: '今天会下雨吗？', pinyin: 'Jīntiān huì xiàyǔ ma?', vi: 'Hôm nay trời có mưa không?', en: 'Will it rain today?' },
          { hanzi: '今天不会下雨。', pinyin: 'Jīntiān bú huì xiàyǔ.', vi: 'Hôm nay sẽ không mưa đâu.', en: 'It will not rain today.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q12-1',
        question: 'Để hỏi thăm "Thời tiết hôm nay thế nào?", câu nào chuẩn?',
        questionEn: 'How do you ask "How is the weather today?"',
        options: ['今天天气怎么样？', '今天天气什么？', '今天天气怎么？', '今天天气多少？'],
        correctIndex: 0,
        explanation: 'Hỏi tình trạng, tính chất sự vật dùng: 怎么样 (zěnmeyàng).'
      },
      {
        id: 'q12-2',
        question: 'Trong câu "今天不会下雨", từ "会" biểu thị điều gì?',
        questionEn: 'What does "会" express in "今天不会下雨"?',
        options: ['Kỹ năng qua học tập', 'Khả năng xảy ra trong tương lai (sẽ)', 'Lời mời lịch sự', 'Độ tuổi'],
        correctIndex: 1,
        explanation: '会 ở đây chỉ khả năng sự việc xảy ra trong tương lai: "sẽ".'
      }
    ]
  },
  {
    id: 'hsk1-lesson-13',
    courseId: 'hsk1',
    lessonNumber: 13,
    stage: 4,
    stageTitleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    stageTitleEn: 'Stage 4: Schedules, Weather & Plans',
    titleHanzi: '他在学做中国菜呢',
    titlePinyin: 'Tā zài xué zuò Zhōngguó cài ne',
    titleVi: 'Anh ấy đang học nấu món Trung Quốc đấy',
    titleEn: 'He is learning to cook Chinese food',
    radicals: ['日 (Bộ Nhật - Mặt trời/Thời gian)', '目 (Bộ Mục - Mắt/Nhìn)'],
    writingChars: ['见', '学', '电', '话'],
    audioFile: '/audio/hsk1/13-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Đang làm gì đấy?', file: '/audio/hsk1/13-1.mp3' },
      { name: 'Bài khóa 2: Xem tivi và xem phim', file: '/audio/hsk1/13-2.mp3' },
      { name: 'Bài khóa 3: Đọc số điện thoại & Gọi điện', file: '/audio/hsk1/13-3.mp3' }
    ],
    objectives: [
      'Làm chủ cấu trúc thì hiện tại tiếp diễn: 在...呢 (đang làm gì đó).',
      'Đọc chính xác dãy số điện thoại trong tiếng Trung (số 1 đọc là yāo).',
      'Sử dụng trợ từ ngữ khí 吧 (ba) để đưa ra lời gợi ý, đề xuất nhẹ nhàng.'
    ],
    objectivesEn: [
      'Master progressive aspect with 在...呢 (doing something right now).',
      'Read phone numbers accurately (digit 1 pronounced as yāo).',
      'Use modal particle 吧 (ba) for gentle suggestions.'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '喂，你在做什么呢？',
        pinyin: 'Wèi, nǐ zài zuò shénme ne?',
        vi: 'Alo, bạn đang làm gì đấy?',
        en: 'Hello, what are you doing?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我在看书呢。大卫在学做中国菜呢。',
        pinyin: 'Wǒ zài kàn shū ne. Dàwèi zài xué zuò Zhōngguó cài ne.',
        vi: 'Tôi đang đọc sách nè. David thì đang học nấu món Trung Quốc đấy.',
        en: 'I am reading a book. David is learning to cook Chinese food.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '昨天上午你在做什么呢？',
        pinyin: 'Zuótiān shàngwǔ nǐ zài zuò shénme ne?',
        vi: 'Sáng hôm qua bạn đang làm gì vậy?',
        en: 'What were you doing yesterday morning?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我在睡觉呢。我在家看电视呢。你喜欢看电视吗？',
        pinyin: 'Wǒ zài shuìjiào ne. Wǒ zài jiā kàn diànshì ne. Nǐ xǐhuan kàn diànshì ma?',
        vi: 'Tôi đang ngủ. Tôi ở nhà xem tivi. Bạn thích xem tivi không?',
        en: 'I was sleeping. I watched TV at home. Do you like watching TV?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '我不喜欢看电视，我喜欢看电影。',
        pinyin: 'Wǒ bù xǐhuan kàn diànshì, wǒ xǐhuan kàn diànyǐng.',
        vi: 'Tôi không thích xem tivi, tôi thích xem phim điện ảnh hơn.',
        en: 'I dislike watching TV, I like watching movies.'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '这是张老师的电话吗？我现在给她打电话。她在工作呢，下午打吧。',
        pinyin: 'Zhè shì Zhāng lǎoshī de diànhuà ma? Wǒ xiànzài gěi tā dǎ diànhuà. Tā zài gōngzuò ne, xiàwǔ dǎ ba.',
        vi: 'Đây có phải số điện thoại cô Trương không? Tôi gọi điện cho cô ấy ngay bây giờ. Cô ấy đang làm việc đấy, chiều hẵng gọi nhé.',
        en: "Is this Teacher Zhang's phone? I will call her now. She is working, let's call this afternoon."
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-128',
        hanzi: '喂',
        pinyin: 'wèi',
        hanviet: 'Ủy',
        meaning: 'Alo (lời chào khi nghe điện thoại)',
        meaningEn: 'hello (on phone), hey',
        level: 1,
        partOfSpeech: 'Thán từ',
        strokes: 12,
        radical: '口',
        exampleHanzi: '喂，请问是谁？',
        examplePinyin: 'Wèi, qǐngwèn shì shéi?',
        exampleMeaning: 'Alo, xin hỏi ai đấy ạ?',
        exampleMeaningEn: 'Hello, may I ask who is calling?'
      },
      {
        id: 'hsk1-129',
        hanzi: '在',
        pinyin: 'zài',
        hanviet: 'Tại',
        meaning: 'Đang (phó từ biểu thị hành động tiếp diễn)',
        meaningEn: 'in the process of, doing',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 6,
        radical: '土',
        exampleHanzi: '在看书',
        examplePinyin: 'Zài kàn shū',
        exampleMeaning: 'Đang đọc sách',
        exampleMeaningEn: 'Reading a book'
      },
      {
        id: 'hsk1-130',
        hanzi: '学',
        pinyin: 'xué',
        hanviet: 'Học',
        meaning: 'Học, nghiên cứu',
        meaningEn: 'to learn, to study',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 8,
        radical: '子',
        exampleHanzi: '学汉语',
        examplePinyin: 'Xué Hànyǔ',
        exampleMeaning: 'Học tiếng Trung',
        exampleMeaningEn: 'Study Chinese'
      },
      {
        id: 'hsk1-131',
        hanzi: '睡觉',
        pinyin: 'shuìjiào',
        hanviet: 'Thụy giác',
        meaning: 'Ngủ, đi ngủ',
        meaningEn: 'to sleep, to go to bed',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 20,
        radical: '目',
        exampleHanzi: '去睡觉',
        examplePinyin: 'Qù shuìjiào',
        exampleMeaning: 'Đi ngủ',
        exampleMeaningEn: 'Go to sleep'
      },
      {
        id: 'hsk1-132',
        hanzi: '电视',
        pinyin: 'diànshì',
        hanviet: 'Điện thị',
        meaning: 'Ti vi, truyền hình',
        meaningEn: 'television, TV',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 18,
        radical: '雨',
        exampleHanzi: '看电视',
        examplePinyin: 'Kàn diànshì',
        exampleMeaning: 'Xem tivi',
        exampleMeaningEn: 'Watch television'
      },
      {
        id: 'hsk1-133',
        hanzi: '喜欢',
        pinyin: 'xǐhuan',
        hanviet: 'Hỷ hoan',
        meaning: 'Thích, yêu mến',
        meaningEn: 'to like, to be fond of',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 18,
        radical: '口',
        exampleHanzi: '我很喜欢你。',
        examplePinyin: 'Wǒ hěn xǐhuan nǐ.',
        exampleMeaning: 'Tôi rất thích bạn.',
        exampleMeaningEn: 'I like you very much.'
      },
      {
        id: 'hsk1-134',
        hanzi: '给',
        pinyin: 'gěi',
        hanviet: 'Cấp',
        meaning: 'Cho, gửi cho (giới từ / động từ)',
        meaningEn: 'to give, to, for',
        level: 1,
        partOfSpeech: 'Giới từ / Động từ',
        strokes: 9,
        radical: '纟',
        exampleHanzi: '给他',
        examplePinyin: 'Gěi tā',
        exampleMeaning: 'Cho anh ấy',
        exampleMeaningEn: 'Give him'
      },
      {
        id: 'hsk1-135',
        hanzi: '打电话',
        pinyin: 'dǎ diànhuà',
        hanviet: 'Đả điện thoại',
        meaning: 'Gọi điện thoại',
        meaningEn: 'to make a phone call',
        level: 1,
        partOfSpeech: 'Cụm động từ',
        strokes: 21,
        radical: '扌',
        exampleHanzi: '打电话给他',
        examplePinyin: 'Dǎ diànhuà gěi tā',
        exampleMeaning: 'Gọi điện thoại cho anh ấy',
        exampleMeaningEn: 'Call him'
      },
      {
        id: 'hsk1-136',
        hanzi: '吧',
        pinyin: 'ba',
        hanviet: 'Ba',
        meaning: 'Nhé, đi, thôi (trợ từ gợi ý)',
        meaningEn: 'modal particle for suggestion',
        level: 1,
        partOfSpeech: 'Trợ từ',
        strokes: 7,
        radical: '口',
        exampleHanzi: '我们走吧！',
        examplePinyin: 'Wǒmen zǒu ba!',
        exampleMeaning: 'Chúng ta đi thôi!',
        exampleMeaningEn: "Let's go!"
      }
    ],
    grammarPoints: [
      {
        title: 'Cấu trúc tiếp diễn: 在...呢 (Đang làm gì đó)',
        titleEn: 'Progressive Aspect with "在...呢"',
        explanation: 'Biểu thị hành động đang diễn ra tại thời điểm nói. Có thể dùng "在 + ĐT", "在 + ĐT + 呢" hoặc chỉ "ĐT + 呢". Phủ định dùng: 没在 + Động từ.',
        explanationEn: 'Indicates an action in progress. Can be: 在 + Verb, 在 + Verb + 呢, or Verb + 呢. Negation: 没在 + Verb.',
        structure: 'Chủ ngữ + 在 + Động từ + (Tân ngữ) + 呢',
        examples: [
          { hanzi: '他在学做中国菜呢。', pinyin: 'Tā zài xué zuò Zhōngguó cài ne.', vi: 'Anh ấy đang học nấu món Trung Quốc đấy.', en: 'He is learning to cook Chinese food.' },
          { hanzi: '他没在看书。', pinyin: 'Tā méi zài kàn shū.', vi: 'Anh ấy không đang đọc sách.', en: 'He is not reading.' }
        ]
      },
      {
        title: 'Cấu trúc gọi điện: 给 + Ai đó + 打电话',
        titleEn: 'Phone Call Structure: 给 + Someone + 打电话',
        explanation: 'Giới từ 给 đứng trước người nhận cuộc gọi: A 给 B 打电话 (A gọi điện thoại cho B).',
        explanationEn: 'Preposition 给 introduces the receiver: Subject + 给 + Someone + 打电话.',
        structure: 'A + 给 + B + 打电话',
        examples: [
          { hanzi: '我现在给她打电话。', pinyin: 'Wǒ xiànzài gěi tā dǎ diànhuà.', vi: 'Bây giờ tôi gọi điện thoại cho cô ấy.', en: 'I am calling her now.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q13-1',
        question: 'Để diễn đạt "Tôi đang xem tivi", câu nào sau đây là chính xác?',
        questionEn: 'How to express "I am watching TV"?',
        options: ['我看电视呢。', '我在看电视呢。', '我在看电视。', 'Cả 3 câu trên đều đúng.'],
        correctIndex: 3,
        explanation: 'Cấu trúc hành động tiếp diễn có thể dùng "在...", "...呢", hoặc kết hợp "在...呢".'
      },
      {
        id: 'q13-2',
        question: 'Khi đọc số điện thoại trong tiếng Trung, số 1 thường được phát âm là gì?',
        questionEn: 'How is digit 1 usually pronounced in phone numbers in Chinese?',
        options: ['yī', 'yāo', 'yí', 'yì'],
        correctIndex: 1,
        explanation: 'Để tránh nhầm lẫn với số 7 (qī), số 1 trong dãy số điện thoại và phòng đọc là yāo.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-14',
    courseId: 'hsk1',
    lessonNumber: 14,
    stage: 4,
    stageTitleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    stageTitleEn: 'Stage 4: Schedules, Weather & Plans',
    titleHanzi: '她买了不少衣服',
    titlePinyin: 'Tā mǎi le bù shǎo yīfu',
    titleVi: 'Cô ấy đã mua không ít quần áo',
    titleEn: 'She bought quite a few clothes',
    radicals: ['月 (Bộ Nguyệt - Thịt/Cơ thể)', '扌 (Bộ Thủ - Bàn tay)'],
    writingChars: ['买', '衣', '车', '少'],
    audioFile: '/audio/hsk1/14-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Nhìn thấy ông Trương', file: '/audio/hsk1/14-1.mp3' },
      { name: 'Bài khóa 2: Mua rất nhiều quần áo', file: '/audio/hsk1/14-2.mp3' },
      { name: 'Bài khóa 3: Cô Lý đi nhà hàng', file: '/audio/hsk1/14-3.mp3' }
    ],
    objectives: [
      'Nắm vững trợ từ động thái 了 (le) biểu thị hành động đã hoàn thành: Động từ + 了 + Số lượng + Danh từ.',
      'Sử dụng mốc thời gian kết hợp ...后 (hòu - sau...) và ...前 (qián - trước...).',
      'Làm chủ phó từ tổng hợp 都 (dōu - đều).'
    ],
    objectivesEn: [
      'Master aspect particle 了 for completed actions: Verb + 了 + Quantity + Noun.',
      'Use time markers ...后 (after) and ...前 (before).',
      'Master the scope adverb 都 (dōu - all/both).'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你看见张先生了吗？',
        pinyin: 'Nǐ kànjiàn Zhāng xiānsheng le ma?',
        vi: 'Bạn có nhìn thấy ông Trương không?',
        en: 'Did you see Mr. Zhang?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '看见了，他去学校了。他40分钟后回来。',
        pinyin: 'Kànjiàn le, tā qù xuéxiào le. Tā sìshí fēnzhōng hòu huílái.',
        vi: 'Thấy rồi, ông ấy đi đến trường rồi. 40 phút nữa ông ấy sẽ về.',
        en: 'Yes, he went to school. He will be back in 40 minutes.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你买什么了？',
        pinyin: 'Nǐ mǎi shénme le?',
        vi: 'Bạn đã mua những gì thế?',
        en: 'What did you buy?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我买了一点儿苹果。你看，王小姐买了不少衣服。',
        pinyin: 'Wǒ mǎi le yìdiǎnr píngguǒ. Nǐ kàn, Wáng xiǎojiě mǎi le bù shǎo yīfu.',
        vi: 'Tôi đã mua một ít táo. Bạn nhìn kìa, cô Vương đã mua không ít quần áo đâu.',
        en: 'I bought some apples. Look, Miss Wang bought quite a lot of clothes.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '这些衣服都太漂亮了！',
        pinyin: 'Zhèxiē yīfu dōu tài piàoliang le!',
        vi: 'Mấy bộ đồ này bộ nào cũng đẹp quá chừng!',
        en: 'All of these clothes are so gorgeous!'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '是啊，她买了很多。',
        pinyin: 'Shì a, tā mǎi le hěn duō.',
        vi: 'Đúng vậy đó, cô ấy đã mua rất nhiều.',
        en: 'Indeed, she bought so many.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-137',
        hanzi: '东西',
        pinyin: 'dōngxi',
        hanviet: 'Đông tây',
        meaning: 'Đồ vật, thứ, đồ đạc',
        meaningEn: 'thing, stuff',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '木',
        exampleHanzi: '买东西',
        examplePinyin: 'Mǎi dōngxi',
        exampleMeaning: 'Mua đồ',
        exampleMeaningEn: 'Buy things'
      },
      {
        id: 'hsk1-138',
        hanzi: '一点儿',
        pinyin: 'yìdiǎnr',
        hanviet: 'Nhất điểm nhi',
        meaning: 'Một chút, một ít',
        meaningEn: 'a little bit, some',
        level: 1,
        partOfSpeech: 'Lượng từ',
        strokes: 13,
        radical: '一',
        exampleHanzi: '买一点儿水果',
        examplePinyin: 'Mǎi yìdiǎnr shuǐguǒ',
        exampleMeaning: 'Mua một ít trái cây',
        exampleMeaningEn: 'Buy some fruit'
      },
      {
        id: 'hsk1-139',
        hanzi: '苹果',
        pinyin: 'píngguǒ',
        hanviet: 'Bình quả',
        meaning: 'Quả táo',
        meaningEn: 'apple',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 16,
        radical: '艹',
        exampleHanzi: '红苹果',
        examplePinyin: 'Hóng píngguǒ',
        exampleMeaning: 'Quả táo đỏ',
        exampleMeaningEn: 'Red apple'
      },
      {
        id: 'hsk1-140',
        hanzi: '看见',
        pinyin: 'kànjiàn',
        hanviet: 'Khán kiến',
        meaning: 'Nhìn thấy, trông thấy',
        meaningEn: 'to see, to catch sight of',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 16,
        radical: '目',
        exampleHanzi: '我看见他了。',
        examplePinyin: 'Wǒ kànjiàn tā le.',
        exampleMeaning: 'Tôi nhìn thấy anh ấy rồi.',
        exampleMeaningEn: 'I saw him.'
      },
      {
        id: 'hsk1-141',
        hanzi: '先生',
        pinyin: 'xiānsheng',
        hanviet: 'Tiên sinh',
        meaning: 'Ông, ngài, chồng (kính xưng cho nam giới)',
        meaningEn: 'Mr., sir, gentleman',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '丿',
        exampleHanzi: '张先生',
        examplePinyin: 'Zhāng xiānsheng',
        exampleMeaning: 'Ông Trương',
        exampleMeaningEn: 'Mr. Zhang'
      },
      {
        id: 'hsk1-142',
        hanzi: '开',
        pinyin: 'kāi',
        hanviet: 'Khai',
        meaning: 'Lái (xe), mở',
        meaningEn: 'to drive, to open',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 4,
        radical: '廾',
        exampleHanzi: '开车',
        examplePinyin: 'Kāichē',
        exampleMeaning: 'Lái xe hơi',
        exampleMeaningEn: 'Drive a car'
      },
      {
        id: 'hsk1-143',
        hanzi: '车',
        pinyin: 'chē',
        hanviet: 'Xa',
        meaning: 'Xe cộ, xe hơi',
        meaningEn: 'vehicle, car',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 4,
        radical: '车',
        exampleHanzi: '坐车',
        examplePinyin: 'Zuò chē',
        exampleMeaning: 'Đi xe',
        exampleMeaningEn: 'Ride in a car'
      },
      {
        id: 'hsk1-144',
        hanzi: '回来',
        pinyin: 'huílái',
        hanviet: 'Hồi lai',
        meaning: 'Trở về, quay về đây',
        meaningEn: 'to come back, to return',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 13,
        radical: '囗',
        exampleHanzi: '快回来！',
        examplePinyin: 'Kuài huílái!',
        exampleMeaning: 'Mau về đi!',
        exampleMeaningEn: 'Come back quickly!'
      },
      {
        id: 'hsk1-145',
        hanzi: '分钟',
        pinyin: 'fēnzhōng',
        hanviet: 'Phân chung',
        meaning: 'Phút (khoảng thời lượng)',
        meaningEn: 'minute (duration)',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 13,
        radical: '刀',
        exampleHanzi: '40分钟',
        examplePinyin: 'Sìshí fēnzhōng',
        exampleMeaning: '40 phút',
        exampleMeaningEn: '40 minutes'
      },
      {
        id: 'hsk1-146',
        hanzi: '后',
        pinyin: 'hòu',
        hanviet: 'Hậu',
        meaning: 'Sau, phía sau, sau này',
        meaningEn: 'after, afterwards, later',
        level: 1,
        partOfSpeech: 'Danh từ chỉ thời gian',
        strokes: 6,
        radical: '口',
        exampleHanzi: '三天后',
        examplePinyin: 'Sān tiān hòu',
        exampleMeaning: '3 ngày sau',
        exampleMeaningEn: '3 days later'
      },
      {
        id: 'hsk1-147',
        hanzi: '衣服',
        pinyin: 'yīfu',
        hanviet: 'Y phục',
        meaning: 'Quần áo',
        meaningEn: 'clothes, clothing',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 14,
        radical: '衣',
        exampleHanzi: '漂亮的衣服',
        examplePinyin: 'Piàoliang de yīfu',
        exampleMeaning: 'Quần áo đẹp',
        exampleMeaningEn: 'Beautiful clothes'
      },
      {
        id: 'hsk1-148',
        hanzi: '漂亮',
        pinyin: 'piàoliang',
        hanviet: 'Phiêu lượng',
        meaning: 'Xinh đẹp, đẹp đẽ',
        meaningEn: 'pretty, beautiful',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 23,
        radical: '氵',
        exampleHanzi: '真漂亮！',
        examplePinyin: 'Zhēn piàoliang!',
        exampleMeaning: 'Thật xinh đẹp!',
        exampleMeaningEn: 'So pretty!'
      },
      {
        id: 'hsk1-149',
        hanzi: '少',
        pinyin: 'shǎo',
        hanviet: 'Thiểu',
        meaning: 'Ít',
        meaningEn: 'few, little',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 4,
        radical: '小',
        exampleHanzi: '不少',
        examplePinyin: 'Bù shǎo',
        exampleMeaning: 'Không ít / nhiều',
        exampleMeaningEn: 'Quite a few'
      },
      {
        id: 'hsk1-150',
        hanzi: '这些',
        pinyin: 'zhèxiē',
        hanviet: 'Giá ta',
        meaning: 'Những cái này',
        meaningEn: 'these',
        level: 1,
        partOfSpeech: 'Đại từ',
        strokes: 15,
        radical: '辶',
        exampleHanzi: '这些东西',
        examplePinyin: 'Zhèxiē dōngxi',
        exampleMeaning: 'Những món đồ này',
        exampleMeaningEn: 'These things'
      },
      {
        id: 'hsk1-151',
        hanzi: '都',
        pinyin: 'dōu',
        hanviet: 'Đô',
        meaning: 'Đều, tất cả (phó từ)',
        meaningEn: 'all, both',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 10,
        radical: '阝',
        exampleHanzi: '我们都是学生。',
        examplePinyin: 'Wǒmen dōu shì xuésheng.',
        exampleMeaning: 'Chúng tôi đều là học sinh.',
        exampleMeaningEn: 'We are all students.'
      }
    ],
    grammarPoints: [
      {
        title: 'Trợ từ động thái "了" (le) biểu thị hoàn thành',
        titleEn: 'Aspect Particle "了" for Completion',
        explanation: 'Khi đứng ngay sau động từ và phía sau có cụm số lượng định ngữ, "了" biểu thị hành động đã hoàn tất trong thực tế.',
        explanationEn: 'Placed directly after a verb followed by a quantified noun phrase, "了" indicates that an action has been completed.',
        structure: 'Chủ ngữ + Động từ + 了 + Số lượng / Định ngữ + Danh từ',
        examples: [
          { hanzi: '她买了不少衣服。', pinyin: 'Tā mǎi le bù shǎo yīfu.', vi: 'Cô ấy đã mua không ít quần áo.', en: 'She bought quite a few clothes.' },
          { hanzi: '我买了一点儿苹果。', pinyin: 'Wǒ mǎi le yìdiǎnr píngguǒ.', vi: 'Tôi đã mua một ít táo.', en: 'I bought some apples.' }
        ]
      },
      {
        title: 'Cấu trúc thời gian: ...后 (hòu - sau...)',
        titleEn: 'Time Expressions with "...后" (after)',
        explanation: 'Khoảng thời gian + 后 biểu thị sau bao lâu nữa một sự việc sẽ xảy ra (40分钟后 = sau 40 phút nữa).',
        explanationEn: 'Time period + 后 indicates after that amount of time.',
        structure: 'Thời gian + 后',
        examples: [
          { hanzi: '他40分钟后回来。', pinyin: 'Tā sìshí fēnzhōng hòu huílái.', vi: '40 phút sau anh ấy sẽ quay lại.', en: 'He will return in 40 minutes.' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q14-1',
        question: 'Chọn câu diễn đạt chuẩn: "Cô ấy đã mua 3 cuốn sách":',
        questionEn: 'Choose the correct sentence for "She bought 3 books":',
        options: ['她买三本书了。', '她买了三本书。', '她三本书买了。', '她买三本书。'],
        correctIndex: 1,
        explanation: 'Cấu trúc hoàn thành: Động từ + 了 + Cụm số lượng + Danh từ -> 她买了三本书.'
      },
      {
        id: 'q14-2',
        question: 'Cụm từ "不少" (bù shǎo) trong "买了不少衣服" có nghĩa là gì?',
        questionEn: 'What does "不少" mean?',
        options: ['Rất ít', 'Không ít (tức là khá nhiều)', 'Không đẹp', 'Rất đắt'],
        correctIndex: 1,
        explanation: '不少 = 不 + 少 = Không ít, mang hàm ý tích cực là khá nhiều.'
      }
    ]
  },
  {
    id: 'hsk1-lesson-15',
    courseId: 'hsk1',
    lessonNumber: 15,
    stage: 4,
    stageTitleVi: 'Chặng 4: Lịch trình, Thời tiết & Kế hoạch',
    stageTitleEn: 'Stage 4: Schedules, Weather & Plans',
    titleHanzi: '我是坐飞机来的',
    titlePinyin: 'Wǒ shì zuò fēijī lái de',
    titleVi: 'Tôi đến bằng máy bay',
    titleEn: 'I came by plane',
    radicals: ['艹 (Bộ Thảo - Cỏ cây)', '宀 (Bộ Miên - Mái nhà)'],
    writingChars: ['飞', '机', '年', '同'],
    audioFile: '/audio/hsk1/15-1.mp3',
    audioFiles: [
      { name: 'Bài khóa 1: Quen biết ở trường đại học', file: '/audio/hsk1/15-1.mp3' },
      { name: 'Bài khóa 2: Đi taxi đến khách sạn', file: '/audio/hsk1/15-2.mp3' },
      { name: 'Bài khóa 3: Đi máy bay đến Bắc Kinh', file: '/audio/hsk1/15-3.mp3' }
    ],
    objectives: [
      'Làm chủ cấu trúc nhấn mạnh kinh điển 是...的 (shì...de) để nhấn mạnh thời gian, địa điểm, phương thức của hành động đã xảy ra trong quá khứ.',
      'Học cách diễn đạt phương tiện giao thông: 坐飞机 (đi máy bay), 坐出租车 (đi taxi), 开车 (lái xe).',
      'Tổng kết toàn diện ngữ pháp và vốn từ vựng HSK 1, sẵn sàng cho kỳ thi và nâng bậc lên HSK 2.'
    ],
    objectivesEn: [
      'Master the "是...的" construction to emphasize time, location, or manner of past events.',
      'Express modes of transportation: 坐飞机 (take a plane), 坐出租车 (take a taxi), 开车 (drive a car).',
      'Consolidate HSK 1 curriculum and prepare for HSK 2 transition.'
    ],
    dialogue: [
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你和李小姐是什么时候认识的？',
        pinyin: 'Nǐ hé Lǐ xiǎojiě shì shénme shíhou rènshi de?',
        vi: 'Bạn và cô Lý quen biết nhau từ khi nào thế?',
        en: 'When did you and Miss Li get to know each other?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我们是2011年9月认识的。我们是在学校认识的，她是我大学同学。',
        pinyin: 'Wǒmen shì èr líng yī yī nián jiǔ yuè rènshi de. Wǒmen shì zài xuéxiào rènshi de, tā shì wǒ dàxué tóngxué.',
        vi: 'Chúng tôi quen nhau vào tháng 9 năm 2011. Chúng tôi quen nhau ở trường học, cô ấy là bạn học đại học của tôi.',
        en: 'We met in September 2011. We met at school; she is my university classmate.'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '你们是怎么来饭店的？',
        pinyin: 'Nǐmen shì zěnme lái fàndiàn de?',
        vi: 'Các bạn đến nhà hàng/khách sạn bằng cách nào thế?',
        en: 'How did you come to the restaurant?'
      },
      {
        speaker: '大卫 (David)',
        hanzi: '我们是坐出租车来的。李先生是和朋友一起开车来的。',
        pinyin: 'Wǒmen shì zuò chūzūchē lái de. Lǐ xiānsheng shì hé péngyou yìqǐ kāichē lái de.',
        vi: 'Chúng tôi đi taxi đến đây. Ông Lý thì cùng bạn bè lái xe đến.',
        en: 'We came by taxi. Mr. Li drove here with friends.'
      },
      {
        speaker: '张先生 (Ông Trương)',
        hanzi: '很高兴认识你！李小姐。听张先生说，你是坐飞机来北京的？',
        pinyin: 'Hěn gāoxìng rènshi nǐ! Lǐ xiǎojiě. Tīng Zhāng xiānsheng shuō, nǐ shì zuò fēijī lái Běijīng de?',
        vi: 'Rất vui được quen biết bạn, cô Lý. Nghe ông Trương nói bạn đi máy bay đến Bắc Kinh phải không?',
        en: 'Nice to meet you, Miss Li! I heard Mr. Zhang say you came to Beijing by plane?'
      },
      {
        speaker: '李月 (Lý Nguyệt)',
        hanzi: '是的，我是坐飞机来的。',
        pinyin: 'Shì de, wǒ shì zuò fēijī lái de.',
        vi: 'Vâng đúng vậy, tôi đi máy bay đến đấy.',
        en: 'Yes, I came by plane.'
      }
    ],
    vocabularies: [
      {
        id: 'hsk1-152',
        hanzi: '认识',
        pinyin: 'rènshi',
        hanviet: 'Nhận thức',
        meaning: 'Quen biết, nhận biết',
        meaningEn: 'to know, to recognize',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 14,
        radical: '讠',
        exampleHanzi: '很高兴认识你！',
        examplePinyin: 'Hěn gāoxìng rènshi nǐ!',
        exampleMeaning: 'Rất vui được làm quen với bạn!',
        exampleMeaningEn: 'Nice to meet you!'
      },
      {
        id: 'hsk1-153',
        hanzi: '年',
        pinyin: 'nián',
        hanviet: 'Niên',
        meaning: 'Năm',
        meaningEn: 'year',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 6,
        radical: '干',
        exampleHanzi: '2026年',
        examplePinyin: 'Èr líng èr liù nián',
        exampleMeaning: 'Năm 2026',
        exampleMeaningEn: 'Year 2026'
      },
      {
        id: 'hsk1-154',
        hanzi: '大学',
        pinyin: 'dàxué',
        hanviet: 'Đại học',
        meaning: 'Trường đại học',
        meaningEn: 'university, college',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 11,
        radical: '大',
        exampleHanzi: '北京大学',
        examplePinyin: 'Běijīng Dàxué',
        exampleMeaning: 'Đại học Bắc Kinh',
        exampleMeaningEn: 'Peking University'
      },
      {
        id: 'hsk1-155',
        hanzi: '饭店',
        pinyin: 'fàndiàn',
        hanviet: 'Phạn điếm',
        meaning: 'Khách sạn, nhà hàng ăn uống',
        meaningEn: 'restaurant, hotel',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 16,
        radical: '饣',
        exampleHanzi: '去饭店吃饭',
        examplePinyin: 'Qù fàndiàn chīfàn',
        exampleMeaning: 'Đến nhà hàng dùng bữa',
        exampleMeaningEn: 'Go to the restaurant'
      },
      {
        id: 'hsk1-156',
        hanzi: '出租车',
        pinyin: 'chūzūchē',
        hanviet: 'Xuất tô xa',
        meaning: 'Xe taxi',
        meaningEn: 'taxi, cab',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 21,
        radical: '凵',
        exampleHanzi: '坐出租车',
        examplePinyin: 'Zuò chūzūchē',
        exampleMeaning: 'Đi taxi',
        exampleMeaningEn: 'Take a taxi'
      },
      {
        id: 'hsk1-157',
        hanzi: '一起',
        pinyin: 'yìqǐ',
        hanviet: 'Nhất khởi',
        meaning: 'Cùng nhau, chung',
        meaningEn: 'together',
        level: 1,
        partOfSpeech: 'Phó từ',
        strokes: 11,
        radical: '一',
        exampleHanzi: '一起去',
        examplePinyin: 'Yìqǐ qù',
        exampleMeaning: 'Cùng đi',
        exampleMeaningEn: 'Go together'
      },
      {
        id: 'hsk1-158',
        hanzi: '高兴',
        pinyin: 'gāoxìng',
        hanviet: 'Cao hứng',
        meaning: 'Vui mừng, phấn khởi',
        meaningEn: 'happy, glad, pleased',
        level: 1,
        partOfSpeech: 'Tính từ',
        strokes: 16,
        radical: '高',
        exampleHanzi: '很高兴',
        examplePinyin: 'Hěn gāoxìng',
        exampleMeaning: 'Rất vui',
        exampleMeaningEn: 'Very glad'
      },
      {
        id: 'hsk1-159',
        hanzi: '听',
        pinyin: 'tīng',
        hanviet: 'Thính',
        meaning: 'Nghe',
        meaningEn: 'to hear, to listen',
        level: 1,
        partOfSpeech: 'Động từ',
        strokes: 7,
        radical: '口',
        exampleHanzi: '听音乐',
        examplePinyin: 'Tīng yīnyuè',
        exampleMeaning: 'Nghe nhạc',
        exampleMeaningEn: 'Listen to music'
      },
      {
        id: 'hsk1-160',
        hanzi: '飞机',
        pinyin: 'fēijī',
        hanviet: 'Phi cơ',
        meaning: 'Máy bay',
        meaningEn: 'airplane, plane',
        level: 1,
        partOfSpeech: 'Danh từ',
        strokes: 9,
        radical: '飞',
        exampleHanzi: '坐飞机',
        examplePinyin: 'Zuò fēijī',
        exampleMeaning: 'Đi máy bay',
        exampleMeaningEn: 'Take a flight'
      }
    ],
    grammarPoints: [
      {
        title: 'Cấu trúc nhấn mạnh: 是...的 (shì...de)',
        titleEn: 'Emphatic Construction "是...的" for Past Events',
        explanation: 'Khi hành động đã xảy ra trong quá khứ và cả hai người đều đã biết sự việc, cấu trúc "是...的" được dùng để nhấn mạnh THỜI GIAN, ĐỊA ĐIỂM, hoặc PHƯƠNG THỨC của hành động. Thể phủ định là "不是...的".',
        explanationEn: 'When an event has already occurred, "是...的" emphasizes the time, location, or manner of the action. Negation: "不是...的".',
        structure: 'Chủ ngữ + 是 + [Thời gian / Nơi chốn / Phương thức] + Động từ + 的',
        examples: [
          { hanzi: '我是坐飞机来的。', pinyin: 'Wǒ shì zuò fēijī lái de.', vi: 'Tôi là đi máy bay đến (nhấn mạnh phương tiện).', en: 'I came by plane.' },
          { hanzi: '我们是在学校认识的。', pinyin: 'Wǒmen shì zài xuéxiào rènshi de.', vi: 'Chúng tôi quen nhau ở trường (nhấn mạnh địa điểm).', en: 'We met at school.' },
          { hanzi: '我们不是坐出租车来的。', pinyin: 'Wǒmen bú shì zuò chūzūchē lái de.', vi: 'Chúng tôi không phải đi taxi đến (phủ định phương tiện).', en: 'We did not come by taxi.' }
        ]
      },
      {
        title: 'Thành ngữ xã giao: 很高兴认识你！',
        titleEn: 'Social Etiquette: 很高兴认识你！',
        explanation: 'Câu chào hỏi tiêu chuẩn khi lần đầu gặp gỡ và làm quen với người khác ("Rất vui được quen biết bạn!"). Đáp lại: 认识你我也很高兴！',
        explanationEn: 'Standard greeting when being introduced: "Nice to meet you!" Response: "Nice to meet you too!"',
        structure: '很高兴认识你！ <-> 认识你我也很高兴！',
        examples: [
          { hanzi: '很高兴认识你！', pinyin: 'Hěn gāoxìng rènshi nǐ!', vi: 'Rất vui được quen bạn!', en: 'Nice to meet you!' },
          { hanzi: '认识你我也很高兴！', pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng!', vi: 'Quen bạn tôi cũng rất vui!', en: 'Nice to meet you too!' }
        ]
      }
    ],
    quizData: [
      {
        id: 'q15-1',
        question: 'Câu "我是坐飞机来的" dùng cấu trúc "是...的" nhằm nhấn mạnh thông tin gì?',
        questionEn: 'What does "我是坐飞机来的" emphasize using "是...的"?',
        options: ['Thời gian đến', 'Phương tiện / Cách thức đến', 'Địa điểm đến', 'Người cùng đi'],
        correctIndex: 1,
        explanation: '坐飞机 (đi bằng máy bay) là phương thức/phương tiện di chuyển được nhấn mạnh.'
      },
      {
        id: 'q15-2',
        question: 'Khi ai đó chào bạn: "很高兴认识你！", bạn nên đáp lại thế nào?',
        questionEn: 'How should you respond to "很高兴认识你！"?',
        options: ['认识你我也很高兴！', '对不起，没关系。', '不客气！', '你好吗？'],
        correctIndex: 0,
        explanation: 'Đáp lại lời chào làm quen: 认识你我也很高兴！ (Quen bạn tôi cũng rất vui!).'
      }
    ]
  }
];

// Load existing courses.json
const coursesFilePath = path.join(__dirname, '..', 'src', 'data', 'courses.json');
const rawData = fs.readFileSync(coursesFilePath, 'utf8');
const courseJson = JSON.parse(rawData);

// Filter out old HSK1 lessons and keep non-hsk1 lessons
const nonHsk1Lessons = courseJson.lessons.filter(l => l.courseId !== 'hsk1');

// Combine all 15 HSK1 lessons + non-HSK1 lessons
courseJson.lessons = [...hsk1Lessons, ...nonHsk1Lessons];

// Save back to courses.json
fs.writeFileSync(coursesFilePath, JSON.stringify(courseJson, null, 2), 'utf8');
console.log('Successfully updated courses.json with 15 complete HSK 1 lessons!');
console.log('Total lessons in courses.json:', courseJson.lessons.length);
