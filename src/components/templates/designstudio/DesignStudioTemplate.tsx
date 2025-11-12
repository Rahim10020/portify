'use client';

import { Portfolio } from '@/types';
import { DesignStudioLayout } from './DesignStudioLayout';
import { DesignStudioHome } from './DesignStudioHome';
import { DesignStudioAbout } from './DesignStudioAbout';
import { DesignStudioProjects } from './DesignStudioProjects';
import { DesignStudioContact } from './DesignStudioContact';

interface DesignStudioTemplateProps {
    portfolio: Portfolio;
    page: string;
    isPreview?: boolean;
}

export const DesignStudioTemplate = ({
    portfolio,
    page,
    isPreview = false,
}: DesignStudioTemplateProps) => {
    const renderPage = () => {
        switch (page) {
            case 'home':
            case '':
                return <DesignStudioHome data={portfolio.data} slug={portfolio.slug} />;
            case 'about':
                return <DesignStudioAbout data={portfolio.data} />;
            case 'projects':
                return <DesignStudioProjects data={portfolio.data} slug={portfolio.slug} />;
            case 'contact':
                return <DesignStudioContact data={portfolio.data} />;
            default:
                return <DesignStudioHome data={portfolio.data} slug={portfolio.slug} />;
        }
    };

    return (
        <DesignStudioLayout
            portfolio={portfolio}
            currentPage={page}
            isPreview={isPreview}
        >
            {renderPage()}
        </DesignStudioLayout>
    );
};