import { Timestamp } from 'firebase/firestore';

export type UserPlan = 'free' | 'pro' | 'grandfathered';

export interface GrandfatheredFeatures {
    darkMode: boolean;
    portfolios: number;
    watermark: boolean;
}

export interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    plan: UserPlan;
    grandfathered: boolean;
    grandfatheredFeatures?: GrandfatheredFeatures;
    isAdmin: boolean;
    newsletterSubscribed: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}