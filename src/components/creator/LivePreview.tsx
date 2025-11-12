'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Smartphone, Maximize2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Portfolio } from '@/types';

interface LivePreviewProps {
    portfolio: Portfolio;
    currentPage?: string;
    className?: string;
}

export const LivePreview = ({
    portfolio,
    currentPage = 'home',
    className,
}: LivePreviewProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <>
            {/* Inline Preview */}
            <div
                className={cn(
                    'h-full rounded-xl border border-border bg-background overflow-hidden flex flex-col',
                    className
                )}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>

                        {/* Device Toggle */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <button
                                onClick={() => setDevice('desktop')}
                                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${device === 'desktop'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-foreground/60 hover:text-foreground'
                                    }`}
                            >
                                <Monitor size={16} />
                                Desktop
                            </button>
                            <button
                                onClick={() => setDevice('mobile')}
                                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${device === 'mobile'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-foreground/60 hover:text-foreground'
                                    }`}
                            >
                                <Smartphone size={16} />
                                Mobile
                            </button>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setDevice('desktop'); setIsOpen(true); }}
                        className="p-2 hover:bg-muted rounded-lg transition-colors flex items-center gap-2 text-sm text-foreground/70"
                    >
                        <Maximize2 size={18} />
                        Plein écran
                    </motion.button>
                </div>

                <div className="flex-1 overflow-hidden bg-muted/30 flex items-center justify-center p-6">
                    <motion.div
                        key={device}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-background rounded-lg shadow-2xl overflow-hidden ${device === 'desktop'
                            ? 'w-full h-full'
                            : 'w-96 h-full max-h-[844px]'
                            }`}
                    >
                        <div className="w-full h-full overflow-auto">
                            <TemplateRenderer portfolio={portfolio} page={currentPage} isMobile={device === 'mobile'} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-5 left-10 right-5 bottom-5 bg-background rounded-2xl shadow-2xl overflow-hidden flex"
                        >
                            {/* Left Sidebar */}
                            <div className="w-16 flex items-center justify-center border-r border-border bg-card">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-4 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <ArrowLeft size={32} className="text-foreground" />
                                </motion.button>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>

                                        {/* Device Toggle */}
                                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                            <button
                                                onClick={() => setDevice('desktop')}
                                                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${device === 'desktop'
                                                    ? 'bg-background text-foreground shadow-sm'
                                                    : 'text-foreground/60 hover:text-foreground'
                                                    }`}
                                            >
                                                <Monitor size={16} />
                                                Desktop
                                            </button>
                                            <button
                                                onClick={() => setDevice('mobile')}
                                                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm transition-colors ${device === 'mobile'
                                                    ? 'bg-background text-foreground shadow-sm'
                                                    : 'text-foreground/60 hover:text-foreground'
                                                    }`}
                                            >
                                                <Smartphone size={16} />
                                                Mobile
                                            </button>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                                    >
                                        <X size={20} className="text-foreground/70" />
                                    </motion.button>
                                </div>

                                {/* Preview Frame */}
                                <div className="flex-1 overflow-hidden bg-muted/30 flex items-center justify-center p-8">
                                    <motion.div
                                        key={device}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`bg-background rounded-lg shadow-2xl overflow-hidden ${device === 'desktop' ? 'w-full h-full' : 'w-96 h-full max-h-[844px]'
                                            }`}
                                    >
                                        <div className="w-full h-full overflow-auto">
                                            <TemplateRenderer portfolio={portfolio} page={currentPage} isMobile={device === 'mobile'} />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};