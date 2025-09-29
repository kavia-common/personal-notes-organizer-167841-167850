# Android Gradle Guard

This repository uses Expo (managed workflow). The native Android project (android/ with `./gradlew`) is only generated after running:

- npm run prebuild:android
  which runs: `expo prebuild --platform android`

In CI environments where native build is not required, avoid invoking Gradle before prebuild.
If a Gradle command is executed without prebuild, you'll see:

bash: line 1: ./gradlew: No such file or directory

Options:
1) Use Expo Go runtime and skip native Gradle.
2) Run `npm run prebuild:android` first (requires Java/Android SDK).
3) Adopt EAS Build (Expo Application Services) for CI builds).
4) For simple CI validation, run `npm run android:check` which skips when gradlew is missing.

This file exists to document and justify the absence of `./gradlew` before prebuild.
