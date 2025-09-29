# Personal Notes Organizer (Mobile)

A React Native (Expo) notes app with a modern "Ocean Professional" theme.

Frontend (notes_frontend)
- React Navigation (native stack)
- AsyncStorage-backed CRUD stubs (ready to swap for real backend)
- Notes list as cards, FAB to add, search + sort, tags, editor screen
- Themed UI (Primary #2563EB, Secondary #F59E0B, Text #111827, Background #f9fafb, Surface #ffffff, Error #EF4444)

Quickstart
1) cd notes_frontend
2) npm install
3) npm run start

CI / Native Android Build Notice (IMPORTANT)
This is an Expo managed project. The native Android project (android/ with ./gradlew) DOES NOT exist until you run:
- cd notes_frontend && npm run prebuild:android

If your CI/CD pipeline invokes ./gradlew before prebuild, it will fail with:
- bash: line 1: ./gradlew: No such file or directory

Use one of the following:
- Safe skip (no native build):
  - bash ./scripts/android-check.sh
  - bash ./scripts/ci-gradle-wrapper.sh help
  - make android-check
  - make gradle
- Real native build (requires JDK + Android SDK):
  - cd notes_frontend && npm run prebuild:android
  - then run Gradle tasks

Reference docs/scripts
- README-BUILD.md
- CI_README.md, CI-PREP.md, CI-USAGE.md, CI-OVERRIDE-GRADLE.md
- GRADLE_WRAPPER_SHIM.md, ANDROID-PLACEHOLDER.md
- notes_frontend/scripts/android-check.sh
- .github/workflows/mobile-ci-sample.yml
