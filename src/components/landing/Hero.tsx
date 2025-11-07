'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
    const { isAuthenticated } = useAuth();
    return (
        <section className="relative overflow-hidden py-20 md:py-32">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
                    >
                        <Sparkles size={16} />
                        <span>Create your portfolio in minutes</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                    >
                        Your Professional Portfolio,{' '}
                        <span className="text-primary">No Code Required</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Choose from stunning templates, add your projects, and share your work with the world.
                        Perfect for developers, designers, and creators.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {isAuthenticated ? (
                            <>
                                <Link href={ROUTES.DASHBOARD}>
                                    <Button size="lg" className="group">
                                        Go to Dashboard
                                        <ArrowRight
                                            size={20}
                                            className="ml-2 group-hover:translate-x-1 transition-transform"
                                        />
                                    </Button>
                                </Link>
                                <Link href={ROUTES.CREATE}>
                                    <Button size="lg" variant="secondary">
                                        Create Portfolio
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={ROUTES.SIGNUP}>
                                    <Button size="lg" className="group">
                                        Get Started Free
                                        <ArrowRight
                                            size={20}
                                            className="ml-2 group-hover:translate-x-1 transition-transform"
                                        />
                                    </Button>
                                </Link>
                                <Link href={ROUTES.TEMPLATES}>
                                    <Button size="lg" variant="secondary">
                                        Browse Templates
                                    </Button>
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 flex items-center justify-center gap-8 text-sm text-foreground/60"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-muted border-2 border-background"
                                    />
                                ))}
                            </div>
                            <span>500+ portfolios created</span>
                        </div>
                        <div className="hidden sm:block h-4 w-px bg-border" />
                        <span className="hidden sm:inline">No credit card required</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};