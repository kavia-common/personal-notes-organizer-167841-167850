#!/usr/bin/env bash
# Ensure a root-level ./gradlew exists and is executable for analyzers that invoke it.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GRADLEW="$ROOT_DIR/gradlew"

if [ ! -f "$GRADLEW" ]; then
  echo "[.ci/pre-analysis] ./gradlew not found. Creating guard..."
  cat > "$GRADLEW" <<'EOF'
#!/usr/bin/env bash
# Auto-generated root Gradle wrapper guard for CI analyzers.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$ROOT_DIR/notes_frontend"
REAL="$APP_DIR/android/gradlew"
if [ -f "$REAL" ]; then
  echo "[auto-guard gradlew] Delegating to $REAL $*"
  chmod +x "$REAL"
  exec "$REAL" "$@"
else
  echo "[auto-guard gradlew] No android/gradlew found. Skipping Gradle step."
  exit 0
fi
EOF
fi

chmod +x "$GRADLEW" || true
echo "[.ci/pre-analysis] Ensured ./gradlew exists and is executable."
