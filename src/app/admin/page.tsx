'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';
import { Users, Settings, Mail } from 'lucide-react';
import { getAllUsers, getTotalPortfolios, getTotalViews, getAllNewsletterSubscribers } from '@/lib/firebase/firestore';

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPortfolios: 0,
        totalSubscribers: 0,
        totalViews: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, portfolios, subscribers, views] = await Promise.all([
                    getAllUsers(),
                    getTotalPortfolios(),
                    getAllNewsletterSubscribers(),
                    getTotalViews(),
                ]);

                setStats({
                    totalUsers: users.length,
                    totalPortfolios: portfolios,
                    totalSubscribers: subscribers.length,
                    totalViews: views,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container mx-auto px-4 py-26">
            <div className='max-w-3xl mx-auto space-y-6'>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
                    <p className="text-foreground/70">Manage your platform settings and users</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Total Users</div>
                        <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
                    </Card>

                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Total Portfolios</div>
                        <div className="text-3xl font-bold text-foreground">{stats.totalPortfolios}</div>
                    </Card>

                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Newsletter Subscribers</div>
                        <div className="text-3xl font-bold text-foreground">{stats.totalSubscribers}</div>
                    </Card>

                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Total Views</div>
                        <div className="text-3xl font-bold text-foreground">{stats.totalViews}</div>
                    </Card>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href={ROUTES.ADMIN_SETTINGS}>
                        <Card hover className="cursor-pointer">
                            <div className='flex items-center gap-4'>
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Settings className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Settings</h3>
                            </div>

                            <p className="text-foreground/70 text-sm">
                                Manage pricing, limits, and feature flags
                            </p>
                        </Card>
                    </Link>

                    <Link href={ROUTES.ADMIN_USERS}>
                        <Card hover className="cursor-pointer">
                            <div className='flex items-center gap-4'>
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Users className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Users</h3>
                            </div>

                            <p className="text-foreground/70 text-sm">
                                View and manage user accounts
                            </p>
                        </Card>
                    </Link>

                    <Link href={ROUTES.ADMIN_NEWSLETTER}>
                        <Card hover className="cursor-pointer">
                            <div className='flex items-center gap-4'>
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Newsletter</h3>
                            </div>
                            <p className="text-foreground/70 text-sm">
                                Export newsletter subscribers
                            </p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}