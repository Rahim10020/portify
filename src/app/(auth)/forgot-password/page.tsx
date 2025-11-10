'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { sendPasswordResetEmail } from '@/lib/firebase/auth';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/lib/utils/validation';
import { ROUTES } from '@/lib/constants/routes';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        try {
            setLoading(true);
            await sendPasswordResetEmail(data.email);
            setEmailSent(true);
            toast.success('Password reset email sent! Check your inbox.');
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Check your email</h1>
                        <p className="text-foreground/70">
                            We've sent a password reset link to {getValues('email')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={() => router.push(ROUTES.LOGIN)}
                            className="w-full"
                        >
                            Back to Sign In
                        </Button>

                        <p className="text-sm text-foreground/70">
                            Didn't receive the email?{' '}
                            <button
                                onClick={() => setEmailSent(false)}
                                className="text-primary hover:underline"
                            >
                                Try again
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
        >
            <div>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Forgot your password?</h1>
                    <p className="text-foreground/70">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Send Reset Link
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-foreground/70">
                    Remember your password?{' '}
                    <Link href={ROUTES.LOGIN} className="cursor-pointer text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}