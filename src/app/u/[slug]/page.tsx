'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPortfolioBySlug, incrementPortfolioViews } from '@/lib/firebase/portfolios';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Portfolio } from '@/types';
import { Loader2 } from 'lucide-react';

export default function PublicPortfolioPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const data = await getPortfolioBySlug(slug);

                if (!data) {
                    setError('Portfolio not found');
                    return;
                }

                // Check if published
                if (!data.isPublished) {
                    setError('This portfolio is not published');
                    return;
                }

                setPortfolio(data);

                // Increment views
                await incrementPortfolioViews(data.id);
            } catch (err) {
                console.error('Error loading portfolio:', err);
                setError('Failed to load portfolio');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadPortfolio();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-foreground/70 text-lg">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        {error === 'Portfolio not found' ? 'Portfolio Not Found' : 'Not Available'}
                    </h1>
                    <p className="text-foreground/70 mb-8">
                        {error === 'Portfolio not found'
                            ? "The portfolio you're looking for doesn't exist."
                            : "This portfolio is not published yet."}
                    </p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Go to Homepage
                    </a>
                </div>
            </div>
        );
    }

    return <TemplateRenderer portfolio={portfolio} page="home" />;
}