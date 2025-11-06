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
        <div className="py-20">
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
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-foreground/20 mb-2">
                                                {template.name}
                                            </div>
                                            <div className="text-sm text-foreground/40">Preview Coming Soon</div>
                                        </div>
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