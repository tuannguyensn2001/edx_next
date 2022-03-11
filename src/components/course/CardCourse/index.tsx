import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface Prop {
    imageUrl: string;
    name: string;
    description: string;
    id: string;
}

function CardCourse({ imageUrl, name, description, id }: Prop) {
    return (
        <Card>
            <CardMedia
                component='img'
                alt='green iguana'
                height='250'
                image={imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/profile/courses/${id}/edit`}>
                    <Button size='small' variant={'contained'}>
                        Xem chi tiết
                    </Button>
                </Link>
                <Button size='small'>Xóa</Button>
            </CardActions>
        </Card>
    );
}

export default CardCourse;
