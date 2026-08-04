# Expense Tracker — Installable App

This is a Progressive Web App (PWA). It behaves like a real app once
installed — home-screen icon, full-screen, works offline — on both
Android and iPhone. No app store needed.

## 1. Host the files
All 5 files (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`,
`icon-512.png`, `apple-touch-icon.png`) must sit together on a site
served over **https**. Easiest free options:

- **Netlify Drop**: go to https://app.netlify.com/drop and drag this
  folder in. You'll get a live https URL in seconds.
- **GitHub Pages**: push the folder to a GitHub repo, enable Pages in
  repo settings.

## 2. Install on Android
1. Open the site URL in **Chrome**.
2. Tap the **⋮** menu → **Add to Home screen** (or you may see an
   automatic "Install app" banner).
3. Confirm. The icon now opens full-screen like a native app.

## 3. Install on iPhone (iOS)
1. Open the site URL in **Safari** (must be Safari, not Chrome).
2. Tap the **Share** icon (square with an arrow) → **Add to Home
   Screen**.
3. Confirm. The icon now opens full-screen like a native app.

## Notes
- Your expense data is stored **on that device only**, in the
  browser's local storage. It won't sync between your phone and a
  laptop unless you export the CSV and move it manually.
- **Works fully offline** after the first successful load — React and
  all app code are bundled into the files themselves (no CDN needed),
  and a service worker caches everything so the app opens and works
  even with no internet connection, including adding/editing expenses.
- If you ever want a "real" native app in the App Store / Play Store
  (for things like push notifications or cloud sync), that requires
  a separate build with a tool like Capacitor or React Native, plus
  Apple/Google developer accounts. I can help set that up if you get
  there — just ask.
