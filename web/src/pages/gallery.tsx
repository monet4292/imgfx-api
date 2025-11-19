import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from '@/lib/history';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Gallery() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleDelete = (id: string) => {
        const updated = deleteHistoryItem(id);
        setHistory(updated);
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            clearHistory();
            setHistory([]);
        }
    };

    return (
        <Layout>
            <Head>
                <title>ImageFX Web - Gallery</title>
            </Head>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Gallery
                        </h1>
                        <p className="text-muted-foreground">
                            Your locally saved generation history.
                        </p>
                    </div>
                    {history.length > 0 && (
                        <Button variant="destructive" onClick={handleClear}>
                            Clear History
                        </Button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No images generated yet. Go create some!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {history.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-lg">{item.prompt}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(item.timestamp).toLocaleString()} • {item.model}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        {item.images.map((img, idx) => (
                                            <div key={idx} className="relative group">
                                                <img
                                                    src={img}
                                                    alt={`${item.prompt} - ${idx}`}
                                                    className="w-full h-auto rounded-md object-cover transition-transform hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                                    <Button variant="secondary" size="sm" asChild>
                                                        <a href={img} download={`imgfx-${item.timestamp}-${idx}.png`}>
                                                            Download
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
