# Contributing Guide

Project: Personal Notes Organizer (React Native / Expo)

Local Development
- cd notes_frontend
- npm install
- npm run start  # Launch Expo dev server
- Use Expo Go or emulator to preview

Lint and Quality
- cd notes_frontend
- npm run lint

Native Android Build (only if required)
- This is an Expo managed project. The native Android project does not exist until you prebuild.
- Generate native project:
  - cd notes_frontend && npm run prebuild:android
- Then use the helper to run Gradle tasks from repo root:
  - bash ./scripts/ci-gradle-wrapper.sh help

CI Guidelines (IMPORTANT)
- Do NOT call ./gradlew directly before prebuild in an Expo-managed app.
- Use CI-safe scripts that skip gracefully when native project is absent:
  - bash ./scripts/android-check.sh
  - bash ./scripts/ci-gradle-wrapper.sh help
  - make android-check
  - make gradle
- If you must perform a native build, install JDK + Android SDK, then:
  - cd notes_frontend && npm run prebuild:android
  - run Gradle tasks using the helper script above.

Backend Integration
- Use src/utils/config.ts getConfig().API_BASE_URL (wired via app.json "extra").
- Update src/services/api.ts to switch from AsyncStorage to real HTTP endpoints as needed.

Resources
- BUILD.md, README-BUILD.md
- CI_README.md, CI-PREP.md, CI-USAGE.md, CI-OVERRIDE-GRADLE.md
- GRADLE_WRAPPER_SHIM.md, ANDROID-PLACEHOLDER.md
- notes_frontend/MAINTAINERS.md
- .github/workflows/mobile-ci-sample.yml
