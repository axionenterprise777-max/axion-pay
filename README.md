# Axion Pay

## Public Snapshot

This repository publishes a public-ready application snapshot focused on runnable source, UI assets, and deploy-safe code only.

Version tag target: `v1.0.0`

## Included

- Sanitized source code and public assets.
- Build metadata needed to understand the project structure.
- A generated README designed for public handoff.

## Excluded

- Environment files and secret-bearing configuration.
- Internal notes, operational documents, and workspace-only reports.
- Local caches, dependencies, generated build folders, and private backups.

## Repository Layout

- ``public``
- ``scripts``
- ``src``
- ``webapp``
- ``.gitattributes``
- ``.gitignore``
- ``axionpay_logo.png``
- ``axionpay_logo.transparent.png``
- ``package-lock.json``
- ``package.json``
- ``vite.config.js``

## Quick Start

- ``npm run start:frontend``: vite --config vite.config.js
- ``npm run start:backend``: node src/index.js
- ``npm run start``: concurrently "npm run start:frontend" "npm run start:backend"
- ``npm run dev``: npm run start
- ``npm run dev:frontend``: npm run start:frontend
- ``npm run dev:backend``: npm run start:backend
- ``npm run gen:assets``: node scripts/generate-webapp-public-assets.cjs
- ``npm run prestart:frontend``: npm run gen:assets

## Release Policy

- Public releases are tagged with semantic versioning when package metadata is available.
- This repository is intended to expose professional, shareable source snapshots without internal workspace context.

## Notes

- Generated from the SANDBOX workspace using a sanitization pipeline.
- Public-facing content was intentionally reduced to avoid leaking internal details.
- Screenshots already indexed for this project: **17** real captures in the central `portfolio` repository.

