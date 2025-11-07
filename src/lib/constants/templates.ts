import { TemplateConfig } from '@/types';

export const TEMPLATES: TemplateConfig[] = [
    {
        id: 'devfolio',
        name: 'DevFolio',
        slug: 'devfolio',
        description: 'Terminal-inspired portfolio for developers with clean code aesthetics',
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
        description: 'Bold and creative portfolio with rich animations for designers',
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
        description: 'Clean Swiss-inspired design for professionals who value simplicity',
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

export const getTemplatesByCategory = (category: string): TemplateConfig[] => {
    return TEMPLATES.filter((template) => template.category === category);
};