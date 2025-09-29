#!/usr/bin/env bash
# Conventional CI entrypoint that prepares the environment for tools that will call ./gradlew.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$ROOT_DIR/ci-bootstrap.sh"
