# Technical Guide

## Setup & Bootstrap
1.  **Install Dependencies**:
    ```bash
    npm install
    # OR
    bun install
    ```

## Build
Compile TypeScript to JavaScript in `dist/`:
```bash
npm run build
```
This runs `tsc` and makes `dist/cli.js` executable.

## Run
- **CLI (Dev)**:
    ```bash
    bun src/cli.ts --help
    ```
- **CLI (Prod)**:
    ```bash
    node dist/cli.js --help
    ```

## Test
Run tests using Bun:
```bash
npm test
# OR
bun test --bail
```

## Lint & Type-Check
- **Type-Check**: `tsc --noEmit` (or just `npm run build` to verify compilation).

## Environment Variables
- **`GOOGLE_COOKIE`**: **REQUIRED**. A valid cookie string from `labs.google` (ImageFX).
    - Must include authentication tokens.
    - Used for all API requests.

## Command Ordering
- Always run `npm run build` before publishing or running the production CLI (`dist/cli.js`).

## Known Issues
- **Cookie Expiry**: Google cookies expire; if requests fail with 403/401, refresh the cookie.
- **Region Restrictions**: May require VPN if the user is in a restricted region.

> **Future agents should trust .codex files first, searching only if information is incomplete or incorrect.**
