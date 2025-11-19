# User Guide & Internal Mechanics

This document provides a detailed guideline on how to use `@monet4292/imgfx-api` and explains the underlying mechanics of how it interacts with Google's ImageFX service.

## 1. Prerequisites: The Google Cookie
The most critical component for this project is the **Google Account Cookie**. Since there is no official public API for ImageFX, this tool acts as a browser client on your behalf.

### Why is it needed?
Google protects its endpoints with authentication checks. The `GOOGLE_COOKIE` proves that you are a logged-in user who has accepted the Terms of Service for ImageFX.

### How to obtain it?
1.  **Login**: Go to [labs.google/fx/tools/image-fx](https://labs.google/fx/tools/image-fx) and sign in.
2.  **Extract**:
    *   **Easy**: Use a browser extension like "Cookie-Editor" to export the cookie header.
    *   **Manual**: Open DevTools (F12) -> Network Tab -> Refresh Page -> Click the first request (`image-fx`) -> Request Headers -> Copy the value of `Cookie`.
3.  **Set Environment Variable**:
    *   **Bash/Zsh**: `export GOOGLE_COOKIE="your_cookie_string"`
    *   **PowerShell**: `$env:GOOGLE_COOKIE = "your_cookie_string"`
    *   **CMD**: `set GOOGLE_COOKIE=your_cookie_string`

---

## 2. How to Use the Project

### A. CLI Usage (Command Line Interface)
The CLI is the primary way to interact with the tool without writing code.

#### 1. Generate Images (`generate`)
Creates images from a text prompt.
```bash
# Basic
imgfx generate --prompt "A cyberpunk city" --cookie "$GOOGLE_COOKIE"

# Advanced (Model, Aspect Ratio, Count)
imgfx generate \
  --prompt "A cute robot" \
  --model "IMAGEN_3_5" \
  --size "PORTRAIT" \
  --count 2 \
  --dir "./outputs" \
  --cookie "$GOOGLE_COOKIE"
```

#### 2. Caption Images (`caption`)
Generates a text description from an input image file.
```bash
imgfx caption --image "./photo.jpg" --type "jpeg" --cookie "$GOOGLE_COOKIE"
```

#### 3. Fetch Existing Images (`fetch`)
Downloads an image if you have its `mediaId` (useful if you generated it previously but lost the file).
```bash
imgfx fetch "media-id-string" --dir "./downloads" --cookie "$GOOGLE_COOKIE"
```

### B. Library Usage (Programmatic)
Import the library into your TypeScript/Node.js project.

```typescript
import { ImageFX, Prompt } from "@monet4292/imgfx-api";

async function main() {
  const fx = new ImageFX(process.env.GOOGLE_COOKIE);

  // 1. Simple Generation
  const images = await fx.generateImage("A sunset over Mars");
  
  // 2. Advanced Generation
  const prompt = new Prompt({
    prompt: "A futuristic car",
    aspectRatio: "IMAGE_ASPECT_RATIO_LANDSCAPE",
    generationModel: "IMAGEN_3_5",
    numberOfImages: 2
  });
  
  const advancedImages = await fx.generateImage(prompt);
  
  // Save images
  advancedImages.forEach(img => img.save("./results"));
}
```

---

## 3. How It Works (Internal Mechanics)

This project is a **reverse-engineered client**. Here is the flow of operations:

### 1. Authentication (`Account.ts`)
*   The `Account` class takes your raw cookie string.
*   It constructs a `Headers` object that mimics a real browser request (User-Agent, Origin, Referer).
*   It handles session refreshing if necessary (though primarily relies on the long-lived cookie).

### 2. Image Generation Flow (`ImageFX.ts` -> `fetchImages`)
*   **Endpoint**: `https://aisandbox-pa.googleapis.com/v1:runImageFx`
*   **Payload**: The `Prompt` object is converted into a specific JSON structure that the API expects.
*   **Process**:
    1.  The client sends a POST request with the prompt and auth headers.
    2.  The server processes the request (this can take a few seconds).
    3.  The server returns a JSON response containing a list of `generatedImages` (URLs and Metadata).
    4.  The client wraps these in `Image` objects.

### 3. Image Captioning Flow (`ImageFX.ts` -> `generateCaptionsFromImage`)
*   **Endpoint**: `https://labs.google/fx/api/trpc/backbone.captionImage`
*   **Mechanism**:
    1.  The local image file is read and converted to a **Base64 string**.
    2.  This string is embedded in a JSON payload.
    3.  The API analyzes the image and returns text candidates.

### 4. Fetching by ID (`ImageFX.ts` -> `getImageFromId`)
*   **Endpoint**: `https://labs.google/fx/api/trpc/media.fetchMedia`
*   **Mechanism**: Uses the unique `mediaKey` to query the backend for metadata of a previously generated image, allowing you to re-download it.

### Key Components
*   **`ImageFX`**: The facade/main entry point.
*   **`Prompt`**: A configuration object for the generation request (validates parameters like aspect ratio).
*   **`Image`**: A wrapper around the result, providing a `.save()` method to download the binary data from the URL to disk.
