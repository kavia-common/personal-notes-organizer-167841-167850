#!/usr/bin/env bash
# notes_frontend-local gradlew shim forwarding to ./gradlew in this directory.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$DIR/gradlew" "$@"
