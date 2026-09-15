'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Volume2, Sparkles, Bot, User, Utensils, Compass, ShoppingBag, Smile, AlertCircle, Lightbulb } from 'lucide-react';
import { AudioButton } from '@/components/common/AudioButton';
import { useSpeech } from '@/hooks/useSpeech';

interface Message {
  sender: 'ai' | 'user';
  hanzi: string;
  pinyin?: string;
  vi?: string;
  correction?: string | null;
  tip?: string | null;
}

export default function TutorPage() {
  const { speak } = useSpeech();
  const [selectedScenario, setSelectedScenario] = useState('greeting');
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      hanzi: '你好！很高兴认识你。你是学生吗？',
      pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Nǐ shì xuésheng ma?',
      vi: 'Chào bạn! Rất vui được quen biết bạn. Bạn là học sinh phải không?',
    },
  ]);
  const [showHelper, setShowHelper] = useState(true);

  const scenarios = [
    { id: 'greeting', label: 'Chào hỏi và làm quen', icon: Smile, prompt: '你好！' },
    { id: 'order_food', label: 'Gọi món ở nhà hàng', icon: Utensils, prompt: '服务员，我想点菜。' },
    { id: 'shopping', label: 'Mua sắm và trả giá', icon: ShoppingBag, prompt: '这个多少钱？' },
    { id: 'directions', label: 'Hỏi đường đi', icon: Compass, prompt: '请问，地铁站在哪儿？' },
  ];

  const suggestedReplies = [
    { hanzi: '我是学生，我正在学中文。', pinyin: 'Wǒ shì xuésheng, wǒ zhèngzài xué Zhōngwén.' },
    { hanzi: '你喜欢喝中国茶吗？', pinyin: 'Nǐ xǐhuan hē Zhōngguó chá ma?' },
    { hanzi: '今天天气很好。', pinyin: 'Jīntiān tiānqì hěn hǎo.' },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = { sender: 'user', hanzi: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, scenario: selectedScenario }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        const aiMsg: Message = {
          sender: 'ai',
          hanzi: data.reply.hanzi,
          pinyin: data.reply.pinyin,
          vi: data.reply.vi,
          correction: data.reply.correction,
          tip: data.reply.tip,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speak(data.reply.hanzi, 0.9);
      }
    } catch {
      // fallback message
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          hanzi: '你说得很好！我们继续练习吧。',
          pinyin: 'Nǐ shuō de hěn hǎo! Wǒmen jìxù liànxí ba.',
          vi: 'Bạn nói rất tốt! Chúng ta tiếp tục luyện tập nhé.',
        },
      ]);
    }
  };

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    if (scenarioId === 'order_food') {
      setMessages([
        {
          sender: 'ai',
          hanzi: '欢迎光临！请问您几位？想吃点什么？',
          pinyin: 'Huānyíng guānglín! Qǐngwèn nín jǐ wèi? Xiǎng chī diǎnr shénme?',
          vi: 'Kính chào quý khách! Xin hỏi quý khách đi mấy người? Muốn ăn món gì ạ?',
        },
      ]);
    } else if (scenarioId === 'shopping') {
      setMessages([
        {
          sender: 'ai',
          hanzi: '你好，你想买什么？这件衣服今天打八折。',
          pinyin: 'Nǐ hǎo, nǐ xiǎng mǎi shénme? Zhè jiàn yīfu jīntiān dǎ bā zhé.',
          vi: 'Chào bạn, bạn muốn mua gì? Chiếc áo này hôm nay giảm giá 20%.',
        },
      ]);
    } else if (scenarioId === 'directions') {
      setMessages([
        {
          sender: 'ai',
          hanzi: '你好，请问你需要帮忙吗？你要去哪儿？',
          pinyin: 'Nǐ hǎo, qǐngwèn nǐ xūyào bāngmáng ma? Nǐ yào qù nǎr?',
          vi: 'Chào bạn, bạn cần giúp đỡ không? Bạn muốn đi đâu?',
        },
      ]);
    } else {
      setMessages([
        {
          sender: 'ai',
          hanzi: '你好！很高兴认识你。你是学生吗？',
          pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ. Nǐ shì xuésheng ma?',
          vi: 'Chào bạn! Rất vui được quen biết bạn. Bạn là học sinh phải không?',
        },
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-crimson">AI Speaking Partner</span>
          <span className="badge badge-emerald">Khẩu ngữ thực chiến</span>
          <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={11} /> Gemini 2.5 Flash
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Đối thoại khẩu ngữ <span className="gradient-text">cùng AI Tutor</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
          Luyện phản xạ giao tiếp theo các tình huống đời sống hàng ngày, kèm phiên âm Pinyin và bản dịch trợ giúp.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
        }}
      >
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isSelected = selectedScenario === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleScenarioChange(sc.id)}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                cursor: 'pointer',
                border: isSelected ? '1px solid var(--accent-crimson)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'var(--accent-crimson-light)' : 'var(--bg-card)',
              }}
            >
              <Icon size={18} color={isSelected ? 'var(--accent-crimson)' : 'var(--text-secondary)'} />
              <span style={{ fontSize: '0.85rem', fontWeight: isSelected ? '700' : '500', color: isSelected ? 'var(--accent-crimson)' : 'var(--text-primary)' }}>
                {sc.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Chat Window */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '520px',
          padding: '20px',
        }}
      >
        {/* Messages List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingRight: '6px',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              {msg.sender === 'ai' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={20} />
                </div>
              )}

              <div
                style={{
                  background:
                    msg.sender === 'user'
                      ? 'linear-gradient(135deg, #e11d48, #be123c)'
                      : 'var(--bg-tertiary)',
                  border: msg.sender === 'ai' ? '1px solid var(--border-subtle)' : 'none',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: '600', fontFamily: 'var(--font-hanzi)' }}>
                  {msg.hanzi}
                </div>

                {msg.pinyin && (
                  <div style={{ fontSize: '0.82rem', color: msg.sender === 'user' ? '#fecdd3' : 'var(--accent-crimson)', marginTop: '4px' }}>
                    {msg.pinyin}
                  </div>
                )}

                {msg.vi && (
                  <div style={{ fontSize: '0.8rem', color: msg.sender === 'user' ? '#fecdd3' : 'var(--text-secondary)', marginTop: '4px', borderTop: '1px solid var(--border-subtle)', paddingTop: '4px' }}>
                    {msg.vi}
                  </div>
                )}

                {msg.correction && (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'var(--accent-gold-light)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      fontSize: '0.8rem',
                      color: '#b45309',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      lineHeight: 1.4,
                    }}
                  >
                    <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Góp ý ngữ pháp:</strong> {msg.correction}
                    </div>
                  </div>
                )}

                {msg.tip && (
                  <div
                    style={{
                      marginTop: '6px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontSize: '0.8rem',
                      color: '#047857',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      lineHeight: 1.4,
                    }}
                  >
                    <Lightbulb size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Mẹo giao tiếp:</strong> {msg.tip}
                    </div>
                  </div>
                )}

                {msg.sender === 'ai' && (
                  <div style={{ marginTop: '6px' }}>
                    <AudioButton text={msg.hanzi} size={14} label="Nghe đọc" />
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(225, 29, 72, 0.15)',
                    border: '1px solid rgba(225, 29, 72, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-crimson)',
                    flexShrink: 0,
                  }}
                >
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggested Replies */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '10px 0', borderTop: '1px solid var(--border-subtle)' }}>
          {suggestedReplies.map((reply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(reply.hanzi)}
              style={{
                flexShrink: 0,
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <div>{reply.hanzi}</div>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nhập câu trả lời bằng chữ Hán hoặc Pinyin (ví dụ: 你好, 我是学生)..."
            style={{
              flex: 1,
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />

          <button
            type="button"
            onClick={() => handleSend()}
            className="btn-primary"
            style={{ padding: '0 20px' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
