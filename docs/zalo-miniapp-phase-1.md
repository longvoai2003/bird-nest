# Zalo Mini App Phase 1

## Status

- Added `apps/zalo-miniapp` using the default ZaUI Fashion template UI
- Kept the existing Next.js website in place at the repo root
- Verified the miniapp can install dependencies and build independently

## Commands

- Website dev: `npm run dev`
- Website tests: `bun test`
- Zalo Mini App dev: `npm run zalo:dev`
- Zalo Mini App deploy: `npm run zalo:deploy`
- Zalo Mini App CSS build: `npm run zalo:build:css`
- Zalo Mini App production build: `npm --prefix apps/zalo-miniapp run build`

## Important Files

- Mini App source: `apps/zalo-miniapp/src`
- Mini App config: `apps/zalo-miniapp/app-config.json`
- Mini App package config: `apps/zalo-miniapp/package.json`
- Mini App Vite config: `apps/zalo-miniapp/vite.config.mts`
- Mini App CLI config: `apps/zalo-miniapp/zmp-cli.json`

## Notes

- Phase 1 intentionally keeps the default ZaUI Fashion UI and mock data in place.
- `template.apiUrl` is still empty in `apps/zalo-miniapp/app-config.json`.
- The miniapp starter needed two local fixes to work reliably in this repo:
  - `build:css` now points to `src/css/tailwind.scss`
  - Vite now builds from the app root so it can resolve `index.html`

## Next Steps

- Replace template mock data with Bird Nest product, category, and banner endpoints
- Map current packaging options and product fields to the miniapp product model
- Decide whether miniapp checkout should submit to the existing order API directly
- Start branding and UI customization after real data is connected
