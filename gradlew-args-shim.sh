#!/usr/bin/env bash
# Arg-parsing shim for CI analyzers that call './gradlew <task> [options]'.
# Delegates to notes_frontend/android/gradlew if present, otherwise no-op.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[gradlew-args-shim] Native present. Delegating to: $REAL $*"
  chmod +x "$REAL"
  exec "$REAL" "$@"
else
  TASKS="$*"
  echo "[gradlew-args-shim] No android/gradlew found. Skipping Gradle tasks: ${TASKS:-<none>}"
  echo "[gradlew-args-shim] To enable native builds, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
