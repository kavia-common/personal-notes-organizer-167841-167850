@echo off
REM Conventional Gradle wrapper BAT stub for CI analyzers.
IF EXIST "%~dp0gradlew" (
  "%~dp0gradlew" %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO [gradlew-stub.bat] No .\gradlew found. Expo-managed project; skipping Gradle.
  EXIT /B 0
)
