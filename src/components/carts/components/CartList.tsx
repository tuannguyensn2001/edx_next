import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CartItem from './CartItem';

export interface CartListProps {
    cartList: any;
    onDelete: (id: string | number) => void;
    onSave: (id: string | number) => void;
    onMove: (id: string | number) => void;
}

export default function CartList({
    cartList,
    onDelete,
    onSave,
    onMove,
}: CartListProps) {
    if (!cartList) return null;

    return (
        <Box>
            <Typography variant='h6'>
                {cartList.length} Course in Cart
            </Typography>
            <Card>
                <CardContent>
                    <Stack
                        direction={{
                            xs: 'column',
                            md: 'row',
                        }}
                        flexWrap='wrap'
                        gap={2}
                        sx={{
                            '& > div': {
                                width: '100%',
                            },
                        }}
                    >
                        {cartList.map((cart: any) => (
                            <Box key={cart.id}>
                                <CartItem
                                    cart={cart}
                                    onDelete={onDelete}
                                    onSave={onSave}
                                    onMove={onMove}
                                />
                            </Box>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
