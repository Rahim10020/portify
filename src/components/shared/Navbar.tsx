'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/lib/hooks/useAuth';
import { signOut } from '@/lib/firebase/auth';
import { useToast } from '@/components/ui/Toast';
import { useAppSettings } from '@/lib/hooks/useAppSettings';
import { ROUTES } from '@/lib/constants/routes';
import { Menu, X, ChevronDown, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const toast = useToast();
    const { user, isAuthenticated } = useAuth();
    const { features } = useAppSettings();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };

        if (userMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuOpen]);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            router.push(ROUTES.HOME);
            setUserMenuOpen(false);
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    const navLinks = [
        { href: ROUTES.TEMPLATES, label: 'Templates' },
        ...(features?.pricingPageVisible ? [{ href: ROUTES.PRICING, label: 'Pricing' }] : []),
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

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
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

                        <ThemeToggle />

                        {isAuthenticated ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center cursor-pointer gap-2 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        {user?.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <User size={18} className="text-primary" />
                                        )}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium text-foreground">
                                        {user?.displayName}
                                    </span>
                                    <ChevronDown size={16} className="text-foreground/70" />
                                </button>

                                {/* User Dropdown Menu */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl py-2 z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-border">
                                                <p className="text-sm font-medium text-foreground">{user?.displayName}</p>
                                                <p className="text-xs text-foreground/70">{user?.email}</p>
                                            </div>

                                            <Link href={ROUTES.DASHBOARD} onClick={() => setUserMenuOpen(false)}>
                                                <button className="w-full cursor-pointer px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </button>
                                            </Link>

                                            <Link href={ROUTES.SETTINGS} onClick={() => setUserMenuOpen(false)}>
                                                <button className="w-full cursor-pointer px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                                                    <Settings size={16} />
                                                    Settings
                                                </button>
                                            </Link>

                                            {user?.isAdmin && (
                                                <Link href={ROUTES.ADMIN} onClick={() => setUserMenuOpen(false)}>
                                                    <button className="w-full cursor-pointer px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                                                        <User size={16} />
                                                        Admin Panel
                                                    </button>
                                                </Link>
                                            )}

                                            <div className="border-t border-border my-2" />

                                            <button
                                                onClick={handleSignOut}
                                                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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