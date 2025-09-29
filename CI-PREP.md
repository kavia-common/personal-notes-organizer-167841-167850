# CI Preparation

Before any Gradle-related steps, run:
- bash ./scripts/prepare-gradle.sh

This ensures the wrapper shims are executable if present. In Expo managed projects, the real Gradle wrapper appears only after running:
- cd notes_frontend && npm run prebuild:android

If your CI requires Android checks without native build, use:
- cd notes_frontend && npm run android:check
