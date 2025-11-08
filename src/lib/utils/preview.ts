import { Portfolio, PortfolioData } from '@/types';

export const createPreviewPortfolio = (
    userId: string,
    templateId: string,
    slug: string,
    data: Partial<PortfolioData>
): Portfolio => {
    const now = new Date();

    return {
        id: 'preview',
        userId,
        templateId: templateId || 'devfolio',
        slug: slug || 'preview',
        isPublished: false,
        activePages: ['home', 'about', 'projects', 'contact'],
        data: {
            personal: data.personal || {
                name: 'Your Name',
                title: 'Your Title',
                bio: 'Your bio goes here...',
            },
            experience: data.experience || [],
            projects: data.projects || [],
            skills: data.skills || [],
            socials: data.socials || {},
            theme: data.theme || {
                darkModeEnabled: false,
                primaryColor: '#3B82F6',
                font: 'inter',
                lightMode: {
                    bg: '#FFFFFF',
                    text: '#000000',
                    accent: '#3B82F6',
                },
                darkMode: {
                    bg: '#0A0A0A',
                    text: '#FFFFFF',
                    accent: '#60A5FA',
                },
            },
        },
        seo: {
            title: data.personal?.name || 'Preview',
            description: data.personal?.bio || '',
        },
        views: 0,
        createdAt: now as any,
        updatedAt: now as any,
    };
};