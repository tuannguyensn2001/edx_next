import { ILesson } from 'models/ILesson';
import Button from '@mui/material/Button';

type Prop = Pick<ILesson, 'name' | 'id'> & {
    onClickEdit: (id: number) => void;
};

function Lesson({ name, id, onClickEdit }: Prop) {
    const handleClickEdit = () => {
        onClickEdit(id);
    };

    return (
        <div className={'tw-flex'}>
            <div>{name}</div>
            <Button onClick={handleClickEdit} variant={'contained'}>
                Sửa
            </Button>
        </div>
    );
}

export default Lesson;
