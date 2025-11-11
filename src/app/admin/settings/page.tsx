'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { getAppSettings, updateAppSettings, getAllPlans, createPlan, updatePlan, deletePlan } from '@/lib/firebase/firestore';
import { AppSettings, Plan } from '@/types';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminSettingsPage() {
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<AppSettings | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [showPlanForm, setShowPlanForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [planForm, setPlanForm] = useState({
        name: '',
        price: 0,
        currency: '€',
        description: '',
        features: [''],
        limitations: [''],
        cta: '',
        href: '',
        highlighted: false,
        limits: {
            portfolios: 1,
            projects: 6,
            images: 10,
            darkMode: false,
            templatesAccess: ['devfolio', 'designstudio', 'minimal'] as string[] | 'all',
            watermark: true,
            analytics: false,
        },
    });

    useEffect(() => {
        loadSettings();
        loadPlans();
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

    const loadPlans = async () => {
        try {
            const data = await getAllPlans();
            setPlans(data);
        } catch (error) {
            toast.error('Failed to load plans');
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

    const handleCreatePlan = async () => {
        try {
            await createPlan(planForm);
            toast.success('Plan created successfully');
            setShowPlanForm(false);
            resetPlanForm();
            loadPlans();
        } catch (error) {
            toast.error('Failed to create plan');
        }
    };

    const handleUpdatePlan = async () => {
        if (!editingPlan) return;

        try {
            await updatePlan(editingPlan.id, planForm);
            toast.success('Plan updated successfully');
            setEditingPlan(null);
            resetPlanForm();
            loadPlans();
        } catch (error) {
            toast.error('Failed to update plan');
        }
    };

    const handleDeletePlan = async (planId: string) => {
        if (!confirm('Are you sure you want to delete this plan?')) return;

        try {
            await deletePlan(planId);
            toast.success('Plan deleted successfully');
            loadPlans();
        } catch (error) {
            toast.error('Failed to delete plan');
        }
    };

    const resetPlanForm = () => {
        setPlanForm({
            name: '',
            price: 0,
            currency: '€',
            description: '',
            features: [''],
            limitations: [''],
            cta: '',
            href: '',
            highlighted: false,
            limits: {
                portfolios: 1,
                projects: 6,
                images: 10,
                darkMode: false,
                templatesAccess: ['devfolio', 'designstudio', 'minimal'] as string[] | 'all',
                watermark: true,
                analytics: false,
            },
        });
    };

    const startEditingPlan = (plan: Plan) => {
        setEditingPlan(plan);
        setPlanForm({
            name: plan.name,
            price: plan.price,
            currency: plan.currency,
            description: plan.description,
            features: plan.features,
            limitations: plan.limitations,
            cta: plan.cta,
            href: plan.href,
            highlighted: plan.highlighted,
            limits: {
                portfolios: plan.limits.portfolios,
                projects: plan.limits.projects,
                images: plan.limits.images,
                darkMode: plan.limits.darkMode,
                templatesAccess: plan.limits.templatesAccess,
                watermark: plan.limits.watermark,
                analytics: plan.limits.analytics || false,
            },
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-35">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="container mx-auto px-4 py-35">
                <Card>
                    <p className="text-foreground/70">No settings found. Initializing defaults...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-26">
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

                {/* Plans Management */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-foreground">Plans Management</h3>
                        <Button
                            onClick={() => setShowPlanForm(true)}
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Plan
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {plans.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div>
                                    <h4 className="font-medium text-foreground">{plan.name}</h4>
                                    <p className="text-sm text-foreground/70">{plan.currency}{plan.price}/month</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => startEditingPlan(plan)}
                                        variant="secondary"
                                        size="sm"
                                    >
                                        <Edit size={16} />
                                    </Button>
                                    <Button
                                        onClick={() => handleDeletePlan(plan.id)}
                                        variant="secondary"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Plan Form Modal */}
                {(showPlanForm || editingPlan) && (
                    <Card className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {editingPlan ? 'Edit Plan' : 'Create New Plan'}
                                </h3>
                                <Button
                                    onClick={() => {
                                        setShowPlanForm(false);
                                        setEditingPlan(null);
                                        resetPlanForm();
                                    }}
                                    variant="secondary"
                                    size="sm"
                                >
                                    ✕
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Plan Name"
                                        value={planForm.name}
                                        onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <Input
                                            label="Currency"
                                            value={planForm.currency}
                                            onChange={(e) => setPlanForm({ ...planForm, currency: e.target.value })}
                                            className="w-20"
                                        />
                                        <Input
                                            label="Price"
                                            type="number"
                                            value={planForm.price}
                                            onChange={(e) => setPlanForm({ ...planForm, price: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>

                                <Textarea
                                    label="Description"
                                    value={planForm.description}
                                    onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                                />

                                <div className="flex items-center gap-4">
                                    <Input
                                        label="CTA Text"
                                        value={planForm.cta}
                                        onChange={(e) => setPlanForm({ ...planForm, cta: e.target.value })}
                                    />
                                    <Input
                                        label="CTA Link"
                                        value={planForm.href}
                                        onChange={(e) => setPlanForm({ ...planForm, href: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={planForm.highlighted}
                                        onChange={(checked) => setPlanForm({ ...planForm, highlighted: checked })}
                                    />
                                    <label className="text-sm text-foreground">Highlighted Plan</label>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => {
                                            setShowPlanForm(false);
                                            setEditingPlan(null);
                                            resetPlanForm();
                                        }}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={editingPlan ? handleUpdatePlan : handleCreatePlan}
                                    >
                                        {editingPlan ? 'Update Plan' : 'Create Plan'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Card>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave} isLoading={saving} size="md">
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}