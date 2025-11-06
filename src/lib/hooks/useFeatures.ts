import { useAuth } from './useAuth';
import { useAppSettings } from './useAppSettings';
import { PlanLimits } from '@/types';

export const useFeatures = (): PlanLimits => {
    const { user } = useAuth();
    const { pricingMode, limits } = useAppSettings();

    // Si mode gratuit global, tout le monde a tout
    if (pricingMode === 'free') {
        return {
            portfolios: 999,
            projects: 999,
            images: 999,
            darkMode: true,
            templatesAccess: 'all',
            watermark: false,
            analytics: false,
        };
    }

    // Si pas d'utilisateur connecté, retourner les limites free
    if (!user) {
        return limits.free;
    }

    // Si user pro
    if (user.plan === 'pro') {
        return limits.pro;
    }

    // Si grandfathered, features custom
    if (user.grandfathered && user.grandfatheredFeatures) {
        return {
            portfolios: user.grandfatheredFeatures.portfolios,
            projects: 999,
            images: 999,
            darkMode: user.grandfatheredFeatures.darkMode,
            templatesAccess: 'all',
            watermark: user.grandfatheredFeatures.watermark,
            analytics: false,
        };
    }

    // Sinon, plan gratuit standard
    return limits.free;
};