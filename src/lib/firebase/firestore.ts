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
    DocumentData,
} from 'firebase/firestore';
import { db } from './config';
import { Portfolio, User, AppSettings } from '@/types';
import { logger } from '@/lib/utils/logger';

// Helper pour convertir les timestamps Firestore
function convertTimestamp(data: DocumentData): any {
    const converted: any = { ...data };
    Object.keys(converted).forEach((key) => {
        if (converted[key] instanceof Timestamp) {
            converted[key] = converted[key];
        } else if (typeof converted[key] === 'object' && converted[key] !== null) {
            converted[key] = convertTimestamp(converted[key]);
        }
    });
    return converted;
}

// Portfolios
export const createPortfolio = async (
    portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
    try {
        const portfolioRef = doc(collection(db, 'portfolios'));

        await setDoc(portfolioRef, {
            ...portfolioData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        logger.info('Portfolio created', { portfolioId: portfolioRef.id, userId: portfolioData.userId });
        return portfolioRef.id;
    } catch (error) {
        logger.error('Failed to create portfolio', error, portfolioData.userId);
        throw new Error('Failed to create portfolio. Please try again.');
    }
};

export const getPortfolioById = async (id: string): Promise<Portfolio | null> => {
    try {
        const portfolioDoc = await getDoc(doc(db, 'portfolios', id));

        if (!portfolioDoc.exists()) {
            return null;
        }

        const data = convertTimestamp(portfolioDoc.data());

        return {
            id: portfolioDoc.id,
            ...data,
        } as Portfolio;
    } catch (error) {
        logger.error('Failed to get portfolio by id', error);
        throw new Error('Failed to load portfolio');
    }
};

export const getPortfolioBySlug = async (slug: string): Promise<Portfolio | null> => {
    try {
        const q = query(collection(db, 'portfolios'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const portfolioDoc = querySnapshot.docs[0];
        const data = convertTimestamp(portfolioDoc.data());

        return {
            id: portfolioDoc.id,
            ...data,
        } as Portfolio;
    } catch (error) {
        logger.error('Failed to get portfolio by slug', error);
        throw new Error('Failed to load portfolio');
    }
};

export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
    try {
        const q = query(
            collection(db, 'portfolios'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            const data = convertTimestamp(doc.data());
            return {
                id: doc.id,
                ...data,
            } as Portfolio;
        });
    } catch (error) {
        logger.error('Failed to get user portfolios', error, userId);
        throw new Error('Failed to load portfolios');
    }
};

export const updatePortfolio = async (
    id: string,
    data: Partial<Portfolio>
): Promise<void> => {
    try {
        await updateDoc(doc(db, 'portfolios', id), {
            ...data,
            updatedAt: serverTimestamp(),
        });

        logger.info('Portfolio updated', { portfolioId: id });
    } catch (error) {
        logger.error('Failed to update portfolio', error);
        throw new Error('Failed to update portfolio. Please try again.');
    }
};

export const deletePortfolio = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'portfolios', id));
        logger.info('Portfolio deleted', { portfolioId: id });
    } catch (error) {
        logger.error('Failed to delete portfolio', error);
        throw new Error('Failed to delete portfolio. Please try again.');
    }
};

export const incrementPortfolioViews = async (id: string): Promise<void> => {
    try {
        const portfolioRef = doc(db, 'portfolios', id);
        const portfolioDoc = await getDoc(portfolioRef);

        if (portfolioDoc.exists()) {
            const currentViews = portfolioDoc.data().views || 0;
            await updateDoc(portfolioRef, {
                views: currentViews + 1,
            });
        }
    } catch (error) {
        // Ne pas throw d'erreur pour les vues (non-critique)
        logger.warn('Failed to increment portfolio views', { portfolioId: id });
    }
};

// App Settings
export const getAppSettings = async (): Promise<AppSettings | null> => {
    try {
        const settingsDoc = await getDoc(doc(db, 'appSettings', 'global'));

        if (!settingsDoc.exists()) {
            logger.warn('App settings not found, using defaults');
            return null;
        }

        const data = convertTimestamp(settingsDoc.data());
        return data as AppSettings;
    } catch (error) {
        logger.error('Failed to get app settings', error);
        throw new Error('Failed to load settings');
    }
};

export const updateAppSettings = async (
    settings: Partial<AppSettings>
): Promise<void> => {
    try {
        await updateDoc(doc(db, 'appSettings', 'global'), {
            ...settings,
            updatedAt: serverTimestamp(),
        });

        logger.info('App settings updated');
    } catch (error) {
        logger.error('Failed to update app settings', error);
        throw new Error('Failed to update settings. Please try again.');
    }
};

// Users
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));

        return querySnapshot.docs.map((doc) => {
            const data = convertTimestamp(doc.data());
            return {
                id: doc.id,
                ...data,
            } as User;
        });
    } catch (error) {
        logger.error('Failed to get all users', error);
        throw new Error('Failed to load users');
    }
};

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', id));

        if (!userDoc.exists()) {
            return null;
        }

        const data = convertTimestamp(userDoc.data());

        return {
            id: userDoc.id,
            ...data,
        } as User;
    } catch (error) {
        logger.error('Failed to get user by id', error);
        throw new Error('Failed to load user');
    }
};

export const updateUser = async (
    id: string,
    data: Partial<User>
): Promise<void> => {
    try {
        await updateDoc(doc(db, 'users', id), {
            ...data,
            updatedAt: serverTimestamp(),
        });

        logger.info('User updated', { userId: id });
    } catch (error) {
        logger.error('Failed to update user', error, id);
        throw new Error('Failed to update user. Please try again.');
    }
};

// Newsletter
export const subscribeToNewsletter = async (email: string, source: string): Promise<void> => {
    try {
        // Vérifier si l'email existe déjà
        const q = query(collection(db, 'newsletter'), where('email', '==', email.toLowerCase()));
        const existing = await getDocs(q);

        if (!existing.empty) {
            throw new Error('Email already subscribed');
        }

        const newsletterRef = doc(collection(db, 'newsletter'));

        await setDoc(newsletterRef, {
            email: email.toLowerCase(),
            source,
            subscribedAt: serverTimestamp(),
            status: 'active',
        });

        logger.info('Newsletter subscription', { email, source });
    } catch (error) {
        logger.error('Failed to subscribe to newsletter', error);
        throw error;
    }
};

export const getAllNewsletterSubscribers = async (): Promise<Array<{ id: string; email: string; subscribedAt: Timestamp }>> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'newsletter'));

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            email: doc.data().email,
            subscribedAt: doc.data().subscribedAt,
        }));
    } catch (error) {
        logger.error('Failed to get newsletter subscribers', error);
        throw new Error('Failed to load subscribers');
    }
};

export const getTotalPortfolios = async (): Promise<number> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'portfolios'));
        return querySnapshot.size;
    } catch (error) {
        logger.error('Failed to get total portfolios', error);
        throw new Error('Failed to load total portfolios');
    }
};

export const getTotalViews = async (): Promise<number> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'portfolios'));
        let totalViews = 0;
        querySnapshot.forEach((doc) => {
            totalViews += doc.data().views || 0;
        });
        return totalViews;
    } catch (error) {
        logger.error('Failed to get total views', error);
        throw new Error('Failed to load total views');
    }
};