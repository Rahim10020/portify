'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Full-Stack Developer',
        avatar: '👩‍💻',
        content: 'Portify made it incredibly easy to showcase my projects. The templates are stunning and the customization options are endless!',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'UX Designer',
        avatar: '👨‍🎨',
        content: 'As a designer, I\'m very picky about aesthetics. Portify exceeded my expectations with its beautiful templates and smooth animations.',
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Product Manager',
        avatar: '👩‍💼',
        content: 'I built my portfolio in under 30 minutes. The interface is intuitive and the results are professional. Highly recommended!',
        rating: 5,
    },
    {
        name: 'David Park',
        role: 'Frontend Developer',
        avatar: '👨‍💻',
        content: 'The best portfolio builder I\'ve used. Clean code, fast loading times, and great customization. Perfect for developers!',
        rating: 5,
    },
    {
        name: 'Lisa Wang',
        role: 'Graphic Designer',
        avatar: '👩‍🎨',
        content: 'Love how easy it is to update my portfolio. The dark mode is gorgeous and my clients are always impressed!',
        rating: 5,
    },
    {
        name: 'James Taylor',
        role: 'Software Engineer',
        avatar: '👨‍🔧',
        content: 'Finally, a portfolio platform that doesn\'t require hours of setup. I can focus on my work while Portify handles the presentation.',
        rating: 5,
    },
];

export const Testimonials = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Don't just take our word for it - hear from some of our satisfied users
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-foreground/60">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className="fill-yellow-500 text-yellow-500"
                                        />
                                    ))}
                                </div>

                                <p className="text-foreground/70 leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
