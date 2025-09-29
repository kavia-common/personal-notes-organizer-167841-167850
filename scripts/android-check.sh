#!/usr/bin/env bash
# Check whether Android native project exists for Expo-managed app.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
ANDROID_DIR="$APP_DIR/android"
GRADLEW="$ANDROID_DIR/gradlew"

if [ -d "$ANDROID_DIR" ] && [ -f "$GRADLEW" ]; then
  echo "ANDROID_PRESENT=1"
  exit 0
else
  echo "ANDROID_PRESENT=0"
  exit 0
fi
