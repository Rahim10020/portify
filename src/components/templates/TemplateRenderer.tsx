import { Portfolio } from '@/types';
import { DevFolioTemplate } from './devfolio/DevFolioTemplate';
import { DesignStudioTemplate } from './designstudio/DesignStudioTemplate';
import { MinimalTemplate } from './minimal/MinimalTemplate';

interface TemplateRendererProps {
    portfolio: Portfolio;
    page: string;
    isMobile?: boolean;
}

export const TemplateRenderer = ({ portfolio, page, isMobile = false }: TemplateRendererProps) => {
    const { templateId } = portfolio;

    switch (templateId) {
        case 'devfolio':
            return <DevFolioTemplate portfolio={portfolio} page={page} isMobile={isMobile} />;
        case 'designstudio':
            return (
                <DesignStudioTemplate
                    portfolio={portfolio}
                    page={page}
                    isPreview={portfolio.id === 'preview'}
                    isMobile={isMobile}
                />
            );
        case 'minimal':
            return <MinimalTemplate portfolio={portfolio} page={page} isMobile={isMobile} />;
        default:
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Template not found</h1>
                        <p className="text-foreground/70">Template ID: {templateId}</p>
                    </div>
                </div>
            );
    }
};