'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, Edit3, Share2 } from 'lucide-react';

const steps = [
    {
        icon: MousePointerClick,
        number: '01',
        title: 'Choose a Template',
        description: 'Browse our collection and pick the perfect template for your style.',
    },
    {
        icon: Edit3,
        number: '02',
        title: 'Add Your Content',
        description: 'Fill in your information, upload projects, and customize your portfolio.',
    },
    {
        icon: Share2,
        number: '03',
        title: 'Share & Shine',
        description: 'Get your unique link and share your portfolio with the world.',
    },
];

export const HowItWorks = () => {
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
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Three simple steps to your professional portfolio
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-border -translate-x-1/2" />
                            )}

                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6 border-4 border-background shadow-xl">
                                    <step.icon className="text-primary" size={32} />
                                </div>

                                <div className="text-sm font-bold text-primary mb-2">{step.number}</div>
                                <h3 className="text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                                <p className="text-foreground/70">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};