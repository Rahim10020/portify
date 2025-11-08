import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        // Note: We can't use Firebase directly in server components with the current setup
        // This would need a server-side Firebase Admin SDK setup
        // For now, we return basic metadata
        return {
            title: 'Portfolio | Portify',
            description: 'View this amazing portfolio built with Portify',
        };
    } catch (error) {
        return {
            title: 'Portfolio',
        };
    }
}

export default function PublicPortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}