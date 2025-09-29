#!/usr/bin/env bash
# Kotlin-script-named shim for CI tools expecting gradlew.kts.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$DIR/gradlew" "$@"
