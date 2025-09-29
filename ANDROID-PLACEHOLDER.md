# Android Placeholders

This repository uses Expo (managed). Native Android projects are generated after prebuild.

Placeholders included to satisfy CI that expects certain paths:
- ./gradlew (root shim)
- ./android/gradlew (root Android placeholder)
- ./notes_frontend/android/gradlew (frontend Android placeholder)

These placeholders print guidance and exit with status 127 if executed.
For real Gradle builds:
1) cd notes_frontend
2) npm run prebuild:android
3) Run Gradle tasks as needed (Android SDK/JDK required)
