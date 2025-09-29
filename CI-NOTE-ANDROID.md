# CI Android Checks (Expo Managed)

This project uses Expo (managed). The native Android folder (`android/`) and Gradle wrapper (`./gradlew`) are only created after running:

- npm run prebuild:android
  (which runs: `expo prebuild --platform android`)

If your CI tries to run Gradle in a managed project before prebuild, it will fail with:
bash: line 1: ./gradlew: No such file or directory

Use one of the following:
- Skip Gradle checks and use Expo Go for dev builds.
- Run `npm run prebuild:android` (requires Java/Android SDK) and then Gradle tasks.
- Use `npm run android:check` in notes_frontend which safely skips when the wrapper is missing.
