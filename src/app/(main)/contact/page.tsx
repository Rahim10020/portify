'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'support@portify.app',
            link: 'mailto:support@portify.app',
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            content: 'Available 9AM - 5PM EST',
            link: '#',
        },
        {
            icon: MapPin,
            title: 'Location',
            content: 'San Francisco, CA',
            link: '#',
        },
    ];

    const faqs = [
        {
            question: 'How quickly do you respond?',
            answer: 'We typically respond within 24 hours during business days.',
        },
        {
            question: 'Do you offer phone support?',
            answer: 'Currently, we provide support via email and live chat.',
        },
        {
            question: 'Can I schedule a demo?',
            answer: 'Yes! Include "Demo Request" in your subject line and we\'ll reach out.',
        },
    ];

    return (
        <div className="py-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-foreground/70 max-w-2xl mx-auto"
                    >
                        Have a question or need help? We're here to assist you
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Contact Info Cards */}
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hover className="text-center h-full">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="text-primary" size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {info.title}
                                    </h3>
                                    <a
                                        href={info.link}
                                        className="text-foreground/70 hover:text-primary transition-colors"
                                    >
                                        {info.content}
                                    </a>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Your Name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />

                                <Textarea
                                    label="Message"
                                    placeholder="Tell us more about your question or feedback..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={6}
                                    required
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isSubmitting}
                                >
                                    <Send size={18} className="mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <Card key={index}>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {faq.question}
                                        </h3>
                                        <p className="text-sm text-foreground/70">{faq.answer}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Looking for Resources?
                            </h3>
                            <p className="text-foreground/70 mb-4">
                                Check out our comprehensive guides, tutorials, and documentation
                            </p>
                            <Button variant="secondary" className="w-full">
                                Visit Resources
                            </Button>
                        </Card>

                        <Card className="bg-muted/30">
                            <h3 className="text-lg font-semibold text-foreground mb-3">
                                Response Time
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/70">General Inquiries</span>
                                    <span className="font-medium text-foreground">24 hours</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/70">Technical Support</span>
                                    <span className="font-medium text-foreground">12 hours</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/70">Urgent Issues</span>
                                    <span className="font-medium text-foreground">2-4 hours</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
