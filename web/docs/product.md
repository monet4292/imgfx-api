# Web Interface Product Overview

## Summary
The ImageFX Web Interface is a modern React-based web application that provides a user-friendly frontend for the imgfx-api library. It offers a graphical interface for generating images from text, creating captions from images, and managing a local gallery of generated content.

## Project Type
- **Type**: Next.js Web Application with React Components
- **Architecture**: Client-side React application with server-side API routes
- **UI Framework**: Radix UI components with Tailwind CSS styling

## Languages & Frameworks
- **Language**: TypeScript
- **Framework**: Next.js (Pages Router)
- **UI Library**: Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Integration**: Next.js API routes

## Purpose & Main Flows
1. **Image Generation Interface**: User-friendly form for text-to-image generation
   - Model selection (IMAGEN_3, IMAGEN_3_5, IMAGEN_4)
   - Aspect ratio configuration
   - Batch generation options
   - Real-time preview and download

2. **Image Captioning Interface**: Upload and analyze images to generate descriptions
   - Drag-and-drop image upload
   - Support for multiple image formats
   - Caption generation with AI

3. **Gallery Management**: Local storage and management of generated images
   - History tracking with timestamps
   - Organized display of previous generations
   - Download and deletion capabilities

4. **Cookie Management**: Secure authentication interface
   - Local storage of Google authentication cookies
   - Import from text files
   - Configuration validation

## Constraints & Assumptions
- **Authentication**: Relies on the same Google Account cookie as the CLI tool
- **Local Storage**: Generated images are stored in browser's local storage
- **Browser Compatibility**: Modern browsers with ES6+ support required
- **Network Dependency**: Requires internet connection for API calls
- **Privacy**: All operations happen client-side except for API calls to Google
- **No Backend Persistence**: No server-side storage of generated content

## Domain
Web-based AI image generation tools, providing an accessible interface for users who prefer graphical applications over command-line tools. Target users include content creators, designers, and enthusiasts who want to experiment with Google's ImageFX technology through a browser interface.
