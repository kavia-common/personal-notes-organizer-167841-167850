# Build Notice: Expo Managed Workflow

This project uses Expo (managed). The native Android project (android/ with ./gradlew) does not exist until you run:

  cd notes_frontend && npm run prebuild:android

If your CI/CD system calls `./gradlew` before prebuild, it will fail with:
  bash: line 1: ./gradlew: No such file or directory

To fix:
- Use the safe scripts that skip native checks when not prebuilt:
  - bash ./scripts/android-check.sh
  - bash ./scripts/ci-gradle-wrapper.sh help
  - make android-check
  - make gradle
- Or prebuild first (requires JDK + Android SDK):
  - cd notes_frontend && npm run prebuild:android

References:
- README-BUILD.md
- CI_README.md
- CI-USAGE.md
- CI-PREP.md
- CI-OVERRIDE-GRADLE.md
- GRADLE_WRAPPER_SHIM.md
- ANDROID-PLACEHOLDER.md
- notes_frontend/scripts/gradle-guard.md
