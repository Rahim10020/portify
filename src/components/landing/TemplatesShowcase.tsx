'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TEMPLATES } from '@/lib/constants/templates';
import { ROUTES } from '@/lib/constants/routes';
import { ArrowRight } from 'lucide-react';

export const TemplatesShowcase = () => {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Choose Your Perfect Template
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Professionally designed templates for every profession
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {TEMPLATES.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={ROUTES.TEMPLATE_PREVIEW(template.slug)}>
                                <div className="group cursor-pointer">
                                    <div className="relative rounded-xl overflow-hidden border border-border bg-muted mb-4 aspect-video hover:shadow-2xl transition-all duration-300">
                                        {/* Placeholder for template preview */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-foreground/20 mb-2">
                                                    {template.name}
                                                </div>
                                                <div className="text-sm text-foreground/40">Preview Coming Soon</div>
                                            </div>
                                        </div>

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Button variant="secondary" size="sm">
                                                Preview Template
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {template.name}
                                            </h3>
                                            <Badge variant={template.tier === 'free' ? 'success' : 'default'}>
                                                {template.tier === 'free' ? 'Free' : 'Pro'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-foreground/70">{template.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link href={ROUTES.TEMPLATES}>
                        <Button size="lg" variant="secondary" className="group">
                            View All Templates
                            <ArrowRight
                                size={20}
                                className="ml-2 group-hover:translate-x-1 transition-transform"
                            />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};