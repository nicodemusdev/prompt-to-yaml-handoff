# Do This Now — Dual GitHub Setup

Execute in order. Steps 1–3 must be done before pushing.

---

## 1. Add SSH public keys to GitHub

**Personal (nicodemusdev):**
```bash
cat ~/.ssh/id_ed25519_personal.pub
```
Copy output → GitHub.com (nicodemusdev) → Settings → SSH and GPG keys → New SSH key

**Gostlight (gostlightai):**
```bash
cat ~/.ssh/id_ed25519_gostlight.pub
```
Copy output → GitHub.com (gostlightai org or your gostlight account) → Settings → SSH and GPG keys → New SSH key

---

## 2. Test both identities

```bash
ssh -T git@github-personal
# Expected: "Hi nicodemusdev! You've successfully authenticated..."

ssh -T git@github-gostlight
# Expected: "Hi <username>! You've successfully authenticated..."
```

---

## 3. Create prompt-to-yaml-handoff repo on GitHub

On GitHub.com as **nicodemusdev**: New repository → name `prompt-to-yaml-handoff` → Private → Create (no README, no .gitignore).

---

## 4. Configure prompt-to-yaml-handoff and push

```bash
cd ~/prompt-to-yaml-handoff

# Set remote (uses github-personal host)
git remote add origin git@github-personal:nicodemusdev/prompt-to-yaml-handoff.git 2>/dev/null || git remote set-url origin git@github-personal:nicodemusdev/prompt-to-yaml-handoff.git

# Set your identity for this repo
git config user.name "Jordan"
git config user.email "YOUR_PERSONAL_EMAIL@example.com"

# Validate
git remote -v
git config user.name
git config user.email

# Commit and push
git add -A
git commit -m "v1.0 launch"
git push -u origin main
```

---

## 5. Configure prompt-to-yaml (gostlight) for future pushes

```bash
cd ~/tools/prompt-to-yaml

# Remote already set to github-gostlight
git config user.name "Jordan"
git config user.email "YOUR_GOSTLIGHT_EMAIL@example.com"

# Validate
git remote -v
git push --dry-run origin main
```

---

## Validation checklist (before any push)

```bash
# 1. Verify remote uses correct host
git remote -v

# 2. Verify local config
git config user.name
git config user.email

# 3. Test SSH for this repo's host
ssh -T git@github-personal   # for personal repos
ssh -T git@github-gostlight  # for gostlight repos

# 4. Dry-run push
git push --dry-run origin main
```
