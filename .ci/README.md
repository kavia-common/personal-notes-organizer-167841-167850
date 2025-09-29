# CI Usage

This project is Expo-managed (no native android/ until prebuild). Use guarded CI shims instead of calling `./gradlew` directly:

- ./gradlew-check — guarded equivalent of `./gradlew check`
- ./gradle-check.sh — guarded check helper
- ./gradlew-ci — preferred guarded wrapper for arbitrary tasks
- ./scripts/ci-gradle-wrapper.sh :assembleDebug — assemble via guard
- make prebuild-android && make gradle — prebuild then assemble

If your CI hardcodes `./gradlew`, update it to use `./gradlew-ci` or `./gradlew-check`. If you need real native builds, prebuild first:
- cd notes_frontend && npm ci || npm install
- npm run prebuild:android
- ./gradlew-ci assembleDebug
