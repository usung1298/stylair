import { useState } from 'react';

export function useAIRecommend() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const recommend = async (season: string, style: string, occasion: string) => {
    setLoading(true);
    setResult('');
    const prompt = `당신은 패션 스타일리스트입니다. 다음 조건에 맞는 코디를 추천해주세요:
- 계절: ${season || '미지정'}
- 스타일: ${style || '미지정'}
- 상황/TPO: ${occasion || '미지정'}

다음 형식으로 답해주세요:
1. 전체 코디 콘셉트 (2문장)
2. 추천 아이템 4가지 (이모지와 함께)
3. 스타일링 팁 1가지`;

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find((c: { type: string }) => c.type === 'text')?.text ?? '추천을 불러오지 못했어요.';
      setResult(text);
    } catch {
      setResult('AI 추천을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, recommend };
}