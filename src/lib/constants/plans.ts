import { AppLimits } from '@/types';

export const DEFAULT_LIMITS: AppLimits = {
    free: {
        portfolios: 1,
        projects: 6,
        images: 10,
        darkMode: false,
        templatesAccess: ['devfolio', 'designstudio', 'minimal'],
        watermark: true,
        analytics: false,
    },
    pro: {
        portfolios: 999,
        projects: 999,
        images: 999,
        darkMode: true,
        templatesAccess: 'all',
        watermark: false,
        analytics: true,
    },
};

export const PLAN_PRICES = {
    pro: {
        monthly: 12,
        currency: '€',
    },
};