#!/usr/bin/env bash
# Drop-in replacement for ./gradlew in CI for Expo-managed projects.
# Usage examples:
#   bash ./run-gradle.sh help
#   bash ./run-gradle.sh assembleDebug
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "${SCRIPT_DIR}/scripts/ci-gradle-wrapper.sh" "$@"
