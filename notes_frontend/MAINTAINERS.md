# Maintainers Guide

Project: Notes Frontend (React Native / Expo)

Local dev
- npm install
- npm run start
- Open in Expo Go or emulator

Lint
- npm run lint

Android native (only if needed)
- npm run prebuild:android
  (generates android/ with gradlew)
- cd ../.. (repo root) and run Gradle tasks via helper:
  - bash ./scripts/ci-gradle-wrapper.sh help

CI notes
- This is an Expo managed project; no native android/ by default.
- Do not call ./gradlew in CI unless you prebuild first.
- For safe checks that skip when native project is absent:
  - bash ../../scripts/android-check.sh (from repo root)
  - or: make android-check
- To build native in CI, install JDK + Android SDK, then:
  - cd notes_frontend && npm run prebuild:android
  - run Gradle tasks via ../../scripts/ci-gradle-wrapper.sh

Backend integration
- Use src/utils/config.ts getConfig().API_BASE_URL (wired via app.json extra).
- Update src/services/api.ts to call your backend when available.
