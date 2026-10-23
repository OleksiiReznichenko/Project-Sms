# Quick SMS - Frontend portfolio demo

**Demo:** https://quicksms.oleksiireznichenko.com

An archived Vue 3 + TypeScript SMS-service frontend, restored as an interactive admin-interface demo with fictional data. This project originally integrated REST APIs for account management, dashboard analytics, coupons and transactions. The original API implementation remains in the source for reference.

## What you can explore

- One-click **Explore admin demo** entry from the homepage or login screen
- Dashboard statistics, charts and popular services
- Users list, client-side search and user details
- Transaction list, confirmation (fictional) and search
- Coupon and announcement management using temporary mock data

No real account registration, authentication, SMS delivery, purchases, money transfers, or password changes work in the demo. The original FAQ/customer account and payment routes are disabled for public visitors. All modifications are in browser memory and reset on refresh. Never enter real credentials or personal information.

## Run locally

```bash
npm install
npm run dev
```

The site defaults to demo mode even without an `.env` file. The demo API intercepts existing Axios requests inside the browser. Unsupported requests return an explanatory demo error rather than contacting an external service.

## Build

```bash
npm run build
```

## Integration preservation

The original API calls and login components are intentionally preserved behind `VITE_DEMO_MODE=false`. Only enable that flag privately if you control a compatible backend. Never store secrets in any `VITE_` variable: Vite publishes such values in client bundles. The public deployment should leave `VITE_DEMO_MODE=true`.

## Code structure

- `src/demo/` - fictional seed records and Axios demo adapter
- `src/pages/AdminPanel/` - original admin screens
- `src/stores/` - Pinia state
- `src/router/index.ts` - public demo route guard

This is restored historical client frontend work, not a functioning SMS platform.

## Notes and limitations

- The original marketing landing page remains, including historical descriptions of services. The demo banner and admin CTA explain the current status.
- Existing admin CRUD controls operate on **fictional temporary records** only. They reset after a refresh.
- The original production authorization and server-side security are NOT part of this demo. The route guard is for user experience, not security.
- A full browser/mobile regression test is still recommended.
- Remove or rotate any credentials from the historical `.env` file in your local working copy; it is not bundled here.
