# Notes Frontend (React Native / Expo)

A modern personal notes app using the "Ocean Professional" theme.

Features
- List notes in cards with title, snippet, and timestamps
- Floating Action Button (FAB) for adding notes
- Detail view to edit title, content, and tags
- Organize via search and sort (recent, title, created)
- Themed header and modern minimalist UI
- API integration stubs ready for backend connectivity (AsyncStorage currently)

Tech Stack
- Expo (React Native)
- React Navigation (native stack)
- AsyncStorage for persistence
- UUID for IDs
- Ionicons for icons
- TypeScript

Getting Started
1) Install dependencies
   - npm install
2) Run the app
   - npm run start
   - Press "a" for Android emulator or scan QR code with Expo Go

Scripts
- start: Expo dev server
- android / ios / web: Open platform targets
- lint: ESLint checks
- prebuild:android: Generate native Android project (managed -> bare for Android)
- build: Prebuild then assembleDebug (requires Android SDK/Java)
- android:check: CI-friendly Gradle wrapper check that skips when prebuild isn't run

Structure
- src/
  - components/: Reusable UI components (Header, NoteCard, FAB, SearchBar, SortMenu)
  - navigation/: React Navigation setup
  - screens/: NotesList and NoteDetail screens
  - services/: API stubs (AsyncStorage-based CRUD, search/sort)
  - theme/: Colors, spacing, shadows
  - types/: TypeScript Note/Tag models
  - utils/: Storage helpers

Theming
- Ocean Professional theme (Primary #2563EB, Secondary #F59E0B, Text #111827, Background #f9fafb, Surface #ffffff, Error #EF4444)

Backend Integration
- src/services/api.ts provides stubbed functions for CRUD.
- Replace storage with real HTTP calls when backend is available.
- Consider adding API_BASE_URL via .env and wiring it into the service.

CI note
- Gradle wrapper (./android/gradlew) is created only after running prebuild:
  - npm run prebuild:android
- In CI without native build requirements, run:
  - npm run android:check
  which safely skips when gradlew is missing.
- For full native builds, ensure Java/Android SDK in the environment, run prebuild, then run Gradle tasks.
- See scripts/gradle-guard.md and ../../CI-NOTE-ANDROID.md for more details.
