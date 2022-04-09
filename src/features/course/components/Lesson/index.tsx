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
        <div className={'tw-flex tw-justify-between tw-my-4'}>
            <div>{name}</div>
            <Button
                className={'tw-bg-green-900 hover:tw-bg-green-500'}
                onClick={handleClickEdit}
                variant={'contained'}
            >
                Sửa
            </Button>
        </div>
    );
}

export default Lesson;
