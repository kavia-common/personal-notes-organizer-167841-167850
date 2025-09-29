# CI Guidance for Expo-managed React Native App

This repository uses an Expo-managed workflow. By default, there is no native Android project or Gradle wrapper (`./gradlew`) until you run an Expo prebuild.

If your CI tries to run Gradle without prebuilding, you'll see:
```
bash: line 1: ./gradlew: No such file or directory
```

## Options to fix CI

1) Managed-only (no native build)
- Skip native Gradle steps entirely. Use the provided guard:
  - scripts/ci-gradle-wrapper.sh will no-op if android/ or gradlew is missing.
  - scripts/android-check.sh emits `ANDROID_PRESENT=0` to help condition jobs.

2) Prebuild then run Gradle
- Generate native projects in CI prior to Gradle:
  - cd notes_frontend && npm ci || npm install
  - npm run prebuild:android
  - scripts/ci-gradle-wrapper.sh :assembleDebug

## Make targets
- make ci-prepare: install deps
- make prebuild-android: run Expo prebuild for Android
- make android-check: echo ANDROID_PRESENT=0/1
- make gradle: guarded Gradle assembleDebug

## Recommended pipeline snippet

- name: Prepare
  run: make ci-prepare

- name: Prebuild Android
  run: make prebuild-android

- name: Android build (guarded)
  run: make gradle

If you intend to keep the managed workflow and not build native in CI, you can simply call:
- scripts/ci-gradle-wrapper.sh :noop
which will no-op if Gradle wrapper is absent.
