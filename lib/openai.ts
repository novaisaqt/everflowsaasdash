// src/lib/openai.ts
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function callOpenAI(messages: ChatMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('OpenAI error:', text);
    throw new Error('Failed to call OpenAI');
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('No content from OpenAI');
  }
  return content as string;
}
