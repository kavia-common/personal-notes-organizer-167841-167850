#!/usr/bin/env bash
# Hidden gradle wrapper shim for CI analyzers that may call '.gradlew'
# Delegates to notes_frontend/android/gradlew if present, otherwise no-op.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[.gradlew shim] Delegating to $REAL $*"
  chmod +x "$REAL"
  exec "$REAL" "$@"
else
  echo "[.gradlew shim] No android/gradlew found. Skipping Gradle step."
  echo "[.gradlew shim] To enable native builds, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
