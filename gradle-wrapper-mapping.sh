#!/usr/bin/env bash
# CI Gradle wrapper mapping script.
# Some CI configurations allow overriding the gradle wrapper command path with a script.
# This script defers to the safe wrapper that skips when no native wrapper is generated.
set -euo pipefail
bash "$(dirname "$0")/scripts/ci-gradle-wrapper.sh" "$@"
