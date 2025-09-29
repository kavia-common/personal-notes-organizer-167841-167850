#!/usr/bin/env bash
# Unified entrypoint for CI to perform a guarded Gradle 'check'.
# Use this instead of calling './gradlew check' directly.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[run-gradle-check] Native android present. Running 'check'..."
  chmod +x "$REAL"
  exec "$REAL" check
else
  echo "[run-gradle-check] No android/gradlew found. Skipping 'gradle check'."
  echo "[run-gradle-check] To enable, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
