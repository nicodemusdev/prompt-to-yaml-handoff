# Sample Handoffs

Example prompts and their converted YAML outputs.

---

## Example 1: Options request

**Input:**
```
I would like to find creative ways to make money on the internet, please provide me 3 options I can start today to do that.
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

# I would like to find creative ways to make money on the internet

**Action:** I would like to find creative ways to make money on the internet, please provide me 3 options I can start today to do that.
**Purpose:** User wants 3 monetization options they can start soon.
**Next step:** Research and list 3 options with concrete first steps for each.
```

---

## Example 2: Review for social content

**Input:**
```
I just put a new handoff about llm prompting in your handoffs, can you review so we can discuss it for social content ideas?
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
context_files: ["handoffs/to-marketer/llm-prompting.md"]
tags: []
---

# llm prompting

**Action:** I just put a new handoff about llm prompting in your handoffs, can you review so we can discuss it for social content ideas?
**Purpose:** Prepare for discussion.
**Next step:** Read the material, extract key angles for discussion.
```

---

## Example 3: Structured input

**Input:**
```
Action: Configure dual GitHub identities for personal and gostlight.
Purpose: Use personal account for posting, contribute to gostlight.
Next step: Create SSH keys and update ~/.ssh/config.
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

# Configure dual GitHub identities for personal and gostlight

**Action:** Action: Configure dual GitHub identities for personal and gostlight.
**Purpose:** Use personal account for posting, contribute to gostlight.
**Next step:** Create SSH keys and update ~/.ssh/config.
```
