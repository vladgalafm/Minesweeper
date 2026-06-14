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
