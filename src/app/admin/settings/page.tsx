'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { getAppSettings, updateAppSettings } from '@/lib/firebase/firestore';
import { AppSettings } from '@/types';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export default function AdminSettingsPage() {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<AppSettings | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await getAppSettings();
            setSettings(data);
        } catch (error) {
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;

        try {
            setSaving(true);
            await updateAppSettings(settings);
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Card>
                    <p className="text-foreground/70">No settings found. Initializing defaults...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Platform Settings</h2>
                    <p className="text-foreground/70">Control pricing, limits, and features</p>
                </div>

                {/* Pricing Mode */}
                <Card>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Pricing Mode</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                            <div>
                                <div className="font-medium text-foreground">Enable Freemium Model</div>
                                <div className="text-sm text-foreground/70">
                                    Switch from free-for-all to freemium with limits
                                </div>
                            </div>
                            <Switch
                                checked={settings.pricingMode === 'freemium'}
                                onChange={(checked) =>
                                    setSettings({
                                        ...settings,
                                        pricingMode: checked ? 'freemium' : 'free',
                                    })
                                }
                            />
                        </div>

                        {settings.pricingMode === 'freemium' && (
                            <div className="p-4 rounded-lg border border-border space-y-3">
                                <p className="text-sm text-foreground/70">
                                    When enabled, free users will have the following limits:
                                </p>
                                <ul className="text-sm text-foreground/70 space-y-1">
                                    <li>• {settings.limits.free.portfolios} portfolio(s)</li>
                                    <li>• {settings.limits.free.projects} projects max</li>
                                    <li>• {settings.limits.free.images} images max</li>
                                    <li>• {settings.limits.free.darkMode ? 'Dark mode enabled' : 'No dark mode'}</li>
                                    <li>• {settings.limits.free.watermark ? 'Watermark required' : 'No watermark'}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Features */}
                <Card>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Features</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                            <div>
                                <div className="font-medium text-foreground">Newsletter</div>
                                <div className="text-sm text-foreground/70">
                                    Allow users to subscribe to newsletter
                                </div>
                            </div>
                            <Switch
                                checked={settings.features.newsletterEnabled}
                                onChange={(checked) =>
                                    setSettings({
                                        ...settings,
                                        features: { ...settings.features, newsletterEnabled: checked },
                                    })
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                            <div>
                                <div className="font-medium text-foreground">Pricing Page</div>
                                <div className="text-sm text-foreground/70">
                                    Show pricing page in navigation
                                </div>
                            </div>
                            <Switch
                                checked={settings.features.pricingPageVisible}
                                onChange={(checked) =>
                                    setSettings({
                                        ...settings,
                                        features: { ...settings.features, pricingPageVisible: checked },
                                    })
                                }
                            />
                        </div>
                    </div>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} isLoading={saving} size="lg">
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}