#!/usr/bin/env bash
# All-in-one CI script: install deps, prebuild android, run guarded assembleDebug
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"

echo "[build-android-ci] Installing dependencies..."
cd "$APP_DIR"
npm ci || npm install

echo "[build-android-ci] Prebuilding Android..."
npm run prebuild:android

echo "[build-android-ci] Running guarded assembleDebug..."
cd "$ROOT_DIR"
./scripts/ci-gradle-wrapper.sh :assembleDebug
