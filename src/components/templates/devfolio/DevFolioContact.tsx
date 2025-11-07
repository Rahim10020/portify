'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Globe, Send } from 'lucide-react';
import { useState } from 'react';

interface DevFolioContactProps {
    data: PortfolioData;
}

export const DevFolioContact = ({ data }: DevFolioContactProps) => {
    const { personal, socials } = data;
    const themeColors = data.theme.darkMode;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const socialLinks = [
        { icon: Mail, label: 'Email', href: socials.email ? `mailto:${socials.email}` : null },
        { icon: Github, label: 'GitHub', href: socials.github },
        { icon: Linkedin, label: 'LinkedIn', href: socials.linkedin },
        { icon: Twitter, label: 'Twitter', href: socials.twitter },
        { icon: Globe, label: 'Website', href: socials.website },
    ].filter((link) => link.href);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This would typically send to an API or mailto link
        const mailtoLink = `mailto:${socials.email}?subject=Contact from ${formState.name}&body=${formState.message}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16"
            >
                <div className="font-mono text-sm mb-6 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> echo "Let's connect"
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
                <p className="text-xl opacity-70 max-w-2xl">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
            </motion.div>

            <div className="max-w-5xl grid md:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-80">
                                Your Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-current/20 bg-transparent focus:outline-none focus:border-current/40 transition-colors"
                                placeholder="John Doe"
                                style={{ color: themeColors.text }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-80">
                                Your Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-current/20 bg-transparent focus:outline-none focus:border-current/40 transition-colors"
                                placeholder="john@example.com"
                                style={{ color: themeColors.text }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-80">
                                Message
                            </label>
                            <textarea
                                required
                                rows={6}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-current/20 bg-transparent focus:outline-none focus:border-current/40 transition-colors resize-none"
                                placeholder="Tell me about your project..."
                                style={{ color: themeColors.text }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                            style={{
                                backgroundColor: themeColors.accent,
                                color: themeColors.bg,
                            }}
                        >
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        {/* Email */}
                        {socials.email && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2 opacity-60">
                                    <Mail size={18} />
                                    <span className="text-sm font-medium">Email</span>
                                </div>
                                <a
                                    href={`mailto:${socials.email}`}
                                    className="text-lg hover:opacity-80 transition-opacity"
                                    style={{ color: themeColors.accent }}
                                >
                                    {socials.email}
                                </a>
                            </div>
                        )}

                        {/* Location */}
                        {personal.location && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2 opacity-60">
                                    <Globe size={18} />
                                    <span className="text-sm font-medium">Location</span>
                                </div>
                                <p className="text-lg">{personal.location}</p>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                        <div className="space-y-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-lg border border-current/10 hover:border-current/30 transition-all hover:scale-105 group"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: `${themeColors.accent}20` }}
                                        >
                                            <Icon size={20} style={{ color: themeColors.accent }} />
                                        </div>
                                        <div>
                                            <div className="font-medium group-hover:text-accent transition-colors">
                                                {social.label}
                                            </div>
                                            <div className="text-sm opacity-60">
                                                {social.href?.replace(/(^\w+:|^)\/\//, '')}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="border border-current/10 rounded-lg p-6">
                        <h3 className="font-bold mb-3">Availability</h3>
                        <p className="opacity-70">
                            I'm currently available for freelance work and open to new opportunities.
                            Feel free to reach out!
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};