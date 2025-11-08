'use client';

import { Portfolio } from '@/types';
import { DevFolioLayout } from './DevFolioLayout';
import { DevFolioHome } from './DevFolioHome';
import { DevFolioAbout } from './DevFolioAbout';
import { DevFolioProjects } from './DevFolioProjects';
import { DevFolioProjectDetail } from './DevFolioProjectDetail';
import { DevFolioContact } from './DevFolioContact';

interface DevFolioTemplateProps {
    portfolio: Portfolio;
    page: string;
}

export const DevFolioTemplate = ({ portfolio, page }: DevFolioTemplateProps) => {
    const renderPage = () => {
        // Extraire l'ID du projet si c'est une page de détail
        const isProjectDetail = page.startsWith('projects/');
        const projectSlug = isProjectDetail ? page.split('/')[1] : null;

        switch (true) {
            case page === 'home' || page === '':
                return <DevFolioHome data={portfolio.data} slug={portfolio.slug} />;
            case page === 'about':
                return <DevFolioAbout data={portfolio.data} />;
            case page === 'projects':
                return <DevFolioProjects data={portfolio.data} slug={portfolio.slug} />;
            case isProjectDetail && !!projectSlug:
                return <DevFolioProjectDetail data={portfolio.data} projectSlug={projectSlug} slug={portfolio.slug} />;
            case page === 'contact':
                return <DevFolioContact data={portfolio.data} />;
            default:
                return <DevFolioHome data={portfolio.data} slug={portfolio.slug} />;
        }
    };

    return (
        <DevFolioLayout portfolio={portfolio} currentPage={page}>
            {renderPage()}
        </DevFolioLayout>
    );
};