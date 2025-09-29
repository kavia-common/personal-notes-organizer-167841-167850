# CI Usage Guidance

This repository uses Expo (managed workflow). Native Android artifacts (android/ with gradlew) are only created after running prebuild.

Recommended CI steps:
1) npm run ci:prepare
   - Ensures gradle wrapper shims are executable if present
2) If you need to validate Android wrapper presence only:
   - bash ./scripts/android-check.sh
3) If you need real native builds:
   - cd notes_frontend && npm run prebuild:android
   - then run Gradle tasks as needed

Avoid directly invoking `./gradlew` before prebuild, or ensure it points to a generated wrapper.
