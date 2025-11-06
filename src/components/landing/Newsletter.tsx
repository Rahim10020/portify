'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { subscribeToNewsletter } from '@/lib/firebase/firestore';
import { newsletterSchema, NewsletterInput } from '@/lib/utils/validation';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewsletterInput>({
        resolver: zodResolver(newsletterSchema),
    });

    const onSubmit = async (data: NewsletterInput) => {
        try {
            setLoading(true);
            await subscribeToNewsletter(data.email, 'landing');
            toast.success('Successfully subscribed to our newsletter!');
            reset();
        } catch (error: any) {
            toast.error(error.message || 'Failed to subscribe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Mail className="text-primary" size={32} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Stay in the Loop
                    </h2>
                    <p className="text-lg text-foreground/70 mb-8">
                        Get updates on new templates, features, and tips to make your portfolio stand out.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                error={errors.email?.message}
                                {...register('email')}
                            />
                        </div>
                        <Button type="submit" isLoading={loading} className="sm:w-auto">
                            Subscribe
                        </Button>
                    </form>

                    <p className="text-sm text-foreground/60 mt-4">
                        No spam. Unsubscribe anytime.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};