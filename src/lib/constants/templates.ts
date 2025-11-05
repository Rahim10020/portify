import { TemplateConfig } from '@/types';

export const TEMPLATES: TemplateConfig[] = [
    {
        id: 'devfolio',
        name: 'DevFolio',
        slug: 'devfolio',
        description: 'Perfect for developers with GitHub integration and tech-focused design',
        previewImage: '/templates/devfolio-preview.png',
        category: 'developer',
        tier: 'free',
        features: {
            projectDetail: true,
            darkMode: true,
        },
        availablePages: ['home', 'about', 'projects', 'contact'],
    },
    {
        id: 'designstudio',
        name: 'Design Studio',
        slug: 'designstudio',
        description: 'Showcase your design work with beautiful masonry layouts',
        previewImage: '/templates/designstudio-preview.png',
        category: 'designer',
        tier: 'free',
        features: {
            projectDetail: true,
            darkMode: true,
        },
        availablePages: ['home', 'about', 'projects', 'contact'],
    },
    {
        id: 'minimal',
        name: 'Minimal',
        slug: 'minimal',
        description: 'Clean and simple portfolio for any profession',
        previewImage: '/templates/minimal-preview.png',
        category: 'generic',
        tier: 'free',
        features: {
            projectDetail: true,
            darkMode: true,
        },
        availablePages: ['home', 'about', 'projects', 'contact'],
    },
];

export const getTemplateById = (id: string): TemplateConfig | undefined => {
    return TEMPLATES.find((template) => template.id === id);
};

export const getTemplateBySlug = (slug: string): TemplateConfig | undefined => {
    return TEMPLATES.find((template) => template.slug === slug);
};