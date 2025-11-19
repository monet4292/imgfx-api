import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useCookie } from '@/context/CookieContext';
import { useState } from 'react';
import { AspectRatio, Model } from '@monet4292/imgfx-api';
import Head from 'next/head';
import { addToHistory } from '@/lib/history';

export default function Home() {
  const { isConfigured, cookie } = useCookie();
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<string>('IMAGEN_3_5');
  const [aspectRatio, setAspectRatio] = useState<string>('IMAGE_ASPECT_RATIO_LANDSCAPE');
  const [count, setCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!isConfigured) {
      setError('Please configure your Google Cookie in settings first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setImages([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          cookie,
          model,
          aspectRatio,
          count,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate images');
      }

      setImages(data.images);

      // Save to history
      addToHistory({
        prompt,
        model,
        images: data.images
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>ImageFX Web - Generate</title>
      </Head>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Generate Images
          </h1>
          <p className="text-muted-foreground">
            Create stunning visuals using Google's ImageFX models.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Prompt</label>
              <Input
                placeholder="A cyberpunk city in the rain..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Model).map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Aspect Ratio</label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AspectRatio).map((r) => (
                      <SelectItem key={r} value={r}>
                        {r.replace('IMAGE_ASPECT_RATIO_', '')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Count</label>
                <Select value={count.toString()} onValueChange={(v) => setCount(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Count" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleGenerate}
              disabled={loading || !isConfigured}
            >
              {loading ? 'Generating...' : 'Generate Images'}
            </Button>
          </CardContent>
        </Card>

        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <Card key={idx} className="overflow-hidden">
                <img src={img} alt={`Generated ${idx}`} className="w-full h-auto object-cover" />
                <div className="p-2 flex justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={img} download={`generated-${idx}.png`}>Download</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
