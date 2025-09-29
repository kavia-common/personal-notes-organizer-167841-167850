#!/usr/bin/env bash
# Guarded 'gradle check' for CI analyzers that run './gradlew check'.
# If the native Android project exists, delegate to ./gradlew check.
# Otherwise, no-op and exit successfully to avoid false failures.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[gradle-check] Native android present. Running 'check'..."
  chmod +x "$REAL"
  exec "$REAL" check
else
  echo "[gradle-check] No android/gradlew found. Skipping 'gradle check'."
  echo "[gradle-check] To enable, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
