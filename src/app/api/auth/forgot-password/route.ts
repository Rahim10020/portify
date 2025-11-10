import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/firebase/auth';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validation
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Send password reset email
        await sendPasswordResetEmail(email);

        return NextResponse.json(
            { message: 'Password reset email sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Forgot password error:', error);

        // Handle specific Firebase auth errors
        if (error.code === 'auth/user-not-found') {
            return NextResponse.json(
                { error: 'No account found with this email address' },
                { status: 404 }
            );
        }

        if (error.code === 'auth/invalid-email') {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        if (error.code === 'auth/too-many-requests') {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to send reset email. Please try again.' },
            { status: 500 }
        );
    }
}