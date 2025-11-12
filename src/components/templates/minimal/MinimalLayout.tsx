'use client';

import { useState, useEffect } from 'react';
import { Portfolio } from '@/types';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MinimalLayoutProps {
    portfolio: Portfolio;
    currentPage: string;
    children: React.ReactNode;
    isMobile?: boolean;
}

export const MinimalLayout = ({ portfolio, currentPage, children, isMobile = false }: MinimalLayoutProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data } = portfolio;

    const canUseDarkMode = data.theme.darkModeEnabled;

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        if (canUseDarkMode) {
            setTheme(theme === 'light' ? 'dark' : 'light');
        }
    };

    const navLinks = portfolio.activePages.map((page) => ({
        label: page.charAt(0).toUpperCase() + page.slice(1),
        href: `/u/${portfolio.slug}${page === 'home' ? '' : `/${page}`}`,
        active: currentPage === page || (currentPage === '' && page === 'home'),
    }));

    const themeColors = theme === 'dark' ? data.theme.darkMode : data.theme.lightMode;

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{
                backgroundColor: themeColors.bg,
                color: themeColors.text,
                fontFamily: 'Inter, -apple-system, sans-serif',
            }}
        >
            {/* Header */}
            <header className="border-b transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a
                            href={`/u/${portfolio.slug}`}
                            className="text-xl font-medium tracking-tight hover:opacity-60 transition-opacity"
                        >
                            {data.personal.name}
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className={`${isMobile ? 'hidden' : ''} hidden md:flex items-center gap-8`}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm uppercase tracking-wider transition-opacity ${link.active ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                                        }`}
                                    style={{
                                        color: themeColors.text,
                                        fontWeight: link.active ? 600 : 400,
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Theme Toggle */}
                            {canUseDarkMode && (
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 hover:opacity-60 transition-opacity"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`${isMobile || 'md:hidden'} p-2 hover:opacity-60 transition-opacity`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className={`${isMobile || 'md:hidden'} border-t transition-colors overflow-hidden`}
                                style={{ borderColor: themeColors.text + '20' }}
                            >
                                <div className="py-4 space-y-2">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className={`block px-4 py-3 text-sm uppercase tracking-wider transition-opacity ${link.active ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                                                }`}
                                            style={{
                                                color: themeColors.text,
                                                fontWeight: link.active ? 600 : 400,
                                            }}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                    {canUseDarkMode && (
                                        <button
                                            onClick={() => {
                                                toggleTheme();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                                            style={{ color: themeColors.text }}
                                        >
                                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t mt-32 transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm opacity-40">
                            © {new Date().getFullYear()} {data.personal.name}
                        </p>
                        <div className="flex items-center gap-6">
                            {data.socials.github && (
                                <a
                                    href={data.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-wider"
                                >
                                    GitHub
                                </a>
                            )}
                            {data.socials.linkedin && (
                                <a
                                    href={data.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-wider"
                                >
                                    LinkedIn
                                </a>
                            )}
                            {data.socials.twitter && (
                                <a
                                    href={data.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-40 hover:opacity-100 transition-opacity uppercase tracking-wider"
                                >
                                    Twitter
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};