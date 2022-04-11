import React, { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { preventRouter } from 'apps';

function WithAuth<T>(Component: () => JSX.Element) {
    // eslint-disable-next-line react/display-name
    return (props: T) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { isLoggedIn, isLoading, isLoaded } = useAuth();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dispatch = useDispatch();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!isLoggedIn && isLoaded) {
                dispatch(preventRouter(window.location.href));
                router.push('/login');
            }
        }, [isLoggedIn, isLoaded]);

        // @ts-ignore
        return <>{isLoggedIn && <Component {...props} />}</>;
    };
}

export default WithAuth;
