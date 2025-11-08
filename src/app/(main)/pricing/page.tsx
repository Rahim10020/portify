'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';
import { Check } from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: 'Free',
            price: '0',
            description: 'Perfect for getting started',
            features: [
                '1 Portfolio',
                '6 Projects',
                '3 Basic Templates',
                'Custom URL',
                'Basic Analytics',
            ],
            limitations: [
                'Watermark included',
                'No dark mode',
                'Limited customization',
            ],
            cta: 'Get Started',
            href: ROUTES.SIGNUP,
            highlighted: false,
        },
        {
            name: 'Pro',
            price: '12',
            description: 'For professionals who want more',
            features: [
                'Unlimited Portfolios',
                'Unlimited Projects',
                'All Templates (Premium included)',
                'Dark Mode Support',
                'Full Customization',
                'No Watermark',
                'Custom Domain',
                'Advanced Analytics',
                'Priority Support',
            ],
            limitations: [],
            cta: 'Upgrade to Pro',
            href: ROUTES.SIGNUP,
            highlighted: true,
        },
    ];

    return (
        <div className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Simple, Transparent Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Start free, upgrade when you need more features
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <Card
                                className={`h-full ${plan.highlighted
                                    ? 'ring-2 ring-primary border-primary relative'
                                    : ''
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-foreground/70 mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-5xl font-bold text-foreground">
                                            €{plan.price}
                                        </span>
                                        <span className="text-foreground/70">/month</span>
                                    </div>
                                </div>

                                <Link href={plan.href} className="block mb-6">
                                    <Button
                                        className="w-full"
                                        variant={plan.highlighted ? 'primary' : 'secondary'}
                                        size="lg"
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>

                                <div className="space-y-3">
                                    <div className="font-semibold text-foreground mb-3">What's included:</div>
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground/70">{feature}</span>
                                        </div>
                                    ))}

                                    {plan.limitations.length > 0 && (
                                        <>
                                            <div className="pt-4 font-semibold text-foreground/70 text-sm">
                                                Limitations:
                                            </div>
                                            {plan.limitations.map((limitation) => (
                                                <div key={limitation} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                    <span className="text-foreground/50 text-sm">{limitation}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <Card>
                            <h3 className="font-semibold text-foreground mb-2">
                                Can I upgrade or downgrade my plan?
                            </h3>
                            <p className="text-foreground/70">
                                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected
                                immediately.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="font-semibold text-foreground mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-foreground/70">
                                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.
                            </p>
                        </Card>

                        <Card>
                            <h3 className="font-semibold text-foreground mb-2">
                                Is there a free trial for Pro?
                            </h3>
                            <p className="text-foreground/70">
                                The free plan is available forever. You can upgrade to Pro anytime to unlock
                                additional features.
                            </p>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}