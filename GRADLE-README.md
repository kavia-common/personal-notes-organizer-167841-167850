# Gradle and CI Guidance

- This project is Expo-managed. Run `cd notes_frontend && npm run prebuild:android` to generate native Android.
- If your CI calls `./gradlew`, use the provided guard (already at repo root) or `./gradlew-ci`.
- For checks, use `./gradle-check.sh` which no-ops unless native exists.
- For building, use `./scripts/ci-gradle-wrapper.sh :assembleDebug` or `make prebuild-android && make gradle`.

Quick map:
- Managed only: `./gradlew-ci :noop` (no-op)
- Real native build:
  - `cd notes_frontend && npm ci || npm install`
  - `npm run prebuild:android`
  - `./gradlew-ci assembleDebug` or `make gradle`
