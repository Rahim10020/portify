'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Is Portify really free?',
        answer: 'Yes! Our free plan includes 1 portfolio with up to 6 projects and all essential features. You can upgrade to a paid plan for additional features and unlimited portfolios.',
    },
    {
        question: 'Do I need coding skills to use Portify?',
        answer: 'Not at all! Portify is designed to be completely no-code. Simply choose a template, fill in your information, and your portfolio is ready to go.',
    },
    {
        question: 'Can I use my own custom domain?',
        answer: 'Yes, with our Pro plan you can connect your own custom domain to make your portfolio truly yours.',
    },
    {
        question: 'How do I update my portfolio after creating it?',
        answer: 'You can update your portfolio anytime from your dashboard. All changes are instantly reflected on your live portfolio.',
    },
    {
        question: 'Are the templates mobile-responsive?',
        answer: 'Absolutely! All our templates are fully responsive and look great on all devices - desktop, tablet, and mobile.',
    },
    {
        question: 'Can I switch templates after creating my portfolio?',
        answer: 'Yes, you can switch between templates at any time without losing your content. Your projects and information will automatically adapt to the new template.',
    },
    {
        question: 'How long does it take to create a portfolio?',
        answer: 'Most users create their portfolio in under 30 minutes. With our intuitive interface and pre-built templates, you can go from zero to published in no time.',
    },
    {
        question: 'Do you provide analytics?',
        answer: 'Yes! Pro users get access to detailed analytics including views, visitor demographics, and engagement metrics to help you understand your audience.',
    },
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        Got questions? We've got answers. Can't find what you're looking for? Contact us!
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        size={20}
                                        className={`text-foreground/70 transition-transform flex-shrink-0 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </div>
                                {openIndex === index && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 text-foreground/70 leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.p>
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
