import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

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

        // Check if email already exists
        const q = query(
            collection(db, 'newsletter'),
            where('email', '==', email.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 409 }
            );
        }

        // Add to newsletter collection
        await addDoc(collection(db, 'newsletter'), {
            email: email.toLowerCase(),
            subscribedAt: serverTimestamp(),
            status: 'active',
            source: 'website',
        });

        return NextResponse.json(
            { message: 'Successfully subscribed to newsletter' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
        );
    }
}