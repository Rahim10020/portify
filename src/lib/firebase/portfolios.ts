import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Portfolio } from '@/types';

export const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
    const docRef = doc(db, 'portfolios', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    return {
        id: docSnap.id,
        ...docSnap.data(),
    } as Portfolio;
};

export const getPortfolioBySlug = async (slug: string): Promise<Portfolio | null> => {
    const q = query(collection(db, 'portfolios'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data(),
    } as Portfolio;
};

export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
    const q = query(
        collection(db, 'portfolios'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Portfolio[];
};

export const createPortfolio = async (
    portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Portfolio> => {
    const docRef = await addDoc(collection(db, 'portfolios'), {
        ...portfolioData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return {
        id: docRef.id,
        ...portfolioData,
        createdAt: new Date() as any,
        updatedAt: new Date() as any,
    };
};

export const updatePortfolio = async (
    id: string,
    data: Partial<Omit<Portfolio, 'id' | 'userId' | 'createdAt' | 'views'>>
): Promise<void> => {
    const portfolioRef = doc(db, 'portfolios', id);

    await updateDoc(portfolioRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
};

export const deletePortfolio = async (id: string): Promise<void> => {
    const docRef = doc(db, 'portfolios', id);
    await deleteDoc(docRef);
};

export const incrementPortfolioViews = async (id: string): Promise<void> => {
    const docRef = doc(db, 'portfolios', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const currentViews = docSnap.data().views || 0;
        await updateDoc(docRef, {
            views: currentViews + 1,
        });
    }
};