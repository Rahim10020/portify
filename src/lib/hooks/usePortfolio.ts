import { useState, useEffect } from 'react';
import {
    getUserPortfolios,
    createPortfolio as createPortfolioFirestore,
    updatePortfolio as updatePortfolioFirestore,
    deletePortfolio as deletePortfolioFirestore,
    getPortfolioById,
} from '@/lib/firebase/firestore';
import { Portfolio } from '@/types';
import { useAuth } from './useAuth';

export const usePortfolio = () => {
    const { user } = useAuth();
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchPortfolios();
        } else {
            setPortfolios([]);
            setLoading(false);
        }
    }, [user]);

    const fetchPortfolios = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const data = await getUserPortfolios(user.id);
            setPortfolios(data);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        } finally {
            setLoading(false);
        }
    };

    const createPortfolio = async (
        portfolioData: Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        try {
            const id = await createPortfolioFirestore(portfolioData);
            await fetchPortfolios();
            return id;
        } catch (error) {
            console.error('Error creating portfolio:', error);
            throw error;
        }
    };

    const updatePortfolio = async (id: string, data: Partial<Portfolio>) => {
        try {
            await updatePortfolioFirestore(id, data);
            await fetchPortfolios();
        } catch (error) {
            console.error('Error updating portfolio:', error);
            throw error;
        }
    };

    const deletePortfolio = async (id: string) => {
        try {
            await deletePortfolioFirestore(id);
            await fetchPortfolios();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            throw error;
        }
    };

    const getPortfolio = async (id: string) => {
        try {
            return await getPortfolioById(id);
        } catch (error) {
            console.error('Error getting portfolio:', error);
            throw error;
        }
    };

    return {
        portfolios,
        loading,
        createPortfolio,
        updatePortfolio,
        deletePortfolio,
        getPortfolio,
        refreshPortfolios: fetchPortfolios,
    };
};