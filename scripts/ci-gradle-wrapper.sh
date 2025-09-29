#!/usr/bin/env bash
# A CI-safe wrapper to guard Gradle invocations in an Expo-managed project.
# It prevents failures when android/ is not yet generated via `expo prebuild`.
# Usage examples:
#   scripts/ci-gradle-wrapper.sh :noop
#   scripts/ci-gradle-wrapper.sh :assembleDebug
#   scripts/ci-gradle-wrapper.sh :app:bundleRelease

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
ANDROID_DIR="$APP_DIR/android"
GRADLEW="$ANDROID_DIR/gradlew"

CMD="${1:-:help}"

echo "[ci-gradle-wrapper] Command: ${CMD}"
echo "[ci-gradle-wrapper] Working directory: ${APP_DIR}"

if [ ! -d "$ANDROID_DIR" ] || [ ! -f "$GRADLEW" ]; then
  echo "[ci-gradle-wrapper] Android project or Gradle wrapper not found."
  echo "[ci-gradle-wrapper] This is expected for Expo-managed apps before prebuild."
  echo "[ci-gradle-wrapper] Skipping Gradle step. To enable native builds in CI:"
  echo "  1) cd notes_frontend && npm run prebuild:android"
  echo "  2) then call this wrapper again."
  exit 0
fi

cd "$ANDROID_DIR"

# Ensure wrapper is executable
chmod +x "$GRADLEW"

# Run requested task
echo "[ci-gradle-wrapper] Running ./gradlew ${CMD}"
./gradlew ${CMD}
