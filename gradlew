#!/usr/bin/env bash
# Root Gradle Wrapper Guard for Expo-managed project
# Delegates to notes_frontend/android/gradlew if present; otherwise, no-ops.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[root gradlew] Delegating to $REAL $*"
  chmod +x "$REAL"
  exec "$REAL" "$@"
else
  echo "[root gradlew] No android/gradlew found. Skipping Gradle step."
  echo "[root gradlew] To enable native builds, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
