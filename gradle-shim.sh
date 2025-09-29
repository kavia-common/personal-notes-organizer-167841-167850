#!/usr/bin/env sh
# Minimal shim for CI environments that invoke ./gradlew via sh.
echo "Gradle wrapper is not generated in Expo managed workflow."
echo "Run: cd notes_frontend && npm run prebuild:android"
exit 127
