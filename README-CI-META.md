# CI Meta: Ensure Guarded Gradle Wrapper

Some analyzers call `./gradlew` unconditionally and will fail in an Expo-managed project. Run this once in a pre-step:

- ./ensure-gradlew.sh

This script creates a guarded `./gradlew` (if missing) that:
- Delegates to `notes_frontend/android/gradlew` when native exists (after prebuild)
- Otherwise, no-ops and exits successfully

Then you can safely run:
- ./gradle-check.sh      # guarded 'check'
- ./scripts/ci-gradle-wrapper.sh :assembleDebug  # guarded assemble
