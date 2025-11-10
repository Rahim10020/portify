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

export interface Plan {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
    features: string[];
    limitations: string[];
    cta: string;
    href: string;
    highlighted: boolean;
    limits: PlanLimits;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface AppSettings {
    pricingMode: PricingMode;
    limits: AppLimits;
    features: AppFeatures;
    plans: Plan[];
    updatedAt: Timestamp;
}