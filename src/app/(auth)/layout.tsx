'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Simple Header */}
            <header className="border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href={ROUTES.HOME}>
                        <div className="text-2xl font-bold text-foreground">Portify</div>
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
}