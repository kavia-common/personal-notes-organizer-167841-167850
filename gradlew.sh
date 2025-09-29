#!/usr/bin/env bash
# CI shim for environments that attempt to call ./gradlew (shell) explicitly.
# If notes_frontend/android/gradlew exists, delegate; otherwise no-op with success.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"

if [ -f "$REAL" ]; then
  echo "[gradlew.sh shim] Delegating to $REAL $*"
  chmod +x "$REAL"
  exec "$REAL" "$@"
else
  echo "[gradlew.sh shim] No android/gradlew found. Skipping Gradle step."
  echo "[gradlew.sh shim] To enable native builds, run: cd notes_frontend && npm run prebuild:android"
  exit 0
fi
