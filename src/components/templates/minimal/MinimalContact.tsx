'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

interface MinimalContactProps {
    data: PortfolioData;
}

export const MinimalContact = ({ data }: MinimalContactProps) => {
    const { personal, socials } = data;
    const themeColors = data.theme.lightMode;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const socialLinks = [
        { label: 'Email', href: socials.email ? `mailto:${socials.email}` : null, value: socials.email },
        { label: 'GitHub', href: socials.github, value: socials.github?.replace('https://', '') },
        { label: 'LinkedIn', href: socials.linkedin, value: socials.linkedin?.replace('https://', '') },
        { label: 'Twitter', href: socials.twitter, value: socials.twitter?.replace('https://', '') },
        { label: 'Website', href: socials.website, value: socials.website?.replace('https://', '') },
    ].filter((link) => link.href);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:${socials.email}?subject=Contact from ${formState.name}&body=${formState.message}`;
        window.location.href = mailtoLink;
    };

    return (
        <div>
            {/* Header */}
            <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Contact</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight mb-8">
                        Let's Work Together
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-60 max-w-2xl">
                        I'm always interested in hearing about new projects and opportunities.
                    </p>
                </motion.div>
            </section>

            {/* Contact Content */}
            <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider opacity-40 mb-3">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none transition-colors text-lg"
                                        style={{ borderColor: formState.name ? themeColors.text : themeColors.text + '20' }}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider opacity-40 mb-3">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none transition-colors text-lg"
                                        style={{ borderColor: formState.email ? themeColors.text : themeColors.text + '20' }}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider opacity-40 mb-3">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-0 py-3 border-b-2 bg-transparent focus:outline-none transition-colors text-lg resize-none"
                                        style={{ borderColor: formState.message ? themeColors.text : themeColors.text + '20' }}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ x: 5 }}
                                    className="inline-flex items-center gap-2 px-8 py-4 border hover:bg-current hover:text-white transition-colors"
                                    style={{ borderColor: themeColors.text }}
                                >
                                    <Send size={18} />
                                    <span className="uppercase text-sm tracking-wider">Send Message</span>
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-5 space-y-12"
                        >
                            {/* Direct Contact */}
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-40 mb-6">Direct Contact</p>
                                <div className="space-y-6">
                                    {socials.email && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 opacity-40">
                                                <Mail size={16} />
                                                <span className="text-xs uppercase tracking-wider">Email</span>
                                            </div>
                                            <a
                                                href={`mailto:${socials.email}`}
                                                className="text-lg hover:opacity-60 transition-opacity"
                                            >
                                                {socials.email}
                                            </a>
                                        </div>
                                    )}

                                    {personal.location && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 opacity-40">
                                                <MapPin size={16} />
                                                <span className="text-xs uppercase tracking-wider">Location</span>
                                            </div>
                                            <p className="text-lg">{personal.location}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-40 mb-6">Online</p>
                                <div className="space-y-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 5 }}
                                            className="group flex items-center justify-between py-3 border-b transition-colors"
                                            style={{ borderColor: themeColors.text + '20' }}
                                        >
                                            <div>
                                                <div className="text-xs uppercase tracking-wider opacity-40 mb-1">
                                                    {social.label}
                                                </div>
                                                <div className="text-sm group-hover:opacity-60 transition-opacity">
                                                    {social.value}
                                                </div>
                                            </div>
                                            <ArrowUpRight
                                                size={16}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="border-l-2 pl-6 transition-colors" style={{ borderColor: themeColors.text + '40' }}>
                                <p className="text-xs uppercase tracking-wider opacity-40 mb-3">Availability</p>
                                <p className="text-sm leading-relaxed opacity-60">
                                    Currently available for freelance work and new opportunities.
                                    Response time: 24-48 hours.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl lg:text-3xl font-light tracking-tight opacity-60"
                    >
                        "Good design is as little design as possible"
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm uppercase tracking-wider opacity-40 mt-4"
                    >
                        — Dieter Rams
                    </motion.p>
                </div>
            </section>
        </div>
    );
};