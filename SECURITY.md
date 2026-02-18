# Security

## Data flow

When "Use LLM" is enabled, your prompt is sent to OpenRouter and/or Groq. These providers may log or retain requests. **Do not paste sensitive data** (passwords, PII, confidential content) when using LLM mode.

## Risks

| Risk | Description |
|------|-------------|
| **Third-party logging** | User prompts are sent to external APIs. Check [OpenRouter](https://openrouter.ai/docs) and [Groq](https://groq.com) privacy policies. |
| **Prompt injection** | Malicious input could steer the LLM to return wrong or exfiltrated data. The tool does not sanitize input. |
| **Agent abuse** | If an agent uses this tool on your behalf, it can send your natural language to external APIs. A compromised agent could misuse this. |

## Mitigations

- **Sensitive content:** Use rules-only mode (uncheck "Use LLM"). No data leaves your machine.
- **Self-host:** Deploy to your own Vercel project with your own API keys. Use a self-hosted or privacy-focused model if you control the backend.
- **Input limits:** Consider truncating very long prompts before sending.
- **Audit:** Log or monitor what gets sent to the API in production.

## Reporting

If you find a vulnerability, report it privately to the maintainer.
