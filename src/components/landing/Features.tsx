'use client';

import { motion } from 'framer-motion';
import { Zap, Palette, Share2, BarChart3, Globe, Lock } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast Setup',
        description: 'Get your portfolio live in under 5 minutes. No coding, no hassle.',
    },
    {
        icon: Palette,
        title: 'Beautiful Templates',
        description: 'Choose from professionally designed templates crafted for your profession.',
    },
    {
        icon: Share2,
        title: 'Easy Sharing',
        description: 'Get a unique URL to share your portfolio anywhere, anytime.',
    },
    {
        icon: BarChart3,
        title: 'Track Performance',
        description: 'See who visits your portfolio with built-in analytics.',
    },
    {
        icon: Globe,
        title: 'Custom Domain',
        description: 'Use your own domain name to make it truly yours.',
    },
    {
        icon: Lock,
        title: 'Secure & Reliable',
        description: 'Your data is safe with enterprise-grade security.',
    },
];

export const Features = () => {
    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Everything you need to shine
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        All the tools and features to create a stunning portfolio that stands out
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <feature.icon className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-foreground/70">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};