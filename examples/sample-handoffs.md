# Sample Handoffs

Example prompts and their converted YAML outputs.

---

## Example 1: Research + options (coordinator)

**Input:**
```
Hey, I've been thinking about adding a simple referral program to the product—something where existing users can invite friends and both get a small reward. I don't want anything complicated, just a basic flow. Can you look at what other small SaaS products do, list 3 approaches that would fit our stack, and for each one give a rough idea of effort and what we'd need to build first? I'd like to go over this with the team next week.
```

**Output:**
```yaml
---
type: handoff
status: pending
agent-from: user
agent-to: coordinator
priority: medium
deliverable: handoff
context_files: []
tags: []
---

# Hey, I've been thinking about adding a simple referral program to the product

**Action:** Hey, I've been thinking about adding a simple referral program to the product—something where existing users can invite friends and both get a small reward. I don't want anything complicated, just a basic flow. Can you look at what other small SaaS products do, list 3 approaches that would fit our stack, and for each one give a rough idea of effort and what we'd need to build first? I'd like to go over this with the team next week.
**Purpose:** User wants 3 actionable options they can start soon.
**Next step:** Research and list 3 options with concrete first steps for each.

**Summary:** Referral program options for small SaaS — research 3 approaches with effort estimates. Next: list 3 options with concrete first steps for each.
```

---

## Example 2: Review + social content (marketer)

**Input:**
```
I dropped a new handoff in the to-marketer folder about the prompt repetition paper—the one that shows repeating the prompt helps non-reasoning models. Can you read through it and pull out 3–5 angles we could use for tweets or short posts? I want to talk through which ones feel strongest before we schedule anything.
```

**Output:**
```yaml
---
type: handoff
status: pending
agent-from: user
agent-to: marketer
priority: medium
deliverable: discussion-ready
context_files: ["handoffs/to-marketer/prompt-repetition-paper.md"]
tags: []
---

# prompt repetition paper

**Action:** I dropped a new handoff in the to-marketer folder about the prompt repetition paper—the one that shows repeating the prompt helps non-reasoning models. Can you read through it and pull out 3–5 angles we could use for tweets or short posts? I want to talk through which ones feel strongest before we schedule anything.
**Purpose:** Prepare for discussion.
**Next step:** Read the material, extract key angles for discussion.

**Summary:** Prompt repetition paper handoff — extract 3–5 social content angles. Next: read the material, extract key angles for discussion.
```

---

## Example 3: Build + constraints (builder)

**Input:**
```
We need a small API endpoint that takes a URL and returns whether it's reachable or not—basically a health-check style thing. It should work for both HTTP and HTTPS, handle timeouts cleanly, and return a simple JSON with status and latency. No auth for now, we'll add that later. Can you sketch the route and the core logic?
```

**Output:**
```yaml
---
type: handoff
status: pending
agent-from: user
agent-to: builder
priority: medium
deliverable: handoff
context_files: []
tags: []
---

# We need a small API endpoint that takes a URL and returns whether it's reachable or not

**Action:** We need a small API endpoint that takes a URL and returns whether it's reachable or not—basically a health-check style thing. It should work for both HTTP and HTTPS, handle timeouts cleanly, and return a simple JSON with status and latency. No auth for now, we'll add that later. Can you sketch the route and the core logic?
**Purpose:** User wants this done.
**Next step:** Review and respond.

**Summary:** URL health-check API — HTTP/HTTPS, timeouts, JSON status+latency. Next: sketch the route and core logic.
```
