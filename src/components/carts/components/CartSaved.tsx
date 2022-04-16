import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import * as React from 'react';
import CartItem from './CartItem';

export interface CartSavedProps {
    cartList: any;
    onDelete: (id: string | number) => void;
    onSave: (id: string | number) => void;
    onMove: (id: string | number) => void;
}

export default function CartSaved({
    cartList,
    onDelete,
    onSave,
    onMove,
}: CartSavedProps) {
    if (!cartList) return null;

    return (
        <Box pt={2}>
            <Typography variant='h6'>Saved for later</Typography>
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
