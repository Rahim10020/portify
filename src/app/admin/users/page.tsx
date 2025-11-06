'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { getAllUsers } from '@/lib/firebase/firestore';
import { User } from '@/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Users</h2>
                <p className="text-foreground/70">Manage user accounts and permissions</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
                    <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <div className="text-sm text-foreground/70 mb-1">Total Users</div>
                    <div className="text-3xl font-bold text-foreground">{users.length}</div>
                </Card>
                <Card>
                    <div className="text-sm text-foreground/70 mb-1">Free Plan</div>
                    <div className="text-3xl font-bold text-foreground">
                        {users.filter((u) => u.plan === 'free').length}
                    </div>
                </Card>
                <Card>
                    <div className="text-sm text-foreground/70 mb-1">Pro Plan</div>
                    <div className="text-3xl font-bold text-foreground">
                        {users.filter((u) => u.plan === 'pro').length}
                    </div>
                </Card>
                <Card>
                    <div className="text-sm text-foreground/70 mb-1">Grandfathered</div>
                    <div className="text-3xl font-bold text-foreground">
                        {users.filter((u) => u.grandfathered).length}
                    </div>
                </Card>
            </div>

            {/* Users List */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">User</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Email</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Plan</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Joined</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-border hover:bg-muted/30">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-foreground">{user.displayName}</div>
                                    </td>
                                    <td className="py-3 px-4 text-foreground/70">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <Badge
                                            variant={
                                                user.plan === 'pro'
                                                    ? 'default'
                                                    : user.grandfathered
                                                        ? 'success'
                                                        : 'secondary'
                                            }
                                        >
                                            {user.plan === 'pro' ? 'Pro' : user.grandfathered ? 'Grandfathered' : 'Free'}
                                        </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-foreground/70 text-sm">
                                        {new Date(user.createdAt.toDate()).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {user.isAdmin && (
                                            <Badge variant="danger">Admin</Badge>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-foreground/70">
                            No users found
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}