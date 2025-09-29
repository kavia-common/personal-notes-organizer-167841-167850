#!/usr/bin/env bash
set -euo pipefail

# This script guards against running Gradle when the native Android project has not been generated.
# It succeeds (no-op) if ./android/gradlew doesn't exist, so CI can continue without hard failing.
# If you need native checks, run `npm run prebuild:android` before calling Gradle.

if [ -f "./android/gradlew" ]; then
  echo "Gradle wrapper found. You can run Android checks."
  exit 0
else
  echo "Gradle wrapper not found (expected in ./android/gradlew). Skipping Android checks."
  exit 0
fi
