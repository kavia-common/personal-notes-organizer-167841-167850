# CI Integration Notes

This project uses Expo-managed workflow. There is no `android/` or `./gradlew` until you run `expo prebuild`.

CI systems often run `./gradlew` (Linux/macOS) or `gradlew.bat` (Windows). To avoid failures before prebuild:
- We provide root-level guard scripts:
  - `./gradlew` (Bash) and `gradlew.bat` (Windows) that no-op if `notes_frontend/android/gradlew*` is absent.
- We also provide:
  - `scripts/ci-gradle-wrapper.sh` — guarded Gradle invocations
  - `scripts/ci-prebuild-and-gradle.sh` — runs prebuild then invokes guarded Gradle
  - `scripts/android-check.sh` — outputs `ANDROID_PRESENT=0/1`

Typical pipelines:
- Managed only (skip native):
  - Call `./gradlew :noop` — it will no-op unless native exists.

- Native build:
  - `make ci-prepare`
  - `make prebuild-android`
  - `make gradle`

Or directly:
  - `cd notes_frontend && npm ci || npm install && npm run prebuild:android`
  - `./scripts/ci-gradle-wrapper.sh :assembleDebug`

If your CI still calls `./gradlew` automatically, the guard will prevent an error and exit 0 unless you prebuilt.
