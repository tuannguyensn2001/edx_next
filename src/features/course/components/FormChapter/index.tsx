import {
    SortableContainer,
    SortableElement,
    SortEnd,
} from 'react-sortable-hoc';
import { useState } from 'react';
import { IChapter } from 'models/IChapter';
import { arrayMoveImmutable } from 'array-move';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chapter from 'features/course/components/Chapter';
import { memo } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import ModalChapter from 'features/course/components/ModalChapter';
import { FormChapterType } from 'features/course/types';

const SortableItem = memo(
    SortableElement(({ value }: { value: IChapter }) => (
        <Chapter name={value.name} order={value.order} key={value._id} />
    ))
);

const SortableContainerFake = memo(
    SortableContainer(({ children }: { children: any }) => {
        return <div>{children}</div>;
    })
);

function FormChapter() {
    const { register, watch, control } = useForm<FormChapterType>({
        defaultValues: {
            sortable: false,
            currentChapter: {
                name: '',
            },
        },
    });

    const [chapters, setChapters] = useState<IChapter[]>([
        {
            _id: '1',
            name: 'Chapter 1',
            order: 1,
        },
        {
            _id: '2',
            name: 'Chapter 2',
            order: 2,
        },
        {
            _id: '3',
            name: 'Chapter 3',
            order: 3,
        },
    ]);

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        setChapters(arrayMoveImmutable(chapters, oldIndex - 1, newIndex - 1));
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setChapters((prevState) => [
            ...prevState,
            {
                _id: `${prevState.length + 1}`,
                name: watch('currentChapter.name'),
                order: prevState.length + 1,
            },
        ]);
    };

    return (
        <div>
            <ModalChapter
                control={control}
                isOpen={isOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
            />
            <div>
                <Button variant={'contained'} onClick={handleClickOpen}>
                    Thêm mới
                </Button>
            </div>
            <div className={'tw-flex tw-justify-between'}>
                <div>
                    <FormGroup>
                        <FormControlLabel
                            {...register('sortable')}
                            control={<Checkbox />}
                            label='Sắp xếp thứ tự các chương học'
                        />
                    </FormGroup>
                </div>
                <div>
                    {watch('sortable') && (
                        <Button variant={'contained'}>
                            Lưu thay đổi sắp xếp
                        </Button>
                    )}
                </div>
            </div>
            <div>
                <SortableContainerFake
                    transitionDuration={500}
                    onSortEnd={onSortEnd}
                >
                    {chapters.map((item) => (
                        <SortableItem
                            disabled={!watch('sortable')}
                            key={item._id}
                            value={item}
                            index={item.order}
                        />
                    ))}
                </SortableContainerFake>
            </div>
        </div>
    );
}

export default FormChapter;
