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
