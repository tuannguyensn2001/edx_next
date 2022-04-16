import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface CartItemProps {
    cart: any;
    onDelete: (id: string | number) => void;
    onSave: (id: string | number) => void;
    onMove: (id: string | number) => void;
}

export default function CartItem({
    cart,
    onDelete,
    onSave,
    onMove,
}: CartItemProps) {
    if (!cart) return null;

    return (
        <Box>
            <Stack direction='row' spacing={3} alignItems='center'>
                <Box
                    sx={{
                        minWidth: '100px',
                    }}
                    flexShrink={0}
                >
                    <Image
                        src={cart.image}
                        layout='responsive'
                        alt='image-1'
                        objectFit='cover'
                    />
                </Box>

                <Box>
                    <Stack>
                        <Typography fontWeight='bold'>{cart.name}</Typography>
                        <Typography variant='body2'>{cart.desc}</Typography>
                    </Stack>
                </Box>

                <Box flexShrink={0}>
                    <Stack>
                        <Button onClick={() => onDelete(cart.id)}>
                            Remove
                        </Button>
                        {!cart.isInSaledCart && (
                            <Button onClick={() => onSave(cart.id)}>
                                Save for Later
                            </Button>
                        )}
                        {cart.isInSaledCart && (
                            <Button onClick={() => onMove(cart.id)}>
                                Move to cart
                            </Button>
                        )}
                    </Stack>
                </Box>

                <Box>
                    <Typography color={'secondary'}>${cart.price}</Typography>
                </Box>
            </Stack>
        </Box>
    );
}
