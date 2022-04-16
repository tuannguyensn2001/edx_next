import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';

export interface CartTotalProps {
    cartTotal: number;
}

export default function CartTotal({ cartTotal }: CartTotalProps) {
    console.log(
        '🚀 ~ file: CartTotal.tsx ~ line 9 ~ CartTotal ~ cartTotal',
        cartTotal
    );
    return (
        <Box marginTop={4}>
            <Card>
                <CardContent>
                    <Typography>Total:</Typography>
                    <Typography component={'p'} variant='h4'>
                        ${cartTotal.toFixed(2)}
                    </Typography>
                    <Typography
                        sx={{ textDecoration: 'line-through' }}
                        variant='body2'
                    >
                        $84.99
                    </Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        sx={{ marginTop: 1 }}
                    >
                        Buy
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
