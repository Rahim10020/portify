import { Timestamp } from 'firebase/firestore';

export type PricingMode = 'free' | 'freemium';

export interface PlanLimits {
    portfolios: number;
    projects: number;
    images: number;
    darkMode: boolean;
    templatesAccess: string[] | 'all';
    watermark: boolean;
    analytics?: boolean;
}

export interface AppLimits {
    free: PlanLimits;
    pro: PlanLimits;
}

export interface AppFeatures {
    newsletterEnabled: boolean;
    pricingPageVisible: boolean;
    newTemplatesNotification: boolean;
}

export interface AppSettings {
    pricingMode: PricingMode;
    limits: AppLimits;
    features: AppFeatures;
    updatedAt: Timestamp;
}