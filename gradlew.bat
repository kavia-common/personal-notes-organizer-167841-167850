@echo off
REM Guard gradlew.bat for CI environments that call gradlew.bat,
REM but the Expo-managed project hasn't generated Android native yet.
REM If notes_frontend\android\gradlew.bat exists, delegate to it.
REM Otherwise, exit 0 gracefully.

setlocal enabledelayedexpansion

set ROOT_DIR=%~dp0
set APP_DIR=%ROOT_DIR%notes_frontend
set ANDROID_DIR=%APP_DIR%\android
set REAL=%ANDROID_DIR%\gradlew.bat

if exist "%REAL%" (
  echo [gradlew.bat guard] Delegating to %REAL% %*
  call "%REAL%" %*
  exit /b %ERRORLEVEL%
) else (
  echo [gradlew.bat guard] No android\gradlew.bat found. Skipping Gradle step.
  echo [gradlew.bat guard] To enable native builds in CI, run: cd notes_frontend && npm run prebuild:android
  exit /b 0
)
