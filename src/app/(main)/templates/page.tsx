'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TEMPLATES } from '@/lib/constants/templates';
import { ROUTES } from '@/lib/constants/routes';
import { Eye } from 'lucide-react';

export default function TemplatesPage() {
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
                        Choose Your Template
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Select from our collection of professionally designed templates
                    </motion.p>
                </div>

                {/* Templates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TEMPLATES.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover className="h-full">
                                {/* Template Preview */}
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-background via-muted/30 to-muted/50 mb-4 border border-border">
                                    {/* Browser mockup header */}
                                    <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2 bg-muted/80 border-b border-border">
                                        <div className="w-2 h-2 rounded-full bg-red-500/70" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/70" />
                                    </div>

                                    {/* Template mockup content */}
                                    <div className="absolute inset-0 pt-8 p-4">
                                        <div className="h-full flex flex-col gap-2">
                                            <div className="h-6 w-24 bg-primary/30 rounded" />
                                            <div className="h-3 w-full bg-muted rounded" />
                                            <div className="h-3 w-3/4 bg-muted rounded" />
                                            <div className="flex-1 grid grid-cols-2 gap-2 mt-2">
                                                <div className="bg-muted/50 rounded border border-border" />
                                                <div className="bg-muted/50 rounded border border-border" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="text-sm font-semibold text-primary">View Preview</div>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-foreground">{template.name}</h3>
                                        <Badge variant={template.tier === 'free' ? 'success' : 'default'}>
                                            {template.tier === 'free' ? 'Free' : 'Pro'}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-foreground/70">{template.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {template.features.darkMode && (
                                            <Badge variant="secondary">Dark Mode</Badge>
                                        )}
                                        {template.features.projectDetail && (
                                            <Badge variant="secondary">Project Pages</Badge>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Link href={ROUTES.TEMPLATE_PREVIEW(template.slug)} className="flex-1">
                                            <Button variant="secondary" className="w-full" size="sm">
                                                <Eye size={16} className="mr-2" />
                                                Preview
                                            </Button>
                                        </Link>
                                        <Link href={ROUTES.CREATE} className="flex-1">
                                            <Button className="w-full" size="sm">
                                                Use Template
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}