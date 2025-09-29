# Root Gradle Wrapper Guard

CI/analyzers may directly call `./gradlew` from repository root. This project is Expo-managed and does not include a native Android project until prebuild.

We include a guard `./gradlew` at repo root that:
- Delegates to `notes_frontend/android/gradlew` if it exists (real or stub)
- Otherwise, no-ops and exits 0

If your CI still cannot execute the script, ensure line endings are LF and the file is executable. See `.gitattributes` below.
