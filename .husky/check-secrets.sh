#!/usr/bin/env bash

# Check for potential secrets in staged files
# Excludes legitimate config files and looks for actual secret values

FILES=$(git diff --cached --name-only | \
  grep -v ".env.example" | \
  grep -v "validation.ts" | \
  grep -v "package.json" | \
  grep -v "check-secrets.sh")

if [ -z "$FILES" ]; then
  exit 0
fi

# Look for patterns that indicate actual secrets (not just variable names)
# Patterns: api_key="longvalue", secret_key='longvalue', etc.
if echo "$FILES" | xargs grep -E "(sk_live|pk_live|api[_-]key|secret[_-]key|access[_-]token)[[:space:]]*[:=][[:space:]]*[\"'][A-Za-z0-9+/=]{20,}" 2>/dev/null; then
  echo ""
  echo "⛔ Potential secrets detected in the files above."
  echo "Please review and ensure no actual API keys or secrets are being committed."
  echo ""
  exit 1
fi

exit 0
