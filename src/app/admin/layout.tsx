import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute requireAdmin>
            <div className="min-h-screen bg-muted/30">
                <div className="border-b border-border bg-background">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                    </div>
                </div>
                {children}
            </div>
        </ProtectedRoute>
    );
}