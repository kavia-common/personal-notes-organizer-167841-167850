# Gradle Wrapper Shim

Some CI environments attempt to run `./gradlew` from the repository root.

This project uses Expo (managed). The native Android project is inside `notes_frontend` and is generated after running:

- cd notes_frontend
- npm run prebuild:android

The root-level `gradlew` here is a shim that forwards to `notes_frontend/android/gradlew` if present. If not present, it exits with 127 and prints guidance.
