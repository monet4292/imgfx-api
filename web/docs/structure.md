# Web Interface Structure

## Architecture & Components
The web application follows a standard Next.js Pages Router architecture with a component-based design:

### Core Pages
- **index.tsx**: Main image generation interface
  - Form with prompt input, model selection, and generation options
  - Real-time image display and download functionality
  - Integration with generation API endpoint

- **caption.tsx**: Image captioning interface
  - Drag-and-drop file upload with preview
  - Integration with caption API endpoint
  - Display of generated captions

- **gallery.tsx**: Local gallery management
  - Display of generation history from local storage
  - Image management (view, download, delete)
  - History clearing functionality

### API Routes
- **api/generate.ts**: Backend for image generation
  - Handles POST requests with generation parameters
  - Integrates with imgfx-api library
  - Returns base64-encoded images

- **api/caption.ts**: Backend for image captioning
  - Processes uploaded images
  - Calls imgfx-api caption generation
  - Returns generated text descriptions

- **api/fetch.ts**: Backend for fetching images by ID
  - Retrieves previously generated images
  - Handles media ID lookups

### Core Components
- **Layout.tsx**: Main application layout
  - Navigation between pages
  - Cookie management dialog
  - Responsive header with settings

- **UI Components** (components/ui/):
  - Reusable Radix UI components with custom styling
  - Button, Card, Dialog, Input, Label, Select, Tabs, Textarea
  - Consistent design system across the application

### Context & State Management
- **CookieContext.tsx**: Authentication state management
  - Global cookie state across the application
  - Local storage persistence
  - Configuration validation

### Utilities
- **history.ts**: Gallery history management
  - Local storage operations for generated images
  - CRUD operations for history items
  - Data structure for history entries

- **utils.ts**: Shared utility functions
  - Helper functions used across components

## Entry Points
- **Application**: `pages/_app.tsx` (App configuration with providers)
- **Pages**: Individual page components in `pages/` directory
- **API**: Server-side endpoints in `pages/api/` directory

## Folder Layout
- `src/pages/`: React page components and API routes
- `src/components/`: Reusable UI components
- `src/context/`: React Context providers
- `src/lib/`: Utility functions and helpers
- `src/styles/`: Global CSS and styling
- `public/`: Static assets
- `docs/`: Documentation files

## Key Configurations
- **Next.js**: `next.config.ts` (Next.js configuration)
- **TypeScript**: `tsconfig.json` (TypeScript configuration)
- **Tailwind**: `tailwind.config.js` (Styling configuration)
- **Package**: `package.json` (Dependencies and scripts)

## Dependencies
- **Runtime**: React, Next.js, Radix UI components
- **Styling**: Tailwind CSS, class-variance-authority, clsx, tailwind-merge
- **Icons**: Lucide React
- **API Integration**: @monet4292/imgfx-api (local package)
- **Utilities**: UUID for unique ID generation

## Data Flow
1. User interacts with UI components
2. State managed through React Context
3. API calls made to Next.js API routes
4. API routes use imgfx-api library to communicate with Google
5. Results returned to UI for display
6. Generated content stored in browser local storage

## Component Dependencies
- Pages depend on Layout and UI components
- Layout depends on CookieContext
- API routes depend on imgfx-api library
- Gallery depends on history utility functions
- All pages depend on CookieContext for authentication

## Build & Deployment
- **Development**: `npm run dev` (Next.js development server)
- **Production**: `npm run build` (Optimized production build)
- **Start**: `npm start` (Production server)
- **Linting**: `npm run lint` (Code quality checks)
