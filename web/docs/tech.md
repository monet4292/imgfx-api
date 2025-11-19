# Web Interface Technical Guide

## Setup & Bootstrap
1. **Install Dependencies**:
   ```bash
   cd web
   npm install
   # OR
   bun install
   ```

2. **Local Package Link**:
   The web application depends on the local imgfx-api package:
   ```bash
   # From the web directory
   npm install ../
   ```

## Development
Run the development server:
```bash
npm run dev
# OR
bun dev
```
The application will be available at [http://localhost:3000](http://localhost:3000)

## Build
Create an optimized production build:
```bash
npm run build
```
This creates an optimized production build in the `.next` directory.

## Production Deployment
Start the production server:
```bash
npm start
```

## Linting
Check code quality:
```bash
npm run lint
```

## Environment Variables
No specific environment variables are required for the web interface itself.
The Google Cookie is managed through the UI and stored in browser local storage.

## Required External Services
- **Google ImageFX API**: All functionality depends on this external service
- No database or backend services required (uses browser local storage)

## Component Development Guidelines
- Use existing UI components from `components/ui/` when possible
- Follow the established patterns for form handling and API integration
- Maintain consistent styling with Tailwind CSS classes
- Use TypeScript for all new components

## API Integration
The web application communicates with Google's ImageFX API through Next.js API routes:
- API routes handle server-side communication with the imgfx-api library
- Client-side components make fetch requests to these API routes
- Error handling is implemented at both the API route and component level

## State Management
- **Authentication**: Managed through CookieContext
- **Form State**: Managed with React useState hooks
- **History**: Stored in browser local storage through history utility
- **UI State**: Component-level state with useState

## File Upload Handling
- Images are converted to base64 for API transmission
- File type validation is performed before upload
- Preview functionality uses FileReader API

## Image Handling
- Generated images are returned as base64 data URLs
- Images are displayed directly in the browser without server storage
- Download functionality uses the HTML5 download attribute

## Browser Compatibility
- Requires modern browser with ES6+ support
- Uses modern JavaScript features (async/await, fetch API)
- Responsive design works on mobile and desktop browsers

## Security Considerations
- Google cookies are stored in browser local storage
- No sensitive data is transmitted to third-party services
- API routes validate input parameters
- No server-side storage of user data

## Performance Optimization
- Images are loaded lazily in the gallery
- React state updates are optimized to prevent unnecessary re-renders
- Next.js provides automatic code splitting and optimization

## Troubleshooting
- **Cookie Issues**: Ensure the Google cookie is valid and not expired
- **Image Generation Failures**: Check network connectivity and cookie validity
- **Local Storage Issues**: Clear browser cache if gallery is not updating
- **Build Errors**: Ensure all dependencies are installed and TypeScript compilation succeeds

## Code Examples

### Adding a New UI Component
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NewFeature() {
  return (
    <Card>
      <CardContent className="p-6">
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Creating a New API Route
```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageFX } from '@monet4292/imgfx-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // API implementation
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Using the Cookie Context
```typescript
import { useCookie } from '@/context/CookieContext';

export default function MyComponent() {
  const { cookie, setCookie, isConfigured } = useCookie();
  
  // Component implementation
}
```

> **Future agents should trust web/docs files first, searching only if information is incomplete or incorrect.**
