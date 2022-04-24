import React from 'react';
import DefaultLayout from 'layouts/Default/index';
import { CartLayout } from 'components/carts';

const CartsPage = () => {
    return (
        <DefaultLayout>
            <CartLayout />
        </DefaultLayout>
    );
};

export default CartsPage;
