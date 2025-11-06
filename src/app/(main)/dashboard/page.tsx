'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { useAuth } from '@/lib/hooks/useAuth';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import { useFeatures } from '@/lib/hooks/useFeatures';
import { ROUTES } from '@/lib/constants/routes';
import { Plus, Eye, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

function DashboardContent() {
    const { user } = useAuth();
    const { portfolios, loading, deletePortfolio } = usePortfolio();
    const features = useFeatures();
    const toast = useToast();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!portfolioToDelete) return;

        try {
            await deletePortfolio(portfolioToDelete);
            toast.success('Portfolio deleted successfully');
            setDeleteModalOpen(false);
            setPortfolioToDelete(null);
        } catch (error) {
            toast.error('Failed to delete portfolio');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const canCreateMore = portfolios.length < features.portfolios;

    return (
        <div className="py-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-foreground mb-2"
                        >
                            Welcome back, {user?.displayName}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-foreground/70"
                        >
                            Manage your portfolios and track their performance
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0"
                    >
                        {canCreateMore ? (
                            <Link href={ROUTES.CREATE}>
                                <Button size="lg">
                                    <Plus size={20} className="mr-2" />
                                    Create New Portfolio
                                </Button>
                            </Link>
                        ) : (
                            <Button size="lg" disabled>
                                Portfolio Limit Reached
                            </Button>
                        )}
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <div className="text-sm text-foreground/70 mb-1">Total Portfolios</div>
                            <div className="text-3xl font-bold text-foreground">
                                {portfolios.length}
                                <span className="text-lg text-foreground/50 font-normal">
                                    {' '}
                                    / {features.portfolios === 999 ? '∞' : features.portfolios}
                                </span>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <div className="text-sm text-foreground/70 mb-1">Published</div>
                            <div className="text-3xl font-bold text-foreground">
                                {portfolios.filter((p) => p.isPublished).length}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card>
                            <div className="text-sm text-foreground/70 mb-1">Total Views</div>
                            <div className="text-3xl font-bold text-foreground">
                                {portfolios.reduce((acc, p) => acc + (p.views || 0), 0)}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Portfolios List */}
                {portfolios.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card className="text-center py-16">
                            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                                <Plus size={32} className="text-foreground/50" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">No portfolios yet</h2>
                            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                                Create your first portfolio and start showcasing your work to the world
                            </p>
                            <Link href={ROUTES.CREATE}>
                                <Button size="lg">
                                    <Plus size={20} className="mr-2" />
                                    Create Your First Portfolio
                                </Button>
                            </Link>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Your Portfolios</h2>

                        {portfolios.map((portfolio, index) => (
                            <motion.div
                                key={portfolio.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <Card hover>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-foreground">
                                                    {portfolio.data.personal.name || 'Untitled Portfolio'}
                                                </h3>
                                                <Badge variant={portfolio.isPublished ? 'success' : 'secondary'}>
                                                    {portfolio.isPublished ? 'Published' : 'Draft'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-foreground/70 mb-2">
                                                {portfolio.data.personal.title || 'No title set'}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-foreground/60">
                                                <span>{portfolio.views || 0} views</span>
                                                <span>•</span>
                                                <span>
                                                    Updated {new Date(portfolio.updatedAt.toDate()).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {portfolio.isPublished && (
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.PORTFOLIO(portfolio.slug)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button variant="ghost" size="sm">
                                                        <ExternalLink size={16} className="mr-2" />
                                                        View
                                                    </Button>
                                                </a>
                                            )}
                                            <Link href={ROUTES.EDIT(portfolio.id)}>
                                                <Button variant="secondary" size="sm">
                                                    <Edit size={16} className="mr-2" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setPortfolioToDelete(portfolio.id);
                                                    setDeleteModalOpen(true);
                                                }}
                                            >
                                                <Trash2 size={16} className="text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setPortfolioToDelete(null);
                }}
                title="Delete Portfolio"
            >
                <div className="space-y-4">
                    <p className="text-foreground/70">
                        Are you sure you want to delete this portfolio? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setDeleteModalOpen(false);
                                setPortfolioToDelete(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}