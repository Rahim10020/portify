'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, ExternalLink, User } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

// Mock data for showcase portfolios
const showcasePortfolios = [
    {
        id: '1',
        owner: 'Sarah Johnson',
        username: 'sarah-dev',
        avatar: '👩‍💻',
        title: 'Full-Stack Developer Portfolio',
        description: 'Clean and modern portfolio showcasing web development projects',
        template: 'DevFolio',
        views: 1250,
        tags: ['Developer', 'React', 'Node.js'],
        featured: true,
    },
    {
        id: '2',
        owner: 'Michael Chen',
        username: 'mike-design',
        avatar: '👨‍🎨',
        title: 'Creative Design Portfolio',
        description: 'Bold and creative showcase of design work and branding projects',
        template: 'Design Studio',
        views: 980,
        tags: ['Designer', 'UI/UX', 'Branding'],
        featured: true,
    },
    {
        id: '3',
        owner: 'Emily Rodriguez',
        username: 'emily-pm',
        avatar: '👩‍💼',
        title: 'Product Manager Portfolio',
        description: 'Professional portfolio highlighting product management experience',
        template: 'Minimal',
        views: 756,
        tags: ['Product Manager', 'Strategy'],
        featured: false,
    },
    {
        id: '4',
        owner: 'David Park',
        username: 'david-frontend',
        avatar: '👨‍💻',
        title: 'Frontend Developer Showcase',
        description: 'Interactive portfolio featuring modern frontend projects',
        template: 'DevFolio',
        views: 632,
        tags: ['Frontend', 'Vue.js', 'TypeScript'],
        featured: false,
    },
    {
        id: '5',
        owner: 'Lisa Wang',
        username: 'lisa-graphics',
        avatar: '👩‍🎨',
        title: 'Graphic Designer Portfolio',
        description: 'Visual showcase of graphic design and illustration work',
        template: 'Design Studio',
        views: 521,
        tags: ['Graphics', 'Illustration'],
        featured: false,
    },
    {
        id: '6',
        owner: 'James Taylor',
        username: 'james-backend',
        avatar: '👨‍🔧',
        title: 'Backend Engineer Portfolio',
        description: 'Technical portfolio focusing on backend architecture and APIs',
        template: 'Minimal',
        views: 445,
        tags: ['Backend', 'Python', 'API'],
        featured: false,
    },
];

export default function ShowcasePage() {
    return (
        <div className="py-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Portfolio Showcase
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8"
                    >
                        Get inspired by amazing portfolios created with Portify
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center gap-3"
                    >
                        <Link href={ROUTES.TEMPLATES}>
                            <Button>Browse Templates</Button>
                        </Link>
                        <Link href={ROUTES.CREATE}>
                            <Button variant="secondary">Create Your Own</Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Featured Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Featured Portfolios</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {showcasePortfolios
                            .filter((p) => p.featured)
                            .map((portfolio, index) => (
                                <motion.div
                                    key={portfolio.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card hover className="h-full">
                                        {/* Preview Image */}
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-muted/50 mb-4 border border-border">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-6xl">{portfolio.avatar}</div>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <Badge variant="default">Featured</Badge>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                                    {portfolio.avatar}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground">
                                                        {portfolio.owner}
                                                    </h3>
                                                    <p className="text-sm text-foreground/60">
                                                        @{portfolio.username}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-foreground mb-1">
                                                    {portfolio.title}
                                                </h4>
                                                <p className="text-sm text-foreground/70">
                                                    {portfolio.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {portfolio.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center gap-4 text-sm text-foreground/60">
                                                    <div className="flex items-center gap-1">
                                                        <Eye size={16} />
                                                        <span>{portfolio.views}</span>
                                                    </div>
                                                    <Badge variant="secondary">{portfolio.template}</Badge>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    <ExternalLink size={16} className="mr-2" />
                                                    View
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>
                </div>

                {/* All Portfolios */}
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">All Portfolios</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {showcasePortfolios.map((portfolio, index) => (
                            <motion.div
                                key={portfolio.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card hover className="h-full">
                                    {/* Preview */}
                                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 mb-4 border border-border">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl">{portfolio.avatar}</div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                                {portfolio.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground text-sm">
                                                    {portfolio.owner}
                                                </h4>
                                            </div>
                                        </div>

                                        <p className="text-sm text-foreground/70 line-clamp-2">
                                            {portfolio.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1 text-xs text-foreground/60">
                                                <Eye size={14} />
                                                <span>{portfolio.views}</span>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Ready to Create Your Portfolio?
                        </h3>
                        <p className="text-foreground/70 mb-6">
                            Join hundreds of professionals showcasing their work with Portify
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={ROUTES.SIGNUP}>
                                <Button size="lg">Get Started Free</Button>
                            </Link>
                            <Link href={ROUTES.TEMPLATES}>
                                <Button size="lg" variant="secondary">
                                    Browse Templates
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
