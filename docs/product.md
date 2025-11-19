# Product Overview

## Summary
`@monet4292/imgfx-api` is an unofficial, reverse-engineered API and CLI tool for Google's **ImageFX** (Imagen) service. It allows users to generate images from text, generate captions from images, and fetch existing generated images programmatically or via the command line.

## Project Type
- **Type**: TypeScript Library & CLI Application.
- **Distribution**: NPM Package (`@monet4292/imgfx-api`).

## Languages & Frameworks
- **Language**: TypeScript.
- **Runtime**: Node.js (Production/CLI), Bun (Development/Testing).
- **CLI Framework**: `yargs`.

## Purpose & Main Flows
1.  **Image Generation**: Text-to-Image using models like `IMAGEN_3`.
2.  **Image Captioning**: Image-to-Text generation.
3.  **Fetching**: Retrieve images using Media IDs.
4.  **CLI Usage**: Provide a terminal interface for all the above features.

## Constraints & Assumptions
- **Authentication**: Relies entirely on a valid Google Account cookie (`GOOGLE_COOKIE`).
- **Unofficial**: This is a reverse-engineered API; endpoints and payloads may change without notice if Google updates ImageFX.
- **Region Lock**: ImageFX is not available in all countries; users may need a VPN to obtain cookies or use the service.
