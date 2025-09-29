#!/usr/bin/env bash
set -euo pipefail

# Ensure gradle wrapper shims are executable if present
if [ -f "./gradlew" ]; then
  chmod +x ./gradlew || true
fi

if [ -f "./notes_frontend/android/gradlew" ]; then
  chmod +x ./notes_frontend/android/gradlew || true
fi

echo "[prepare-gradle] Wrapper permissions ensured (if present)."
exit 0
