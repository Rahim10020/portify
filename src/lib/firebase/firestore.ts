import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Portfolio, User, AppSettings } from '@/types';

// Portfolios
export const createPortfolio = async (
    portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
    const portfolioRef = doc(collection(db, 'portfolios'));

    await setDoc(portfolioRef, {
        ...portfolioData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return portfolioRef.id;
};

export const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
    const portfolioDoc = await getDoc(doc(db, 'portfolios', id));

    if (!portfolioDoc.exists()) {
        return null;
    }

    return {
        id: portfolioDoc.id,
        ...portfolioDoc.data(),
    } as Portfolio;
};

export const getPortfolioBySlug = async (slug: string): Promise<Portfolio | null> => {
    const q = query(collection(db, 'portfolios'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const portfolioDoc = querySnapshot.docs[0];
    return {
        id: portfolioDoc.id,
        ...portfolioDoc.data(),
    } as Portfolio;
};

export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
    const q = query(
        collection(db, 'portfolios'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Portfolio[];
};

export const updatePortfolio = async (
    id: string,
    data: Partial<Portfolio>
): Promise<void> => {
    await updateDoc(doc(db, 'portfolios', id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
};

export const deletePortfolio = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'portfolios', id));
};

export const incrementPortfolioViews = async (id: string): Promise<void> => {
    const portfolioRef = doc(db, 'portfolios', id);
    const portfolioDoc = await getDoc(portfolioRef);

    if (portfolioDoc.exists()) {
        const currentViews = portfolioDoc.data().views || 0;
        await updateDoc(portfolioRef, {
            views: currentViews + 1,
        });
    }
};

// App Settings
export const getAppSettings = async (): Promise<AppSettings | null> => {
    const settingsDoc = await getDoc(doc(db, 'appSettings', 'global'));

    if (!settingsDoc.exists()) {
        return null;
    }

    return settingsDoc.data() as AppSettings;
};

export const updateAppSettings = async (
    settings: Partial<AppSettings>
): Promise<void> => {
    await updateDoc(doc(db, 'appSettings', 'global'), {
        ...settings,
        updatedAt: serverTimestamp(),
    });
};

// Users
export const getAllUsers = async (): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, 'users'));

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as User[];
};

export const getUserById = async (id: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, 'users', id));

    if (!userDoc.exists()) {
        return null;
    }

    return {
        id: userDoc.id,
        ...userDoc.data(),
    } as User;
};

export const updateUser = async (
    id: string,
    data: Partial<User>
): Promise<void> => {
    await updateDoc(doc(db, 'users', id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
};

// Newsletter
export const subscribeToNewsletter = async (email: string, source: string): Promise<void> => {
    const newsletterRef = doc(collection(db, 'newsletter'));

    await setDoc(newsletterRef, {
        email,
        source,
        subscribedAt: serverTimestamp(),
    });
};

export const getAllNewsletterSubscribers = async (): Promise<Array<{ id: string; email: string; subscribedAt: Timestamp }>> => {
    const querySnapshot = await getDocs(collection(db, 'newsletter'));

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Array<{ id: string; email: string; subscribedAt: Timestamp }>;
};