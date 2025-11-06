import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getCurrentUser } from '@/lib/firebase/auth';
import { useAuthStore } from '@/lib/store/authStore';

export const useAuth = () => {
    const { user, loading, setUser, setLoading, clearUser } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = await getCurrentUser(firebaseUser.uid);
                setUser(userData);
            } else {
                clearUser();
            }
        });

        return () => unsubscribe();
    }, [setUser, clearUser]);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
    };
};