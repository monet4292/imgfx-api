import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageFX, Prompt, Model, AspectRatio } from '@monet4292/imgfx-api';

type Data = {
    images?: string[];
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, cookie, model, aspectRatio, count } = req.body;

    if (!cookie) {
        return res.status(401).json({ error: 'Cookie is required' });
    }

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const fx = new ImageFX(cookie);

        const promptObj = new Prompt({
            prompt: prompt,
            generationModel: (model as Model) || "IMAGEN_3_5",
            aspectRatio: (aspectRatio as AspectRatio) || "IMAGE_ASPECT_RATIO_LANDSCAPE",
            numberOfImages: count || 2,
        });

        const images = await fx.generateImage(promptObj);
        const imageUrls = images.map(img => `data:image/png;base64,${img.encodedImage}`);

        res.status(200).json({ images: imageUrls });
    } catch (error: any) {
        console.error("Generation error:", error);
        res.status(500).json({ error: error.message || 'Failed to generate images' });
    }
}
