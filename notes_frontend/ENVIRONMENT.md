# Environment Configuration

This app currently works offline using AsyncStorage. For future backend integration:

Options
1) Expo app.json `extra`
   - Add under the "expo" key:
     {
       "expo": {
         "...": "...",
         "extra": {
           "API_BASE_URL": "https://api.example.com"
         }
       }
     }

2) Process environment (limited in Expo dev)
   - Define API_BASE_URL in your environment before starting Expo.
   - Not all environments propagate process.env in Expo Go; prefer `extra`.

Usage
- The typed helper `src/utils/config.ts` exposes `getConfig()`.
- Update `src/services/api.ts` to use `getConfig().API_BASE_URL` when wiring to a real backend.
