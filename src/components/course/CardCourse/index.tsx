import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Prop {
    imageUrl: string;
    name: string;
    description: string;
}

function CardCourse({ imageUrl, name, description }: Prop) {
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
                <Button size='small'>Share</Button>
                <Button size='small'>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default CardCourse;
