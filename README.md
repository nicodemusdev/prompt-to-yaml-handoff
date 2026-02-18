# Prompt to YAML

Convert plain text prompts into structured agent handoffs with YAML frontmatter.

## Credibility

- **Gostlight:** [gostlight.ai](https://gostlight.ai) — multi-agent memory and handoff systems
- **ClawHub:** [clawhub.io](https://clawhub.io) — skill downloads for AI agents

## Usage

1. Open `index.html` in a browser (or deploy to any static host).
2. Paste your plain text prompt.
3. Optionally override agent, priority, type in the Overrides section.
4. Optionally enable "Use LLM" for improved extraction (requires backend).
5. Optionally enable "Add prompt repetition" (duplicates body with "Let me repeat that:").
6. Click Convert.
7. Copy the output.

## Rule-based conversion

The tool infers from your text:

- **agent-to:** marketer (social, content, tweet, campaign), builder (build, implement, code), coordinator (review, orchestrate)
- **deliverable:** discussion-ready (review, discuss), handoff (default)
- **context_files:** Extracted from phrases like "handoff about X" or "in your handoffs"

## Settings

Customize agent roles in the Settings section. Comma-separated list stored in localStorage. First role is default "from".

## Deployment

### Rule-based only (static)

No build, no backend. Works on any host (Netlify, Vercel, S3, Caddy).

```bash
# Local
open index.html
# or
python3 -m http.server 8080
# then http://localhost:8080/
```

### With LLM (Vercel)

1. Deploy to Vercel.
2. Set environment variables in Project Settings:
   - `OPENROUTER_API_KEY` — primary (meta-llama/llama-3.3-70b-instruct:free). [openrouter.ai/keys](https://openrouter.ai/keys)
   - `GROQ_API_KEY` — fallback when OpenRouter hits rate limits. [console.groq.com](https://console.groq.com)
3. Primary: OpenRouter (200 req/day free). Fallback: Groq (faster, no rate limits).

## LLM mode

When "Use LLM" is enabled, the client calls `POST /api/convert` with `{ prompt }`. The serverless function adds the API key and forwards to OpenRouter. Users never see or provide a key. If the request fails, the tool falls back to rule-based conversion.
