# CI Gradle Override

If your CI system invokes `./gradlew` by default, configure it to use the provided shim instead:

Use:
- bash ./scripts/ci-gradle-wrapper.sh help

Or via Make:
- make gradle

These commands will:
- Use an existing Gradle wrapper if present
- Otherwise skip gracefully in Expo managed mode (before prebuild)

If your CI cannot be reconfigured, consider mapping ./gradlew to:
- ./gradle-shim.sh
which prints guidance and returns 127 (treat as "skipped").

For real Gradle builds, you must run:
- cd notes_frontend && npm run prebuild:android
then run Gradle tasks with Android SDK/JDK available.
