'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    {/* 404 Animation */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8"
                    >
                        <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            404
                        </h1>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4 mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                            Page introuvable
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-md mx-auto">
                            Oups ! La page que vous recherchez semble s'être égarée dans le cyberespace.
                        </p>
                    </motion.div>

                    {/* Illustration/Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="relative inline-block">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border-2 border-primary/30"
                            >
                                <Search size={64} className="text-primary" />
                            </motion.div>

                            {/* Floating particles */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [-20, 20],
                                        x: [-10, 10],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute w-3 h-3 bg-accent rounded-full"
                                    style={{
                                        top: `${20 + i * 30}%`,
                                        left: `${10 + i * 35}%`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <Home size={20} />
                                Retour à l'accueil
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium flex items-center gap-2 hover:bg-accent/10 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Page précédente
                        </motion.button>
                    </motion.div>

                    {/* Suggestions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-16 pt-8 border-t border-border/50"
                    >
                        <p className="text-sm text-foreground/40 mb-4">Suggestions</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/templates" className="text-sm text-primary hover:underline">
                                Templates
                            </Link>
                            <Link href="/dashboard" className="text-sm text-primary hover:underline">
                                Tableau de bord
                            </Link>
                            <Link href="/create" className="text-sm text-primary hover:underline">
                                Créer un portfolio
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
