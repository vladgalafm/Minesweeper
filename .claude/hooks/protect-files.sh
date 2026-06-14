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
