'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastState {
    toasts: Toast[];
    addToast: (type: ToastType, message: string) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    addToast: (type, message) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, type, message }],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 5000);
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));

export const useToast = () => {
    const addToast = useToastStore((state) => state.addToast);

    return {
        success: (message: string) => addToast('success', message),
        error: (message: string) => addToast('error', message),
        info: (message: string) => addToast('info', message),
    };
};

export const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-background border border-border rounded-lg shadow-xl p-4 min-w-[300px] max-w-md"
                    >
                        <div className="flex items-start gap-3">
                            {toast.type === 'success' && (
                                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                            )}
                            {toast.type === 'error' && (
                                <XCircle className="text-red-500 flex-shrink-0" size={20} />
                            )}
                            {toast.type === 'info' && (
                                <AlertCircle className="text-blue-500 flex-shrink-0" size={20} />
                            )}

                            <p className="text-sm text-foreground flex-1">{toast.message}</p>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-foreground/50 hover:text-foreground transition-colors flex-shrink-0"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};