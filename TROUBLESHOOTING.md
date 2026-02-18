# Troubleshooting

## Vercel deployment

### "LLM not configured"

The API keys are not available to the serverless function. Vercel does **not** read `.env.local` from your repo — you must set env vars in the dashboard.

1. Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add:
   - `OPENROUTER_API_KEY` — [openrouter.ai/keys](https://openrouter.ai/keys)
   - `GROQ_API_KEY` — [console.groq.com](https://console.groq.com)
3. Enable for **Production**, **Preview**, and **Development**
4. **Redeploy** — env vars only apply to new deployments

### Adding env vars via Vercel CLI

```bash
vercel env add OPENROUTER_API_KEY
vercel env add GROQ_API_KEY
```

Then redeploy: `vercel --prod`

### Local dev with Vercel

For `vercel dev`, env vars come from the linked project, not `.env.local`. Pull them:

```bash
vercel env pull .env.local
```

Restart `vercel dev` after pulling.

### Redeploy after env changes

- **Dashboard:** Deployments → ⋯ on latest → Redeploy
- **CLI:** `vercel --prod`
- **Git:** Push a commit (if repo is linked)

---

## LLM errors

### Raw LLM response shows `openRouterErr` and `details`

OpenRouter was tried first and failed; Groq was tried and also failed. Check:

- **401:** Invalid API key — verify the key in Vercel env vars
- **429:** Rate limit — wait or use the other provider
- **response_format:** Some free models don't support `json_object`; the API falls back to parsing

### Rule-based mode works, LLM doesn't

Disable "Use LLM" to use rules only. Or fix the API keys (see above).

---

