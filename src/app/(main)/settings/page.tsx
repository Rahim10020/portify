'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';

function SettingsContent() {
    const { user } = useAuth();
    const toast = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
            router.push(ROUTES.HOME);
        } catch (error) {
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
                        <p className="text-foreground/70">Manage your account settings and preferences</p>
                    </div>

                    {/* Account Information */}
                    <Card>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Account Information</h2>
                        <div className="space-y-4">
                            <Input label="Display Name" value={user?.displayName || ''} disabled />
                            <Input label="Email" value={user?.email || ''} disabled />
                            <p className="text-sm text-foreground/60">
                                To change your email or password, please contact support.
                            </p>
                        </div>
                    </Card>

                    {/* Plan Information */}
                    <Card>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Plan & Billing</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                <div>
                                    <div className="font-medium text-foreground">Current Plan</div>
                                    <div className="text-sm text-foreground/70 capitalize">
                                        {user?.plan || 'Free'}
                                    </div>
                                </div>
                                {user?.plan === 'free' && (
                                    <Button>Upgrade to Pro</Button>
                                )}
                            </div>

                            {user?.grandfathered && (
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <div className="font-medium text-green-600 dark:text-green-400">
                                        🎉 Grandfathered Account
                                    </div>
                                    <div className="text-sm text-foreground/70 mt-1">
                                        You have special early adopter benefits!
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card>
                        <h2 className="text-xl font-semibold text-foreground mb-4">Danger Zone</h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                                <div className="font-medium text-foreground mb-2">Sign Out</div>
                                <p className="text-sm text-foreground/70 mb-4">
                                    Sign out of your account on this device
                                </p>
                                <Button variant="danger" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </div>

                            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                                <div className="font-medium text-foreground mb-2">Delete Account</div>
                                <p className="text-sm text-foreground/70 mb-4">
                                    Permanently delete your account and all your data. This action cannot be undone.
                                </p>
                                <Button variant="danger" disabled>
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function SettingsPage() {
    return (
        <ProtectedRoute>
            <SettingsContent />
        </ProtectedRoute>
    );
}