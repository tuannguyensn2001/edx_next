import { Box, Container, Stack } from '@mui/material';
import * as React from 'react';
import CartList from './components/CartList';
import CartSaved from './components/CartSaved';
import CartTotal from './components/CartTotal';
import course1 from '../../images/course1.jpeg';

export function CartLayout() {
    const [cartList, setCartList] = React.useState([
        {
            id: 1,
            image: course1,
            name: 'Learn React 1',
            desc: 'Walkthroughs on advanced React v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: false,
        },
        {
            id: 2,
            image: course1,
            name: 'Learn React 2',
            desc: 'Walkthroughs on advanced React v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: false,
        },
        {
            id: 3,
            image: course1,
            name: 'Learn React 3',
            desc: 'Walkthroughs on advanced React v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: false,
        },
        {
            id: 4,
            image: course1,
            name: 'Learn Vue 1',
            desc: 'Walkthroughs on advanced Vue v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: true,
        },
        {
            id: 5,
            image: course1,
            name: 'Learn Vue 2',
            desc: 'Walkthroughs on advanced Vue v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: true,
        },
        {
            id: 6,
            image: course1,
            name: 'Learn Vue 3',
            desc: 'Walkthroughs on advanced Vue v16.6.3 and Redux v4.0.0 - Authentication, Testing',
            price: '84.99',
            isInSaledCart: true,
        },
    ]);
    const cartTotal = cartList
        .filter((x) => !x.isInSaledCart)
        .reduce((total, item) => total + +item.price, 0);

    const handleDelete = (id: string | number) => {
        setCartList((prev) => prev.filter((x) => x.id !== id));
    };

    const handleSave = (id: string | number) => {
        setCartList((prev) =>
            prev.map((x) => (x.id === id ? { ...x, isInSaledCart: true } : x))
        );
    };

    const handleMove = (id: string | number) => {
        setCartList((prev) =>
            prev.map((x) => (x.id === id ? { ...x, isInSaledCart: false } : x))
        );
    };

    return (
        <Box>
            <Container>
                <Stack direction='row' py={2} spacing={2}>
                    <Box width={'70%'}>
                        <CartList
                            cartList={cartList.filter((x) => !x.isInSaledCart)}
                            onDelete={handleDelete}
                            onSave={handleSave}
                            onMove={handleMove}
                        />
                        <CartSaved
                            cartList={cartList.filter((x) => x.isInSaledCart)}
                            onDelete={handleDelete}
                            onSave={handleSave}
                            onMove={handleMove}
                        />
                    </Box>
                    <Box width={'30%'}>
                        <CartTotal cartTotal={cartTotal} />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
