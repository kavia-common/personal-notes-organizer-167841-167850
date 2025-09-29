# Build/CI Guidance

This project uses Expo (managed). Native Android Gradle wrapper exists only after prebuild.

Preferred CI steps:
- make ci-prepare
- make android-check
- make gradle  (runs a safe Gradle wrapper shim; skips when no wrapper)

Or directly:
- bash ./scripts/prepare-gradle.sh
- bash ./scripts/android-check.sh
- bash ./scripts/ci-gradle-wrapper.sh help

To generate a real native Android project:
- cd notes_frontend && npm run prebuild:android
