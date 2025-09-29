#!/usr/bin/env bash
# CI helper to optionally prebuild Android and run a guarded Gradle task.
# Usage:
#   scripts/ci-prebuild-and-gradle.sh assembleDebug
#   scripts/ci-prebuild-and-gradle.sh :app:bundleRelease
set -euo pipefail

TASK="${1:-assembleDebug}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"

echo "[ci-prebuild-and-gradle] Installing deps if needed..."
cd "$APP_DIR"
if command -v npm >/dev/null 2>&1; then
  npm ci || npm install
fi

echo "[ci-prebuild-and-gradle] Running Expo prebuild for Android..."
npm run prebuild:android

echo "[ci-prebuild-and-gradle] Invoking guarded gradle task: $TASK"
cd "$ROOT_DIR"
./scripts/ci-gradle-wrapper.sh ":${TASK}"
