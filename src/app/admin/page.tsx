'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';
import { Users, Settings, Mail, TrendingUp, Eye, Folder, BarChart3 } from 'lucide-react';
import { getAllUsers, getTotalPortfolios, getTotalViews, getAllNewsletterSubscribers } from '@/lib/firebase/firestore';

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPortfolios: 0,
        totalSubscribers: 0,
        totalViews: 0,
        usersThisMonth: 0,
        portfoliosThisMonth: 0,
    });

    const [growthData, setGrowthData] = useState({
        userGrowth: 0,
        portfolioGrowth: 0,
        viewGrowth: 0,
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

                // Calculate this month's stats
                const now = new Date();
                const usersThisMonth = users.filter((user: any) => {
                    if (user.createdAt?.toDate) {
                        const userDate = new Date(user.createdAt.toDate());
                        return (
                            userDate.getMonth() === now.getMonth() &&
                            userDate.getFullYear() === now.getFullYear()
                        );
                    }
                    return false;
                }).length;

                setStats({
                    totalUsers: users.length,
                    totalPortfolios: portfolios,
                    totalSubscribers: subscribers.length,
                    totalViews: views,
                    usersThisMonth,
                    portfoliosThisMonth: Math.floor(portfolios * 0.15), // Mock data
                });

                // Mock growth percentages (replace with real data later)
                setGrowthData({
                    userGrowth: 12.5,
                    portfolioGrowth: 8.3,
                    viewGrowth: 24.7,
                });
            } catch (error) {
                // Error already logged in firestore service
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container mx-auto px-4 py-26">
            <div className='max-w-6xl mx-auto space-y-6'>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
                    <p className="text-foreground/70">Manage your platform settings and users</p>
                </div>

                {/* Main Stats with Growth */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Total Users</div>
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Users className="text-blue-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{stats.totalUsers}</div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp size={14} />
                            <span>+{growthData.userGrowth}% this month</span>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Total Portfolios</div>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Folder className="text-purple-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{stats.totalPortfolios}</div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp size={14} />
                            <span>+{growthData.portfolioGrowth}% this month</span>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Newsletter Subscribers</div>
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <Mail className="text-green-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground">{stats.totalSubscribers}</div>
                        <div className="text-xs text-foreground/60 mt-1">
                            Active subscribers
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Total Views</div>
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <Eye className="text-orange-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{stats.totalViews}</div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp size={14} />
                            <span>+{growthData.viewGrowth}% this month</span>
                        </div>
                    </Card>
                </div>

                {/* This Month Stats */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <Card>
                        <h3 className="text-lg font-semibold text-foreground mb-4">This Month</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Users className="text-blue-500" size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-foreground/70">New Users</div>
                                        <div className="text-2xl font-bold text-foreground">{stats.usersThisMonth}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <Folder className="text-purple-500" size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-foreground/70">New Portfolios</div>
                                        <div className="text-2xl font-bold text-foreground">{stats.portfoliosThisMonth}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-border">
                                <span className="text-sm text-foreground/70">Avg. Portfolios per User</span>
                                <span className="font-semibold text-foreground">
                                    {stats.totalUsers > 0 ? (stats.totalPortfolios / stats.totalUsers).toFixed(1) : 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border">
                                <span className="text-sm text-foreground/70">Avg. Views per Portfolio</span>
                                <span className="font-semibold text-foreground">
                                    {stats.totalPortfolios > 0 ? Math.floor(stats.totalViews / stats.totalPortfolios) : 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-foreground/70">Newsletter Conversion</span>
                                <span className="font-semibold text-foreground">
                                    {stats.totalUsers > 0 ? ((stats.totalSubscribers / stats.totalUsers) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Management Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                    <Link href="/admin/analytics">
                        <Card hover className="cursor-pointer">
                            <div className='flex items-center gap-4'>
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <BarChart3 className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Analytics</h3>
                            </div>
                            <p className="text-foreground/70 text-sm">
                                View detailed analytics and insights
                            </p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}