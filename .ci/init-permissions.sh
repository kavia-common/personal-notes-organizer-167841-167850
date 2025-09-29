#!/usr/bin/env bash
# Ensure execution permissions for guard scripts in CI environments.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

chmod +x "$ROOT_DIR"/gradlew || true
chmod +x "$ROOT_DIR"/gradlew.sh || true
chmod +x "$ROOT_DIR"/gradlew-ci || true
chmod +x "$ROOT_DIR"/gradlew-check || true
chmod +x "$ROOT_DIR"/gradle || true
chmod +x "$ROOT_DIR"/gradlew-wrapper.sh || true
chmod +x "$ROOT_DIR"/gradle-check.sh || true
chmod +x "$ROOT_DIR"/gradlew-args-shim.sh || true
chmod +x "$ROOT_DIR"/scripts/ci-gradle-wrapper.sh || true
chmod +x "$ROOT_DIR"/scripts/ci-prebuild-and-gradle.sh || true
chmod +x "$ROOT_DIR"/build-android-ci.sh || true
chmod +x "$ROOT_DIR"/.ci/gradlew || true
chmod +x "$ROOT_DIR"/.gitlab-ci/gradlew || true
chmod +x "$ROOT_DIR"/.azure/gradlew || true
chmod +x "$ROOT_DIR"/notes_frontend/android/gradlew || true

echo "[ci/init-permissions] Executable bits set for gradle guard scripts."
