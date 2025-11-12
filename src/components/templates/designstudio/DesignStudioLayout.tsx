'use client';

import { useState, useEffect } from 'react';
import { Portfolio } from '@/types';
import { Moon, Sun, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DesignStudioLayoutProps {
    portfolio: Portfolio;
    currentPage: string;
    children: React.ReactNode;
    isPreview?: boolean;
    isMobile?: boolean;
}

export const DesignStudioLayout = ({
    portfolio,
    currentPage,
    children,
    isPreview = false,
    isMobile = false,
}: DesignStudioLayoutProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // DesignStudio default light
    const [menuOpen, setMenuOpen] = useState(false);
    const { data } = portfolio;

    const canUseDarkMode = data.theme.darkModeEnabled;

    useEffect(() => {
        if (!isPreview) {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
        }

        return () => {
            if (!isPreview) {
                document.documentElement.classList.remove('light', 'dark');
            }
        };
    }, [theme, isPreview]);

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
            className={`min-h-screen transition-colors duration-500 ${isPreview ? 'relative overflow-hidden' : ''}`}
            style={{
                backgroundColor: themeColors.bg,
                color: themeColors.text,
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            {/* Fixed Header - Mobile Only */}
            <header
                className={`${isMobile || 'lg:hidden'} ${isPreview ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-current/10`}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <a href={`/u/${portfolio.slug}`} className="font-bold text-xl">
                        {data.personal.name.split(' ')[0]}
                    </a>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:scale-110 transition-transform"
                    >
                        {menuOpen ? <X size={24} /> : (
                            <div className="space-y-1.5">
                                <div className="w-6 h-0.5 bg-current" />
                                <div className="w-6 h-0.5 bg-current" />
                                <div className="w-6 h-0.5 bg-current" />
                            </div>
                        )}
                    </button>
                </div>
            </header>

            {/* Sidebar Navigation - Desktop */}
            <aside
                className={`hidden lg:flex ${isPreview ? 'absolute' : 'fixed'} left-0 top-0 h-screen w-24 flex-col items-center justify-between py-8 border-r border-current/10 z-40`}
            >
                {/* Logo */}
                <a
                    href={`/u/${portfolio.slug}`}
                    className="group relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                        style={{ backgroundColor: `${themeColors.accent}20`, color: themeColors.accent }}
                    >
                        {data.personal.name.charAt(0)}
                    </motion.div>
                    <Sparkles
                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        size={16}
                        style={{ color: themeColors.accent }}
                    />
                </a>

                {/* Navigation */}
                <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            whileHover={{ scale: 1.1, x: 5 }}
                            className="relative group"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${link.active ? 'scale-110' : 'opacity-50 hover:opacity-100'
                                    }`}
                                style={{
                                    backgroundColor: link.active ? themeColors.accent : 'transparent',
                                    color: link.active ? themeColors.bg : themeColors.text,
                                }}
                            >
                                {link.label.substring(0, 2)}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                <div
                                    className="px-3 py-1 rounded-lg text-sm font-medium"
                                    style={{ backgroundColor: themeColors.accent, color: themeColors.bg }}
                                >
                                    {link.label}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </nav>

                {/* Theme Toggle */}
                {canUseDarkMode && (
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggleTheme}
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${themeColors.accent}10` }}
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} style={{ color: themeColors.accent }} />
                        ) : (
                            <Moon size={20} style={{ color: themeColors.accent }} />
                        )}
                    </motion.button>
                )}
            </aside>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className={`lg:hidden ${isPreview ? 'absolute' : 'fixed'} inset-0 z-40 backdrop-blur-xl`}
                        style={{ backgroundColor: `${themeColors.bg}F0` }}
                    >
                        <div className="container mx-auto px-4 pt-24 pb-8">
                            <nav className="space-y-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`block text-3xl font-bold py-4 transition-all ${link.active ? '' : 'opacity-50 hover:opacity-100'
                                            }`}
                                        style={{ color: link.active ? themeColors.accent : themeColors.text }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {canUseDarkMode && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => {
                                        toggleTheme();
                                        setMenuOpen(false);
                                    }}
                                    className="mt-8 px-6 py-3 rounded-full flex items-center gap-3 font-medium"
                                    style={{ backgroundColor: `${themeColors.accent}20`, color: themeColors.accent }}
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="lg:pl-24 pt-16 lg:pt-0">{children}</main>

            {/* Footer */}
            <footer className="lg:pl-24 border-t border-current/10 py-8 mt-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm opacity-60">
                            © {new Date().getFullYear()} {data.personal.name}
                        </p>
                        <div className="flex items-center gap-6">
                            {data.socials.dribbble && (
                                <a
                                    href={data.socials.dribbble}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity hover:scale-110"
                                >
                                    Dribbble
                                </a>
                            )}
                            {data.socials.behance && (
                                <a
                                    href={data.socials.behance}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity hover:scale-110"
                                >
                                    Behance
                                </a>
                            )}
                            {data.socials.linkedin && (
                                <a
                                    href={data.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm opacity-60 hover:opacity-100 transition-opacity hover:scale-110"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};