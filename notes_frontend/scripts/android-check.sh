#!/usr/bin/env bash
set -euo pipefail

# Android check wrapper for CI
# - If android/gradlew exists, run a lightweight Gradle task to validate.
# - If not present (Expo managed before prebuild), skip gracefully.

if [ -f "./android/gradlew" ]; then
  echo "[android-check] gradlew found. Running :help to validate wrapper..."
  (cd android && ./gradlew help)
  echo "[android-check] Gradle wrapper is functional."
  exit 0
else
  echo "[android-check] No android/gradlew. Skipping native check (managed workflow prebuild not executed)."
  exit 0
fi
