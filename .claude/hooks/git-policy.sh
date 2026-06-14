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
