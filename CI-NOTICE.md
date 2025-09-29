# CI Notice: Expo-managed project and Gradle

This repository uses an Expo-managed workflow; there is no native `./gradlew` until you run:
- `cd notes_frontend && npm ci || npm install && npm run prebuild:android`

If your CI or analyzer calls `./gradlew` directly, it will fail with “No such file or directory”. Use the provided guard scripts:
- `./run-gradle-check.sh` — guarded equivalent of `./gradlew check`
- `./gradle-check.sh` — guarded check helper
- `./gradlew-ci` — guarded wrapper for arbitrary tasks
- `./scripts/ci-gradle-wrapper.sh :assembleDebug` — assemble via guard
- `make prebuild-android && make gradle` — prebuild then assemble

If you must have a real native build in CI, run the prebuild step first.
