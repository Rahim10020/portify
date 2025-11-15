'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
import { getAllNewsletterSubscribers } from '@/lib/firebase/firestore';
import { Download } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

interface Subscriber {
    id: string;
    email: string;
    subscribedAt: Timestamp;
}

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        loadSubscribers();
    }, []);

    const loadSubscribers = async () => {
        try {
            const data = await getAllNewsletterSubscribers();
            setSubscribers(data);
        } catch (error) {
            toast.error('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const emails = subscribers.map((s) => s.email).join('\n');
        const blob = new Blob([emails], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Subscribers exported successfully');
    };

    const handleExportCSV = () => {
        const csv = [
            'Email,Subscribed At',
            ...subscribers.map(
                (s) =>
                    `${s.email},${new Date(s.subscribedAt.toDate()).toISOString()}`
            ),
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Subscribers exported as CSV');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-35">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-26">
            <div className='max-w-3xl mx-auto space-y-6'>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Newsletter Subscribers</h2>
                    <p className="text-foreground/70">Manage and export your newsletter subscribers</p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Total Subscribers</div>
                        <div className="text-3xl font-bold text-foreground">{subscribers.length}</div>
                    </Card>
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">This Month</div>
                        <div className="text-3xl font-bold text-foreground">
                            {
                                subscribers.filter((s) => {
                                    const date = new Date(s.subscribedAt.toDate());
                                    const now = new Date();
                                    return (
                                        date.getMonth() === now.getMonth() &&
                                        date.getFullYear() === now.getFullYear()
                                    );
                                }).length
                            }
                        </div>
                    </Card>
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">This Week</div>
                        <div className="text-3xl font-bold text-foreground">
                            {
                                subscribers.filter((s) => {
                                    const date = new Date(s.subscribedAt.toDate());
                                    const now = new Date();
                                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                                    return date >= weekAgo;
                                }).length
                            }
                        </div>
                    </Card>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-4 mb-6">
                    <Button onClick={handleExport} disabled={subscribers.length === 0}>
                        <Download size={16} className="mr-2" />
                        Export as TXT
                    </Button>
                    <Button onClick={handleExportCSV} variant="secondary" disabled={subscribers.length === 0}>
                        <Download size={16} className="mr-2" />
                        Export as CSV
                    </Button>
                </div>

                {/* Subscribers List */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Email</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        Subscribed At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.map((subscriber) => (
                                    <tr key={subscriber.id} className="border-b border-border hover:bg-muted/30">
                                        <td className="py-3 px-4 text-foreground">{subscriber.email}</td>
                                        <td className="py-3 px-4 text-foreground/70">
                                            {new Date(subscriber.subscribedAt.toDate()).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {subscribers.length === 0 && (
                            <div className="text-center py-12 text-foreground/70">
                                No subscribers yet
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}