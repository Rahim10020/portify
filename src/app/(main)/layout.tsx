'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCreatePage = pathname === '/create';

    return (
        <div className="min-h-screen flex flex-col">
            {!isCreatePage && <Navbar />}
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}