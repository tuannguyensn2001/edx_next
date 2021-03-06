import type { AppProps } from 'next/app';
import 'styles/global.scss';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import store from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getCurrentUserThunk } from 'features/auth/slices/thunk';
import { ConfirmProvider } from 'material-ui-confirm';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        store.dispatch(getCurrentUserThunk());
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <ConfirmProvider>
                    <Component {...pageProps} />
                </ConfirmProvider>
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
