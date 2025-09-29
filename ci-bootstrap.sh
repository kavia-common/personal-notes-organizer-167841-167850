#!/usr/bin/env bash
# CI bootstrap: ensure guarded gradlew exists and permissions are correct.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure exec permissions for guards
bash "$ROOT_DIR/.ci/init-permissions.sh" || true

# Ensure a guarded ./gradlew exists
bash "$ROOT_DIR/ensure-gradlew.sh" || true

# Echo hint for next steps
echo "[ci-bootstrap] Guarded ./gradlew available. Use './gradle-check.sh' or './scripts/ci-gradle-wrapper.sh :assembleDebug'."
