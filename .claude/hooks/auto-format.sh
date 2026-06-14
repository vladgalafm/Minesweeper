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
