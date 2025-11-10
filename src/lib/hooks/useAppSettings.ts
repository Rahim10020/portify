import { useEffect, useState } from 'react';
import { getAppSettings } from '@/lib/firebase/firestore';
import { AppSettings } from '@/types';
import { DEFAULT_LIMITS } from '@/lib/constants/plans';

export const useAppSettings = () => {
    const [settings, setSettings] = useState<AppSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getAppSettings();

                if (!data) {
                    // Default settings si pas encore créés
                    const defaultSettings: AppSettings = {
                        pricingMode: 'free',
                        limits: DEFAULT_LIMITS,
                        features: {
                            newsletterEnabled: true,
                            pricingPageVisible: false,
                            newTemplatesNotification: true,
                        },
                        plans: [],
                        updatedAt: new Date() as any,
                    };
                    setSettings(defaultSettings);
                } else {
                    setSettings(data);
                }
            } catch (error) {
                console.error('Error fetching app settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        pricingMode: settings?.pricingMode || 'free',
        limits: settings?.limits || DEFAULT_LIMITS,
        features: settings?.features,
    };
};