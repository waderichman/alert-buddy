# AlertBuddy

Expo/React Native starter for a geopolitical breaking-news alert app.

## Included

- Expo Router tab app
- NativeWind styling
- Breaking feed with realistic mock data
- Topic selection
- Alert preferences
- Premium screen with RevenueCat-ready integration stub
- Zustand state with local persistence
- Local backend service for live feed aggregation

## Run

1. Install Node 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in your LAN IP for `EXPO_PUBLIC_API_BASE_URL`.
4. In one terminal run `npm run backend`.
5. In another terminal run `npx expo start`.
6. Open in Expo Go or run an iOS simulator from a Mac.

## Live Data

The backend exposes:

- `GET /api/health`
- `GET /api/topics`
- `GET /api/feed`

The current pipeline:

- `NewsAPI` if `NEWS_API_KEY` is set
- `GDELT` public feed as a secondary source
- local scoring for severity, region, and topic tagging
- cache with sample-data fallback if live sources fail

To let your phone reach the backend, set `EXPO_PUBLIC_API_BASE_URL` to your computer's Wi-Fi IP, for example:

```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.25:4000
```

Then restart Expo after changing env vars.

## RevenueCat

Add an `.env` file with:

```bash
EXPO_PUBLIC_REVENUECAT_API_KEY=your_public_sdk_key
```

The current implementation safely no-ops if the key is missing. Wire live offerings and purchases in `lib/revenuecat.ts` and the premium screen once your products exist in App Store Connect and RevenueCat.

## EAS

Typical next commands:

```bash
npx expo install
npx eas login
npx eas build:configure
npx eas build --platform ios
```

## Product next steps

- Add backend-triggered push notifications.
- Add auth and synced watchlists.
- Gate premium alerts and advanced filters by live entitlements.
- Replace heuristic ranking with a stronger event-clustering pipeline.
