#!/usr/bin/env bash
# CI profile to ensure gradle wrappers are available and executable.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Ensure permissions
bash "$ROOT_DIR/.ci/init-permissions.sh" || true

if [ ! -x "$ROOT_DIR/gradlew" ] && [ -f "$ROOT_DIR/gradlew.shim" ]; then
  echo "[.ci/profile] ./gradlew not executable or missing; using shim."
  ln -sf "./gradlew.shim" "$ROOT_DIR/gradlew" || true
  chmod +x "$ROOT_DIR/gradlew" || true
fi

echo "[.ci/profile] CI profile applied."
