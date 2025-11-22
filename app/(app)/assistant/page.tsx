// src/app/(app)/assistant/page.tsx
'use client';

import AppShell from '@/components/layout/app-shell';
import { useState } from 'react';

export default function AssistantPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);

    const res = await fetch('/api/assistant/query', {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setAnswer(data.answer ?? 'No answer');
    setLoading(false);
  }

  return (
    <AppShell>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Everflow AI Assistant</h1>
          <p className="text-sm text-neutral-400">
            Ask questions about your candidates, pipelines and tenants.
          </p>
        </div>

        <form onSubmit={ask} className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='e.g. "Show me the top 10 highest fit candidates" or "Which tenant has the most offers pending?"'
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm min-h-[90px]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Thinking…' : 'Ask Everflow AI'}
          </button>
        </form>

        {answer && (
          <div className="rounded-2xl border border-neutral-800 p-4 text-sm whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </div>
    </AppShell>
  );
}
