import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMemo } from 'react';

export default function useAuth() {
    const { user, isLoading, isLoaded } = useSelector(
        (state: RootState) => state.auth
    );

    const isLoggedIn = useMemo<boolean>(() => {
        return !!user;
    }, [user]);

    return {
        isLoggedIn,
        user,
        isLoading,
        isLoaded,
    };
}
