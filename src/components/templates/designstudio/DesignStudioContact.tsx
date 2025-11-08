'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Sparkles, Twitter, Linkedin, Github, Globe, Dribbble } from 'lucide-react';
import { useState } from 'react';

interface DesignStudioContactProps {
    data: PortfolioData;
}

export const DesignStudioContact = ({ data }: DesignStudioContactProps) => {
    const { personal, socials } = data;
    const themeColors = data.theme.lightMode;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isHovered, setIsHovered] = useState(false);

    const socialLinks = [
        { icon: Mail, label: 'Email', href: socials.email ? `mailto:${socials.email}` : null, color: '#EA4335' },
        { icon: Github, label: 'GitHub', href: socials.github, color: '#181717' },
        { icon: Linkedin, label: 'LinkedIn', href: socials.linkedin, color: '#0A66C2' },
        { icon: Twitter, label: 'Twitter', href: socials.twitter, color: '#1DA1F2' },
        { icon: Dribbble, label: 'Dribbble', href: socials.dribbble, color: '#EA4C89' },
        { icon: Globe, label: 'Website', href: socials.website, color: themeColors.accent },
    ].filter((link) => link.href);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:${socials.email}?subject=Contact from ${formState.name}&body=${formState.message}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: themeColors.accent }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: themeColors.accent }}
            />

            {/* Header */}
            <section className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
                        style={{ backgroundColor: `${themeColors.accent}20`, color: themeColors.accent }}
                    >
                        <Sparkles size={20} />
                        <span className="font-semibold">Let's Create Together</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Get In{' '}
                        <span style={{ color: themeColors.accent }}>Touch</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl opacity-70 leading-relaxed"
                    >
                        Have a project in mind? Let's discuss how we can work together to bring your vision to life.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-3xl shadow-2xl"
                            style={{ backgroundColor: `${themeColors.accent}10` }}
                        >
                            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-3 opacity-80">
                                        Your Name
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: `${themeColors.accent}05`,
                                            borderColor: formState.name ? themeColors.accent : 'transparent',
                                        }}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-3 opacity-80">
                                        Your Email
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: `${themeColors.accent}05`,
                                            borderColor: formState.email ? themeColors.accent : 'transparent',
                                        }}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-3 opacity-80">
                                        Message
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.02 }}
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:outline-none transition-all resize-none"
                                        style={{
                                            backgroundColor: `${themeColors.accent}05`,
                                            borderColor: formState.message ? themeColors.accent : 'transparent',
                                        }}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onHoverStart={() => setIsHovered(true)}
                                    onHoverEnd={() => setIsHovered(false)}
                                    className="w-full px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-3 relative overflow-hidden"
                                    style={{
                                        backgroundColor: themeColors.accent,
                                        color: themeColors.bg,
                                    }}
                                >
                                    <motion.div
                                        animate={isHovered ? { x: [0, 5, 0] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <Send size={20} />
                                    </motion.div>
                                    Send Message

                                    {/* Animated background on hover */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={isHovered ? { scale: 2, opacity: 0 } : {}}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 rounded-full"
                                        style={{ backgroundColor: themeColors.bg }}
                                    />
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-8"
                    >
                        {/* Direct Contact */}
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: -1 }}
                            className="p-8 rounded-3xl shadow-xl"
                            style={{ backgroundColor: `${themeColors.accent}10` }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                {socials.email && (
                                    <motion.a
                                        href={`mailto:${socials.email}`}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                            style={{ backgroundColor: `${themeColors.accent}20` }}
                                        >
                                            <Mail size={24} style={{ color: themeColors.accent }} />
                                        </div>
                                        <div>
                                            <div className="text-sm opacity-60 mb-1">Email</div>
                                            <div className="font-semibold group-hover:text-accent transition-colors">
                                                {socials.email}
                                            </div>
                                        </div>
                                    </motion.a>
                                )}

                                {personal.location && (
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                            style={{ backgroundColor: `${themeColors.accent}20` }}
                                        >
                                            <MapPin size={24} style={{ color: themeColors.accent }} />
                                        </div>
                                        <div>
                                            <div className="text-sm opacity-60 mb-1">Location</div>
                                            <div className="font-semibold">{personal.location}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            className="p-8 rounded-3xl shadow-xl"
                            style={{ backgroundColor: `${themeColors.accent}10` }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Follow Me</h3>

                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.label}
                                            href={social.href!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all"
                                            style={{ backgroundColor: `${social.color}10` }}
                                        >
                                            <Icon
                                                size={32}
                                                className="mx-auto mb-3"
                                                style={{ color: social.color }}
                                            />
                                            <div className="font-semibold text-sm">{social.label}</div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-6 rounded-2xl text-center shadow-lg"
                            style={{ backgroundColor: `${themeColors.accent}20` }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-4 h-4 rounded-full mx-auto mb-3"
                                style={{ backgroundColor: '#10B981' }}
                            />
                            <div className="font-bold text-lg mb-1">Available for Work</div>
                            <div className="text-sm opacity-70">
                                Open to new opportunities and collaborations
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Fun Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20 max-w-3xl mx-auto"
                >
                    <motion.p
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl md:text-3xl font-bold italic"
                        style={{ color: themeColors.accent }}
                    >
                        "Great things are built by great people. Let's build something amazing together."
                    </motion.p>
                </motion.div>
            </section>
        </div>
    );
};