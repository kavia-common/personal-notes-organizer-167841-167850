# Build and CI Guide (Expo Managed)

This repository contains a React Native (Expo) mobile app (notes_frontend).

Key facts
- Expo managed workflow: there is no native Android project by default.
- The Gradle wrapper (./gradlew) only exists AFTER running:
  cd notes_frontend && npm run prebuild:android

If your CI calls ./gradlew before prebuild, you will get:
  bash: line 1: ./gradlew: No such file or directory

Local development
1) cd notes_frontend
2) npm install
3) npm run start

Run lint
- cd notes_frontend && npm run lint

CI-safe Android check (no native prebuild)
- bash ./scripts/android-check.sh
- or: make android-check
- or: bash ./scripts/ci-gradle-wrapper.sh help

Perform native Android build in CI
1) Install Java and Android SDK (example with GitHub Actions: actions/setup-java + Android setup)
2) Prebuild to generate native project:
   cd notes_frontend && npm run prebuild:android
3) Then run Gradle tasks:
   bash ./scripts/ci-gradle-wrapper.sh assembleDebug

Provided helpers
- ./scripts/ci-gradle-wrapper.sh: Uses a real wrapper if present, else skips safely
- ./scripts/android-check.sh: Skips if wrapper not present
- Root shims: ./gradlew, ./gradlew.sh, ./gradle (and Windows .bat) for CI compatibility

References
- README.md (root)
- README-BUILD.md
- CI_README.md
- CI-PREP.md
- CI-USAGE.md
- CI-OVERRIDE-GRADLE.md
- GRADLE_WRAPPER_SHIM.md
- ANDROID-PLACEHOLDER.md
- personal-notes-organizer-167841-167850/.github/workflows/mobile-ci-sample.yml
