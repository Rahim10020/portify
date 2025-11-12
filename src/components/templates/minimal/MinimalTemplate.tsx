'use client';

import { Portfolio } from '@/types';
import { MinimalLayout } from './MinimalLayout';
import { MinimalHome } from './MinimalHome';
import { MinimalAbout } from './MinimalAbout';
import { MinimalProjects } from './MinimalProjects';
import { MinimalContact } from './MinimalContact';

interface MinimalTemplateProps {
    portfolio: Portfolio;
    page: string;
    isMobile?: boolean;
}

export const MinimalTemplate = ({ portfolio, page, isMobile = false }: MinimalTemplateProps) => {
    const renderPage = () => {
        switch (page) {
            case 'home':
            case '':
                return <MinimalHome data={portfolio.data} slug={portfolio.slug} />;
            case 'about':
                return <MinimalAbout data={portfolio.data} />;
            case 'projects':
                return <MinimalProjects data={portfolio.data} slug={portfolio.slug} />;
            case 'contact':
                return <MinimalContact data={portfolio.data} />;
            default:
                return <MinimalHome data={portfolio.data} slug={portfolio.slug} />;
        }
    };

    return (
        <MinimalLayout portfolio={portfolio} currentPage={page} isMobile={isMobile}>
            {renderPage()}
        </MinimalLayout>
    );
};