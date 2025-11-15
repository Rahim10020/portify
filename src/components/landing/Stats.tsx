'use client';

import { motion } from 'framer-motion';
import { Users, Folder, Eye, Zap } from 'lucide-react';

const stats = [
    {
        icon: Users,
        value: '500+',
        label: 'Active Users',
        description: 'Professionals using Portify',
    },
    {
        icon: Folder,
        value: '1,200+',
        label: 'Portfolios Created',
        description: 'Beautiful portfolios live',
    },
    {
        icon: Eye,
        value: '50K+',
        label: 'Total Views',
        description: 'Portfolio impressions',
    },
    {
        icon: Zap,
        value: '99.9%',
        label: 'Uptime',
        description: 'Always available',
    },
];

export const Stats = () => {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Trusted by Creators Worldwide
                    </h2>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Join thousands of professionals who have built their online presence with Portify
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                                    <Icon className="text-primary" size={32} />
                                </div>
                                <div className="text-4xl font-bold text-foreground mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg font-semibold text-foreground mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-foreground/60">
                                    {stat.description}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
