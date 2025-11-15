'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, Video, FileText, Lightbulb, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

const resources = {
    guides: [
        {
            title: 'Getting Started with Portify',
            description: 'Learn the basics of creating your first portfolio in minutes',
            icon: BookOpen,
            type: 'Guide',
            readTime: '5 min read',
        },
        {
            title: 'Customizing Your Template',
            description: 'Master template customization and make your portfolio unique',
            icon: FileText,
            type: 'Tutorial',
            readTime: '8 min read',
        },
        {
            title: 'SEO Best Practices',
            description: 'Optimize your portfolio for search engines and increase visibility',
            icon: Lightbulb,
            type: 'Guide',
            readTime: '10 min read',
        },
    ],
    videos: [
        {
            title: 'Portfolio Creation Walkthrough',
            description: 'Step-by-step video guide to building your portfolio',
            duration: '12:30',
        },
        {
            title: 'Design Tips for Developers',
            description: 'Learn design principles to make your portfolio stand out',
            duration: '8:45',
        },
        {
            title: 'Showcasing Your Projects',
            description: 'How to effectively present your work to potential employers',
            duration: '15:20',
        },
    ],
    templates: [
        {
            title: 'Resume Templates',
            description: 'Professional resume templates to complement your portfolio',
            downloads: 523,
        },
        {
            title: 'Project Description Template',
            description: 'Structure your project descriptions for maximum impact',
            downloads: 412,
        },
        {
            title: 'Color Scheme Guide',
            description: 'Pre-made color palettes for your portfolio design',
            downloads: 687,
        },
    ],
};

const blogPosts = [
    {
        title: 'How to Write a Compelling About Section',
        excerpt: 'Your about section is your chance to tell your story. Learn how to make it memorable and engaging.',
        date: 'March 15, 2024',
        readTime: '6 min',
    },
    {
        title: 'Portfolio vs Resume: What\'s the Difference?',
        excerpt: 'Understanding when to use a portfolio versus a resume and how they complement each other.',
        date: 'March 10, 2024',
        readTime: '5 min',
    },
    {
        title: '10 Portfolio Mistakes to Avoid',
        excerpt: 'Common pitfalls that can hurt your portfolio\'s effectiveness and how to avoid them.',
        date: 'March 5, 2024',
        readTime: '8 min',
    },
];

export default function ResourcesPage() {
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
                        Resources & Guides
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Everything you need to create an outstanding portfolio
                    </motion.p>
                </div>

                {/* Guides & Tutorials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Guides & Tutorials</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resources.guides.map((guide, index) => {
                            const Icon = guide.icon;
                            return (
                                <motion.div
                                    key={guide.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card hover className="h-full">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            <Icon className="text-primary" size={24} />
                                        </div>
                                        <div className="text-xs font-medium text-primary mb-2">
                                            {guide.type}
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {guide.title}
                                        </h3>
                                        <p className="text-sm text-foreground/70 mb-4">
                                            {guide.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-foreground/60">
                                                {guide.readTime}
                                            </span>
                                            <Button variant="ghost" size="sm">
                                                Read More
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Video Tutorials */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Video Tutorials</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resources.videos.map((video, index) => (
                            <motion.div
                                key={video.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover className="h-full">
                                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Video className="text-foreground/20" size={48} />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-foreground/70 mb-4">
                                        {video.description}
                                    </p>
                                    <Button variant="secondary" className="w-full" size="sm">
                                        <Video size={16} className="mr-2" />
                                        Watch Now
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Downloadable Templates */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Downloadable Templates</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {resources.templates.map((template, index) => (
                            <motion.div
                                key={template.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover className="h-full">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <FileText className="text-primary" size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {template.title}
                                    </h3>
                                    <p className="text-sm text-foreground/70 mb-4">
                                        {template.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-foreground/60">
                                            {template.downloads} downloads
                                        </span>
                                        <Button variant="ghost" size="sm">
                                            <Download size={16} className="mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Latest Articles</h2>
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover>
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                                            <div className="flex items-center gap-4 text-sm text-foreground/60">
                                                <span>{post.date}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            <ExternalLink size={16} />
                                        </Button>
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
                    className="text-center"
                >
                    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Need More Help?
                        </h3>
                        <p className="text-foreground/70 mb-6">
                            Can't find what you're looking for? Get in touch with our support team
                        </p>
                        <Link href={ROUTES.CONTACT}>
                            <Button size="lg">Contact Support</Button>
                        </Link>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
