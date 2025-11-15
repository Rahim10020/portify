'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPortfolioBySlug } from '@/lib/firebase/firestore';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Portfolio } from '@/types';
import { Loader2 } from 'lucide-react';

export default function PublicProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const projectId = params.projectId as string;

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

                if (!data.isPublished) {
                    setError('This portfolio is not published');
                    return;
                }

                // Check if project exists
                const projectExists = data.data.projects.some((p) => p.id === projectId);
                if (!projectExists) {
                    setError('Project not found');
                    return;
                }

                setPortfolio(data);
            } catch (err) {
                setError('Failed to load portfolio');
            } finally {
                setLoading(false);
            }
        };

        if (slug && projectId) {
            loadPortfolio();
        }
    }, [slug, projectId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-foreground/70 text-lg">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !portfolio) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
                    <p className="text-foreground/70 mb-8">
                        {error || "The project you're looking for doesn't exist."}
                    </p>
                    <a
                        href={`/u/${slug}/projects`}
                        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Back to Projects
                    </a>
                </div>
            </div>
        );
    }

    return <TemplateRenderer portfolio={portfolio} page={`projects/${projectId}`} />;
}