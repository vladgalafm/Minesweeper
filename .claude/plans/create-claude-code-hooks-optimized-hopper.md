# Plan: Claude Code Hooks for Minesweeper

## Context

The project has no Claude Code hooks yet. Five hooks will be added to enforce formatting, protect sensitive files, scan for secrets, re-inject session context after compaction, and prevent force pushes. Hook patterns are adapted from the course reference at `~/Public/courses/agentic-engineering-course/modules/5-claude-code-extended/5.4-hooks/`.

**Implementation order matters:** Create all hook scripts first, update `settings.json` last. The new settings only take effect in the next session, so all writes can happen safely in this one.

---

## Files to Create/Modify

| Action | Path |
|--------|------|
| CREATE | `.claude/hooks/auto-format.sh` |
| CREATE | `.claude/hooks/protect-files.sh` |
| CREATE | `.claude/hooks/secrets-scan.py` |
| CREATE | `.claude/hooks/session-context.sh` |
| CREATE | `.claude/hooks/git-policy.sh` |
| MODIFY | `.claude/settings.json` |

All `.sh` and `.py` scripts must be `chmod +x`.

---

## Hook 1: `auto-format.sh` (PostToolUse, async)

**Event:** `PostToolUse` | **Matcher:** `Edit|Write` | **Async:** `true`

Async because formatting is a side-effect, not a gate — the write already happened.

```bash
#!/usr/bin/env bash
set -euo pipefail

INPUT="$(cat)"
FILE_PATH="$(printf '%s' "$INPUT" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(d.get("tool_input", {}).get("file_path", ""))
except Exception:
    print("")
')"

[ -z "$FILE_PATH" ] && exit 0
[ ! -f "$FILE_PATH" ] && exit 0

case "$FILE_PATH" in
  *.js|*.jsx)
    cd "${CLAUDE_PROJECT_DIR:-.}" && npx eslint --fix "$FILE_PATH" >/dev/null 2>&1 || true
    ;;
  *.css)
    cd "${CLAUDE_PROJECT_DIR:-.}" && npx stylelint --fix "$FILE_PATH" >/dev/null 2>&1 || true
    ;;
esac

exit 0
```

`cd` to project root first so ESLint/Stylelint discover `.eslintrc.js` / `.stylelintrc.js` regardless of hook cwd. `|| true` ensures no blocking on pre-existing lint errors.

---

## Hook 2: `session-context.sh` (SessionStart, compact)

**Event:** `SessionStart` | **Matcher:** `compact`

All stdout is injected into Claude's context by the harness — re-injects critical conventions lost after `/compact`.

```bash
#!/usr/bin/env bash
set -euo pipefail

cat <<'EOF'
[session-context — re-injected after compact]

Project: React PWA Minesweeper (plain JS, Create React App, GitHub Pages)

CRITICAL CONVENTIONS — never violate these:

1. Grid indexing: cells[col][row]  (x = col, y = row — intentionally reversed from typical [row][col])

2. LocalStorage keys: _hv-m-g, _hv-m-h etc. are intentionally obfuscated.
   All keys are STORAGE_KEY_* constants in src/constants.js.
   Do NOT rename or change their string values — breaks saved data for existing users.

3. Difficulty strings: "9x9", "16x16", "30x16" encode cols×rows (NOT rows×cols).

4. Infinity serialization: bestTime is Infinity in JS but serializes to null in JSON.
   A custom reviver in App.js restores it on load. Preserve this pattern.

5. Mine placement: deferred to first click with 2-cell exclusion zone.
   First reveal is always safe.

Architecture:
- All game state/logic in src/App.js — no Redux/Context.
- Components in src/components/ are presentational.
- Magic numbers, storage keys, timing constants → src/constants.js.
- 4-space indentation; functional components + hooks only.
EOF

echo ""
echo "Recent commits:"
git -C "${CLAUDE_PROJECT_DIR:-.}" log --oneline -5 2>/dev/null || true

exit 0
```

---

## Hook 3: `protect-files.sh` (PreToolUse, blocking)

**Event:** `PreToolUse` | **Matcher:** `Edit|Write` | **Blocking** (exit 2)

Adds protection beyond the `deny` permission rules for files not already covered: `.npmrc`, `package-lock.json`, `.claude/settings.json`, `.claude/settings.local.json`.

```bash
#!/usr/bin/env bash
set -euo pipefail

INPUT="$(cat)"
FILE_PATH="$(printf '%s' "$INPUT" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(d.get("tool_input", {}).get("file_path", ""))
except Exception:
    print("")
')"

[ -z "$FILE_PATH" ] && exit 0

case "$FILE_PATH" in
  *.env|.env|*/.env|*.env.*|*/.env.*)
    echo "BLOCKED: .env files may contain secrets. Use environment variables instead." >&2
    exit 2
    ;;
  *.pem|*.key)
    echo "BLOCKED: private key files must not be edited via Claude." >&2
    exit 2
    ;;
  */.npmrc|.npmrc)
    echo "BLOCKED: .npmrc enforces save-exact=true for dependency pinning. Edit manually if needed." >&2
    exit 2
    ;;
  */package-lock.json|package-lock.json)
    echo "BLOCKED: package-lock.json must only be modified via npm install, not hand-edited." >&2
    exit 2
    ;;
  */.claude/settings.json|.claude/settings.json)
    echo "BLOCKED: .claude/settings.json must be edited manually to prevent circular hook issues." >&2
    exit 2
    ;;
  */.claude/settings.local.json|.claude/settings.local.json)
    echo "BLOCKED: .claude/settings.local.json must be edited manually." >&2
    exit 2
    ;;
esac

exit 0
```

