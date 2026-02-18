/**
 * Serverless function: POST /api/convert
 * Accepts { prompt } and returns structured extraction via LLM.
 * Primary: OpenRouter meta-llama/llama-3.3-70b-instruct:free
 * Fallback: Groq llama-3.3-70b-versatile (on rate limit or failure)
 */
const EXTRACTION_PROMPT = `You extract structured task data from messages. Return JSON only.

Roles: builder = code/software. coordinator = research, plan, options, break down. marketer = content, campaigns, social.

Example: "I want 3 ways to make money online I can start today"
→ {"agent_to":"coordinator","title":"Online Money-Making Options","task_summary":"Research 3 monetization options","purpose":"User wants actionable options they can start immediately","next_step":"Research and list 3 options with concrete first steps for each","context_files":[],"deliverable_type":"handoff"}

Example: "Review this handoff for social content ideas"
→ {"agent_to":"marketer","title":"Social Content Review","task_summary":"Review handoff for content angles","purpose":"Prepare for social content discussion","next_step":"Read the handoff, extract 3-5 content angles","context_files":["handoff"],"deliverable_type":"discussion-ready"}

Now extract from this message. Return valid JSON only:
`;

function buildRefinementPrompt(prompt, ruleExtracted) {
  const a = ruleExtracted?.action ?? '';
  const p = ruleExtracted?.purpose ?? '';
  const n = ruleExtracted?.next_step ?? ruleExtracted?.nextStep ?? '';
  return `We pre-extracted from the user's message. Refine or confirm. Return JSON only.

Roles: builder = code/software. coordinator = research, plan, options. marketer = content, campaigns, social.

Pre-extracted:
- action: ${a}
- purpose: ${p}
- next_step: ${n}

User said:
${prompt}

Refine or confirm. Return valid JSON: {"agent_to":"...","title":"...","task_summary":"...","purpose":"...","next_step":"...","context_files":[],"deliverable_type":"handoff"|"discussion-ready"}`;
}

async function callOpenRouter(content, key, origin) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': origin || 'https://localhost',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [{ role: 'user', content }],
      max_tokens: 2000,
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  });
  return { response, provider: 'openrouter' };
}

async function callGroq(content, key) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content }],
      max_tokens: 2000,
      temperature: 0.1,
      response_format: { type: 'json_object' },
    }),
  });
  return { response, provider: 'groq' };
}

function parseContent(content) {
  const json = content.replace(/```json?\s*/g, '').replace(/```\s*$/g, '').trim();
  return JSON.parse(json);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  if (!openRouterKey && !groqKey) {
    return res.status(503).json({ error: 'LLM not configured' });
  }

  const { prompt, ruleExtracted } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  const content = ruleExtracted
    ? buildRefinementPrompt(prompt, ruleExtracted)
    : EXTRACTION_PROMPT + prompt.trim();

  const origin = req.headers.origin || 'https://localhost';

  // Try OpenRouter first
  if (openRouterKey) {
    try {
      const { response } = await callOpenRouter(content, openRouterKey, origin);
      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (text) {
          const extracted = parseContent(text);
          return res.status(200).json(extracted);
        }
      }
      // 429 or other failure — fall through to Groq
    } catch (_) {
      // Fall through to Groq
    }
  }

  // Fallback to Groq
  if (groqKey) {
    try {
      const { response } = await callGroq(content, groqKey);
      if (!response.ok) {
        const err = await response.text();
        return res.status(502).json({ error: 'LLM request failed', details: err });
      }
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) {
        return res.status(502).json({ error: 'Empty LLM response' });
      }
      const extracted = parseContent(text);
      return res.status(200).json(extracted);
    } catch (e) {
      return res.status(500).json({ error: 'Conversion failed', details: e.message });
    }
  }

  return res.status(503).json({ error: 'LLM not configured' });
}
