import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getTemplateBySlug } from '@/lib/constants/templates';
import { ROUTES } from '@/lib/constants/routes';
import { ArrowLeft } from 'lucide-react';
import { TemplatePreview } from '@/components/templates/TemplatePreview';

export default async function TemplatePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const template = getTemplateBySlug(slug);

    if (!template) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-16 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={ROUTES.TEMPLATES}>
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft size={16} className="mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-semibold text-foreground">{template.name}</h1>
                                <Badge variant={template.tier === 'free' ? 'success' : 'default'}>
                                    {template.tier === 'free' ? 'Free' : 'Pro'}
                                </Badge>
                            </div>
                        </div>
                        <Link href={ROUTES.CREATE}>
                            <Button>Use This Template</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="container mx-auto px-4 py-8">
                <TemplatePreview templateId={template.id} templateName={template.name} />

                {/* Template Details */}
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">About This Template</h2>
                        <p className="text-foreground/70 mb-6">{template.description}</p>

                        <h3 className="font-semibold text-foreground mb-3">Features</h3>
                        <ul className="space-y-2">
                            {template.features.darkMode && (
                                <li className="flex items-center gap-2 text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Dark mode support
                                </li>
                            )}
                            {template.features.projectDetail && (
                                <li className="flex items-center gap-2 text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Detailed project pages
                                </li>
                            )}
                            <li className="flex items-center gap-2 text-foreground/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Fully responsive design
                            </li>
                            <li className="flex items-center gap-2 text-foreground/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                SEO optimized
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Available Pages</h2>
                        <div className="space-y-2">
                            {template.availablePages.map((page) => (
                                <div
                                    key={page}
                                    className="px-4 py-3 rounded-lg bg-muted border border-border"
                                >
                                    <span className="font-medium text-foreground capitalize">{page}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}