---

## Hook 4: `secrets-scan.py` (PreToolUse, blocking)

**Event:** `PreToolUse` | **Matcher:** `Edit|Write|MultiEdit` | **Blocking** (exit 2)

Adapted from recipe-3; simplified to JS-project-relevant patterns only.

```python
#!/usr/bin/env python3
import json
import re
import sys

PATTERNS = [
    (r"sk-[A-Za-z0-9]{20,}", "OpenAI/Anthropic-style API key (sk-)"),
    (r"ghp_[A-Za-z0-9]{36}", "GitHub personal access token (ghp_)"),
    (r"AIza[0-9A-Za-z\-_]{35}", "Google API key (AIza)"),
    (r"AKIA[0-9A-Z]{16}", "AWS access key ID (AKIA)"),
    (r"eyJhbGciOi[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+", "JWT token"),
    (r"-----BEGIN (RSA |EC |OPENSSH |DSA |)PRIVATE KEY-----", "Private key block"),
    (r"\binnerHTML\s*=", "innerHTML assignment — XSS risk (use textContent or React state)"),
    (r"\bdocument\.write\s*\(", "document.write() — DOM XSS risk"),
    (r"\beval\s*\(", "eval() — code injection risk"),
    (r"password\s*[:=]\s*['\"][^'\"]{4,}['\"]", "Hardcoded password literal"),
]


def extract_content(payload: dict) -> str:
    ti = payload.get("tool_input", {})
    parts = [
        ti.get("content", ""),
        ti.get("new_string", ""),
        ti.get("old_string", ""),
    ]
    for edit in ti.get("edits", []) or []:
        parts.append(edit.get("new_string", ""))
        parts.append(edit.get("old_string", ""))
    return "\n".join(p for p in parts if isinstance(p, str))


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    content = extract_content(payload)
    if not content:
        return 0

    findings = []
    for pat, label in PATTERNS:
        if re.search(pat, content):
            findings.append(f"  · {label}")

    if findings:
        print("SECURITY WARNING (secrets-scan):", file=sys.stderr)
        print("\n".join(findings), file=sys.stderr)
        print(
            "\nMove secrets to environment variables. "
            "Use textContent or React state instead of innerHTML/document.write.",
            file=sys.stderr,
        )
        return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
```

---

## Hook 5: `git-policy.sh` (PreToolUse, blocking)

**Event:** `PreToolUse` | **Matcher:** `Bash` | **If:** `Bash(git push --force *)` | **Blocking** (exit 2)

The `if` field prevents the hook process from spawning on every Bash call — zero overhead for normal commands. Extends the existing deny rules to also cover `--force-with-lease` and bare force pushes without an explicit branch name.

```bash
#!/usr/bin/env bash
set -euo pipefail

INPUT="$(cat)"
CMD="$(printf '%s' "$INPUT" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(d.get("tool_input", {}).get("command", ""))
except Exception:
    print("")
')"

[ -z "$CMD" ] && exit 0

if echo "$CMD" | grep -qE 'git\s+push\s+(--force|-f|--force-with-lease)'; then
    echo "BLOCKED: force-push is not allowed (git-policy)." >&2
    echo "This project commits directly to master via regular pushes." >&2
    echo "If you need to amend history, do it manually after review." >&2
    exit 2
fi

exit 0
```

---

## `settings.json` — Hooks Section to Add

Insert after the closing `}` of `"env"` on line 93 (add a comma, then the `"hooks"` key):

```json
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/auto-format.sh",
            "async": true
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      },
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/secrets-scan.py"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(git push --force *)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/git-policy.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/session-context.sh"
          }
        ]
      }
    ]
  }
```

---

## Verification

```bash
# 1. Files exist and are executable
ls -la .claude/hooks/

# 2. JSON is valid
python3 -c "import json; json.load(open('.claude/settings.json'))" && echo "Valid"

# 3. protect-files — should exit 2
echo '{"tool_name":"Edit","tool_input":{"file_path":".npmrc"}}' | bash .claude/hooks/protect-files.sh; echo "exit: $?"

# 4. protect-files — should exit 0
echo '{"tool_name":"Edit","tool_input":{"file_path":"src/App.js"}}' | bash .claude/hooks/protect-files.sh; echo "exit: $?"

# 5. secrets-scan — should exit 2
echo '{"tool_name":"Write","tool_input":{"content":"const k = \"sk-abc123xyz789012345678901234\";"}}' | python3 .claude/hooks/secrets-scan.py; echo "exit: $?"

# 6. secrets-scan — should exit 0
echo '{"tool_name":"Write","tool_input":{"content":"const cells = [];"}}' | python3 .claude/hooks/secrets-scan.py; echo "exit: $?"

# 7. git-policy — should exit 2
echo '{"tool_name":"Bash","tool_input":{"command":"git push --force origin master"}}' | bash .claude/hooks/git-policy.sh; echo "exit: $?"

# 8. session-context — stdout should contain critical conventions
echo '{}' | bash .claude/hooks/session-context.sh
```
