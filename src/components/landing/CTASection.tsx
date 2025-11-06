'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 md:p-20 text-center"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Build Your Portfolio?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join hundreds of professionals who've already created their stunning portfolios.
                            Get started for free today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={ROUTES.SIGNUP}>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-primary hover:bg-white/90 group"
                                >
                                    Start Building Now
                                    <ArrowRight
                                        size={20}
                                        className="ml-2 group-hover:translate-x-1 transition-transform"
                                    />
                                </Button>
                            </Link>
                            <Link href={ROUTES.TEMPLATES}>
                                <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                                    Browse Templates
                                </Button>
                            </Link>
                        </div>

                        <p className="text-sm text-white/80 mt-6">
                            No credit card required • Free forever plan
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};