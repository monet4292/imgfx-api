# Codebase Structure

## Architecture & Components
The project is structured as a TypeScript library with a CLI wrapper.
- **Core Logic**: Encapsulated in classes within `src/`.
    - `ImageFX.ts`: Main client class for interacting with the API.
    - `Account.ts`: Handles authentication and session management.
    - `Prompt.ts`: Manages generation parameters (seed, aspect ratio, model).
    - `Image.ts`: Represents a generated image and handles saving/downloading.
- **CLI**: Implemented in `src/cli.ts` using `yargs` to parse arguments and invoke core logic.

## Entry Points
- **Library**: `src/index.ts` (exports `ImageFX`, `Prompt`, etc.).
- **CLI**: `src/cli.ts` (executable entry point).
- **Compiled Output**:
    - Library: `dist/index.js`
    - CLI: `dist/cli.js`

## Folder Layout
- `src/`: TypeScript source code.
- `dist/`: Compiled JavaScript output (created on build).
- `tests/`: Unit and integration tests (run with Bun).
- `examples/`: Example scripts demonstrating usage.
- `.github/`: GitHub Actions workflows.
- `.codex/`: AI onboarding documentation.

## Key Configurations
- **Build**: `tsconfig.json` (TypeScript config).
- **Package**: `package.json` (Scripts, dependencies, exports).
- **Testing**: `bun.lock` (Lockfile for Bun).

## Dependencies
- **Runtime**: `yargs` (CLI argument parsing).
- **Dev**: `typescript`, `bun` (Test runner & runtime for dev).

## CI/CD & Checks
- **Tests**: Run via `npm test` (executes `bun test`).
- **Build**: `npm run build` runs `tsc` and sets permissions on the CLI executable.
