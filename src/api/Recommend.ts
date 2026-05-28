import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { season, style, occasion } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `당신은 전문 패션 스타일리스트입니다. 다음 조건에 맞는 코디를 추천해주세요:
- 계절: ${season || '미지정'}
- 스타일: ${style || '미지정'}
- 상황/TPO: ${occasion || '미지정'}

다음 형식으로 답해주세요:
1. 전체 코디 콘셉트 (2문장)
2. 추천 아이템 4가지 (이모지와 함께, 각 아이템 한 줄)
3. 스타일링 팁 1가지

친근하고 실용적으로 작성해주세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '추천을 불러오지 못했어요.';
    return res.status(200).json({ result: text });
  } catch (error) {
    return res.status(500).json({ error: '추천을 불러오지 못했습니다.' });
  }
}