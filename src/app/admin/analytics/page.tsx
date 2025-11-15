'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { TrendingUp, TrendingDown, Eye, Users, Folder, Globe } from 'lucide-react';

export default function AdminAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

    // Mock data (replace with real data from Firebase)
    const [analytics, setAnalytics] = useState({
        viewsOverTime: [
            { date: 'Week 1', views: 1200 },
            { date: 'Week 2', views: 1800 },
            { date: 'Week 3', views: 2400 },
            { date: 'Week 4', views: 3200 },
        ],
        topPortfolios: [
            { name: 'John Doe Portfolio', views: 1250, owner: 'john@example.com' },
            { name: 'Jane Smith Design', views: 980, owner: 'jane@example.com' },
            { name: 'Mike Dev Portfolio', views: 756, owner: 'mike@example.com' },
            { name: 'Sarah Creative', views: 632, owner: 'sarah@example.com' },
            { name: 'David Tech Portfolio', views: 521, owner: 'david@example.com' },
        ],
        geographicData: [
            { country: 'United States', users: 245, percentage: 35 },
            { country: 'United Kingdom', users: 128, percentage: 18 },
            { country: 'Canada', users: 92, percentage: 13 },
            { country: 'France', users: 76, percentage: 11 },
            { country: 'Germany', users: 65, percentage: 9 },
            { country: 'Others', users: 94, percentage: 14 },
        ],
        deviceBreakdown: [
            { device: 'Desktop', percentage: 62 },
            { device: 'Mobile', percentage: 28 },
            { device: 'Tablet', percentage: 10 },
        ],
    });

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [timeRange]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-35">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const maxViews = Math.max(...analytics.viewsOverTime.map((d) => d.views));

    return (
        <div className="container mx-auto px-4 py-26">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-2">Analytics</h2>
                        <p className="text-foreground/70">Detailed insights and performance metrics</p>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex gap-2 bg-muted rounded-lg p-1">
                        {(['7d', '30d', '90d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    timeRange === range
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-foreground/70 hover:text-foreground'
                                }`}
                            >
                                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Total Views</div>
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Eye className="text-blue-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {analytics.viewsOverTime.reduce((sum, d) => sum + d.views, 0).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp size={14} />
                            <span>+24.5% from last period</span>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Active Users</div>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <Users className="text-purple-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">
                            {analytics.geographicData.reduce((sum, d) => sum + d.users, 0)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp size={14} />
                            <span>+12.3% from last period</span>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm text-foreground/70">Avg. Session Duration</div>
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <Globe className="text-orange-500" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">4m 32s</div>
                        <div className="flex items-center gap-1 text-xs text-red-600">
                            <TrendingDown size={14} />
                            <span>-2.1% from last period</span>
                        </div>
                    </Card>
                </div>

                {/* Views Over Time Chart */}
                <Card>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Views Over Time</h3>
                    <div className="space-y-4">
                        {analytics.viewsOverTime.map((data, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-foreground/70">{data.date}</span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {data.views.toLocaleString()} views
                                    </span>
                                </div>
                                <div className="w-full h-8 bg-muted rounded-lg overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-lg transition-all duration-500"
                                        style={{ width: `${(data.views / maxViews) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Top Portfolios */}
                    <Card>
                        <h3 className="text-xl font-semibold text-foreground mb-6">Top Portfolios</h3>
                        <div className="space-y-4">
                            {analytics.topPortfolios.map((portfolio, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">{portfolio.name}</div>
                                            <div className="text-xs text-foreground/60">{portfolio.owner}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-foreground">
                                            {portfolio.views.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-foreground/60">views</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Geographic Distribution */}
                    <Card>
                        <h3 className="text-xl font-semibold text-foreground mb-6">Geographic Distribution</h3>
                        <div className="space-y-4">
                            {analytics.geographicData.map((location, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-foreground">
                                                {location.country}
                                            </span>
                                            <span className="text-xs text-foreground/60">
                                                {location.users} users
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-foreground">
                                            {location.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-500"
                                            style={{ width: `${location.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Device Breakdown */}
                <Card>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Device Breakdown</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {analytics.deviceBreakdown.map((device, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-4">
                                    <svg className="mx-auto" width="120" height="120" viewBox="0 0 120 120">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="20"
                                            className="text-muted"
                                        />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="20"
                                            strokeDasharray={`${device.percentage * 3.14} ${314 - device.percentage * 3.14}`}
                                            strokeDashoffset="78.5"
                                            className="text-primary transition-all duration-500"
                                            transform="rotate(-90 60 60)"
                                        />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-foreground mb-1">
                                    {device.percentage}%
                                </div>
                                <div className="text-sm text-foreground/70">{device.device}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
