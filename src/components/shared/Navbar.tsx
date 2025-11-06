'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/constants/routes';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: ROUTES.TEMPLATES, label: 'Templates' },
        { href: ROUTES.PRICING, label: 'Pricing' },
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href={ROUTES.HOME} className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-foreground">
                            Portify
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-foreground/70'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {isAuthenticated ? (
                            <Link href={ROUTES.DASHBOARD}>
                                <Button size="sm">Dashboard</Button>
                            </Link>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link href={ROUTES.LOGIN}>
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={ROUTES.SIGNUP}>
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-border"
                        >
                            <div className="py-4 space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {!isAuthenticated && (
                                    <div className="px-4 pt-4 border-t border-border space-y-2">
                                        <Link href={ROUTES.LOGIN} className="block">
                                            <Button variant="ghost" className="w-full">
                                                Sign In
                                            </Button>
                                        </Link>
                                        <Link href={ROUTES.SIGNUP} className="block">
                                            <Button className="w-full">Get Started</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};