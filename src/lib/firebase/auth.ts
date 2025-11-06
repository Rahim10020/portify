import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { User } from '@/types';

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName });

    const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const newUser: Omit<User, 'id'> = {
        email: firebaseUser.email!,
        displayName,
        photoURL: firebaseUser.photoURL || undefined,
        plan: 'free',
        grandfathered: false,
        isAdmin,
        newsletterSubscribed: false,
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

    return {
        id: firebaseUser.uid,
        ...newUser,
    } as User;
};

export const signInWithEmail = async (
    email: string,
    password: string
): Promise<FirebaseUser> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const signInWithGoogle = async (): Promise<User> => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (!userDoc.exists()) {
        const isAdmin = firebaseUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        const newUser: Omit<User, 'id'> = {
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || 'User',
            photoURL: firebaseUser.photoURL || undefined,
            plan: 'free',
            grandfathered: false,
            isAdmin,
            newsletterSubscribed: false,
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

        return {
            id: firebaseUser.uid,
            ...newUser,
        } as User;
    }

    return {
        id: userDoc.id,
        ...userDoc.data(),
    } as User;
};

export const signOut = async (): Promise<void> => {
    await firebaseSignOut(auth);
};

export const getCurrentUser = async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (!userDoc.exists()) {
        return null;
    }

    return {
        id: userDoc.id,
        ...userDoc.data(),
    } as User;
};