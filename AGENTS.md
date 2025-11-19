# Repository Guidelines

## Role & Responsibilities

Your role is to analyze user requirements, delegate tasks to appropriate sub-agents, and ensure cohesive delivery of features that meet specifications and architectural standards.

# Guidelines

## Top-Level Rules
- **Think exclusively in English** but **respond in Vietnamese**
- Execute multiple independent processes **concurrently, not sequentially**
- **Do not** use `any` or `unknown` types in TypeScript
- You must not use TypeScript `class` unless absolutely necessary

## Project Structure & Module Organization
imgfx API is TypeScript-first. `src/` hosts the runtime modules - `ImageFX.ts` orchestrates image generation, `Account.ts` keeps cookie-backed auth, `Prompt.ts` and `Image.ts` model payloads, and `cli.ts` exposes the `imgfx` binary while `src/index.ts` re-exports the surface.
Tests sit under `tests/` with numbered specs (`1-account.test.ts`, `2-generate.test.ts`, etc.), usage samples belong in `examples/`, shared media in `assets/`, and compiler output is emitted to `dist/` only.
Project automation and workflow files live in `.github/`.

## Build, Test, and Development Commands
- `npm run build` compiles the TypeScript sources with `tsc`, refreshes `dist/`, and keeps `dist/cli.js` executable for releases.
- `npm test` (alias for `bun test --bail`) mirrors the CI job and stops on the first failure, so always run it before pushing.
- `bun test --filter 2-generate` runs a single spec while iterating on prompt-generation logic without waiting for the whole suite.
- `npx tsc --noEmit --watch` gives fast feedback on type errors without touching generated assets.

## Coding Style & Naming Conventions
Use ESM syntax, 4-space indentation, and PascalCase filenames that mirror exported classes.
Favor explicit `async/await`, centralize enums in `Constants.ts`, and throw `ImageFXError` for caller-facing failures.
Keep env vars in SCREAMING_SNAKE_CASE and align CLI flag names with those already described in `src/cli.ts`.

## Testing Guidelines
Bun drives the suite, so keep tests deterministic and offline by mocking remote calls whenever possible.
Follow the numeric naming pattern (`5-prompt-options.test.ts`) so CI executes specs in the intended workflow order.
Cover both module APIs (such as `ImageFX.generateImage`) and CLI commands, and annotate any skipped test with a reason.

## Commit & Pull Request Guidelines
History prefers short imperative subjects with optional prefixes (`Fix:`, `Feat:`) and fewer than 60 characters.
Pull requests should summarize intent, link related issues, and list the commands you ran (`npm run build`, `npm test`), plus CLI output or screenshots when UX or asset changes are involved.
Confirm that type checks, tests, and any lint tooling succeed locally, and call out known follow-up work in the description.

## Security & Configuration Tips
Treat `GOOGLE_COOKIE` as a secret by loading it from `.env` files or ephemeral shell exports and reading it through `process.env` only.
Scrub logs before sharing, store generated media inside directories already ignored (such as `.cache/`), and document new configuration flags in both `README.md` and the CLI `--help`.

