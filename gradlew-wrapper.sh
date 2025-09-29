#!/usr/bin/env bash
# Generic wrapper intended for CI config as a drop-in for './gradlew <task>'
# Usage: ./gradlew-wrapper.sh check
set -euo pipefail

TASK="${1:-check}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[gradlew-wrapper] Native present. Delegating to: $REAL ${TASK}"
  chmod +x "$REAL"
  exec "$REAL" "${TASK}"
else
  echo "[gradlew-wrapper] No android/gradlew found. Skipping Gradle task: ${TASK}"
  echo "[gradlew-wrapper] To enable native builds, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
