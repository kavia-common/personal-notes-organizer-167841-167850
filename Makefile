SHELL := /usr/bin/env bash

APP_DIR := notes_frontend
WRAPPER := scripts/ci-gradle-wrapper.sh
CHECK := scripts/android-check.sh

.PHONY: ci-prepare
ci-prepare:
	@echo "[make] Installing dependencies in $(APP_DIR)"
	cd $(APP_DIR) && npm ci || npm install

.PHONY: prebuild-android
prebuild-android:
	@echo "[make] Running Expo prebuild for Android (managed -> bare)"
	cd $(APP_DIR) && npm run prebuild:android

.PHONY: android-check
android-check:
	@$(CHECK)

.PHONY: gradle
gradle:
	@$(WRAPPER) :assembleDebug
