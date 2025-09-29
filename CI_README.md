# CI Guidance: Expo Managed Project and Gradle

This repository uses Expo (managed workflow). The native Android project ("android/" with "./gradlew") is NOT present until you run a prebuild:

- cd notes_frontend && npm run prebuild:android

If your CI attempts to run "./gradlew" before prebuild, it will fail with:
bash: line 1: ./gradlew: No such file or directory

Options to fix CI:
1) Skip native Gradle steps
   - Use the safe checks: bash ./scripts/android-check.sh
   - Or: make android-check
   - Or: bash ./scripts/ci-gradle-wrapper.sh help
2) Run prebuild before Gradle
   - cd notes_frontend && npm run prebuild:android
   - Then run Gradle tasks (requires JDK and Android SDK)
3) Use the provided root-level shim instead of raw "./gradlew"
   - ./gradlew (shim) delegates to ci-gradle-wrapper.sh
   - ./gradlew.sh explicitly calls the CI wrapper
4) For Windows runners
   - gradlew.bat shims exist and print guidance, but real builds still require prebuild

Reference docs in this repo:
- README-BUILD.md
- CI-PREP.md
- CI-USAGE.md
- CI-OVERRIDE-GRADLE.md
- GRADLE_WRAPPER_SHIM.md
- ANDROID-PLACEHOLDER.md
- notes_frontend/scripts/gradle-guard.md
