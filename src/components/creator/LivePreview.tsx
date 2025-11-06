'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Moon, Sun } from 'lucide-react';

interface LivePreviewProps {
    templateId: string;
    data: any;
}

export const LivePreview = ({ templateId, data }: LivePreviewProps) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [currentPage, setCurrentPage] = useState('home');

    const pages = ['home', 'about', 'projects', 'contact'];

    return (
        <div className="h-full flex flex-col bg-muted/50 rounded-xl border border-border overflow-hidden">
            {/* Preview Controls */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
                <div className="flex items-center gap-2">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto p-4">
                <div className="bg-background rounded-lg border border-border min-h-full flex items-center justify-center">
                    <div className="text-center p-8">
                        <div className="text-4xl font-bold text-foreground/20 mb-4">
                            {templateId ? `${templateId} Template` : 'Select Template'}
                        </div>
                        <div className="text-foreground/40 mb-2">
                            Live Preview - {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page
                        </div>
                        <div className="text-sm text-foreground/30">
                            Theme: {theme === 'light' ? 'Light' : 'Dark'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};