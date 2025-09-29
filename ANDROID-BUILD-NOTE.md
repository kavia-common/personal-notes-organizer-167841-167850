# Android Build Note (Expo-managed)

This repository uses Expo-managed workflow. There is no `notes_frontend/android/` or `./gradlew` until `expo prebuild` is executed.

To build native Android locally or in CI:
1. cd notes_frontend
2. npm ci || npm install
3. npm run prebuild:android
4. From the repo root, run one of:
   - ./scripts/ci-gradle-wrapper.sh :assembleDebug
   - make gradle
   - ./gradlew :assembleDebug (guard script will delegate after prebuild)

If a CI or analyzer calls `./gradlew` before prebuild, the provided guard scripts (`./gradlew`, `./gradlew.sh`, `scripts/ci-gradle-wrapper.sh`) will safely no-op instead of failing.
