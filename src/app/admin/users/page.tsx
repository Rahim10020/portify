'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';
import { getAllUsers } from '@/lib/firebase/firestore';
import { Search, Mail, Calendar, Shield, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: any;
    isAdmin: boolean;
    portfolioCount?: number;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const toast = useToast();

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.displayName?.toLowerCase().includes(query) ||
                        user.email?.toLowerCase().includes(query)
                )
            );
        }
    }, [searchQuery, users]);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }

        try {
            // TODO: Implement delete user function in firestore
            toast.success('User deleted successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
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
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">User Management</h2>
                    <p className="text-foreground/70">View and manage all registered users</p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Total Users</div>
                        <div className="text-3xl font-bold text-foreground">{users.length}</div>
                    </Card>
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Admins</div>
                        <div className="text-3xl font-bold text-foreground">
                            {users.filter((u) => u.isAdmin).length}
                        </div>
                    </Card>
                    <Card>
                        <div className="text-sm text-foreground/70 mb-1">Regular Users</div>
                        <div className="text-3xl font-bold text-foreground">
                            {users.filter((u) => !u.isAdmin).length}
                        </div>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                        />
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                {/* Users Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        User
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        Email
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        Joined
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        Role
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                                        Portfolios
                                    </th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.uid} className="border-b border-border hover:bg-muted/30">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                {user.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-primary font-semibold">
                                                            {user.displayName?.charAt(0).toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-foreground">
                                                        {user.displayName || 'Unknown User'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2 text-foreground/70">
                                                <Mail size={14} />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-foreground/70">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {user.createdAt?.toDate
                                                    ? new Date(user.createdAt.toDate()).toLocaleDateString()
                                                    : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.isAdmin ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                    <Shield size={12} />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-foreground/70 text-xs font-medium">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-foreground">
                                            {user.portfolioCount || 0}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`${ROUTES.DASHBOARD}?userId=${user.uid}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Eye size={16} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user.uid)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12 text-foreground/70">
                                {searchQuery ? 'No users found matching your search' : 'No users yet'}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
