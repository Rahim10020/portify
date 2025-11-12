'use client';

import { useState } from 'react';
import { Portfolio } from '@/types';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DevFolioLayoutProps {
    portfolio: Portfolio;
    currentPage: string;
    children: React.ReactNode;
    isMobile?: boolean;
}

export const DevFolioLayout = ({ portfolio, currentPage, children, isMobile = false }: DevFolioLayoutProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }
        return 'light';
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data } = portfolio;

    const canUseDarkMode = data.theme.darkModeEnabled;

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
                fontFamily: data.theme.font === 'jetbrains' ? 'JetBrains Mono, monospace' : 'Inter, sans-serif'
            }}
        >
            {/* Navbar */}
            <nav className="border-b border-current/10 backdrop-blur-sm sticky top-0 z-50 bg-opacity-80"
                style={{ backgroundColor: `${themeColors.bg}CC` }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href={`/u/${portfolio.slug}`}>
                            <div className="flex items-center gap-2 font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity">
                                <Terminal size={20} style={{ color: themeColors.accent }} />
                                <span>{data.personal.name.split(' ')[0]}</span>
                            </div>
                        </a>

                        {/* Desktop Nav */}
                        <div className={`${isMobile ? 'hidden' : ''} hidden md:flex items-center gap-8`}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:opacity-100 ${link.active ? 'opacity-100' : 'opacity-60'
                                        }`}
                                    style={{ color: link.active ? themeColors.accent : themeColors.text }}
                                >
                                    {link.label}
                                </a>
                            ))}

                            {canUseDarkMode && (
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg hover:bg-current/5 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`${isMobile || 'md:hidden'} p-2`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className={`${isMobile || 'md:hidden'} border-t border-current/10 overflow-hidden`}
                            >
                                <div className="py-4 space-y-2">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className={`block px-4 py-2 rounded-lg transition-colors ${link.active ? 'bg-current/10' : 'hover:bg-current/5'
                                                }`}
                                            style={{ color: link.active ? themeColors.accent : themeColors.text }}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-current/10 py-8 mt-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm opacity-60">
                            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {data.socials.github && (
                                <a
                                    href={data.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    GitHub
                                </a>
                            )}
                            {data.socials.linkedin && (
                                <a
                                    href={data.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    LinkedIn
                                </a>
                            )}
                            {data.socials.twitter && (
                                <a
                                    href={data.socials.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
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