# Guarded Gradle Check in CI

Some CI analyzers call `./gradlew check` automatically. In an Expo-managed project, `android/` and `./gradlew` do not exist until you run `expo prebuild`.

Use the guard:
- Call `./gradle-check.sh` in place of `./gradlew check`.
  - It delegates to `notes_frontend/android/gradlew check` if native project exists.
  - Otherwise, it no-ops and exits successfully.

To perform real checks:
1. cd notes_frontend
2. npm ci || npm install
3. npm run prebuild:android
4. ./gradle-check.sh
