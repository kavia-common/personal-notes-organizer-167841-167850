# Gradle Usage in CI (Expo-managed)

In this Expo-managed project, `notes_frontend/android/gradlew` does not exist until you prebuild:
- `cd notes_frontend && npm ci || npm install && npm run prebuild:android`

CI systems that call `./gradlew` will fail with:
```
./gradlew: No such file or directory
```

Use the provided guards:
- `./gradlew` — guard that no-ops unless prebuild was run (already in repo root)
- `./gradlew-ci` — preferred CI entrypoint; delegates if native exists, otherwise exits 0
- `./gradle-check.sh` — guarded equivalent of `./gradlew check`
- `scripts/ci-gradle-wrapper.sh` — guarded task runner (e.g., `:assembleDebug`)
- `make prebuild-android && make gradle` — convenience via Makefile

Recommended CI snippets:
- Managed-only: `./gradlew-ci :noop`
- Native build:
  - `make ci-prepare`
  - `make prebuild-android`
  - `./gradlew-ci assembleDebug` (or `make gradle`)
