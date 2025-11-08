'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { logger } from '@/lib/utils/logger';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        logger.error('React Error Boundary caught an error', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        });
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full text-center">
                        <div className="text-6xl mb-6">⚠️</div>
                        <h1 className="text-3xl font-bold text-foreground mb-4">
                            Oops, something went wrong
                        </h1>
                        <p className="text-foreground/70 mb-8">
                            We're sorry for the inconvenience. The error has been logged and we'll look into it.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left">
                                <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => window.location.reload()}
                            >
                                Reload Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}