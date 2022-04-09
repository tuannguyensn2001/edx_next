import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IChapter } from 'models/IChapter';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { memo } from 'react';
import { useConfirm } from 'material-ui-confirm';
import ModalLesson from 'features/course/components/ModalLesson';
import useManageModalLesson from 'features/course/hooks/useManageModalLesson';
import { ILesson } from 'models/ILesson';
import useGetLessonsByChapter from 'features/course/hooks/useGetLessonsByChapter';
import Lesson from 'features/course/components/Lesson';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

interface Prop extends IChapter {
    handleClickEdit: (chapter: IChapter) => void;
    handleDelete: (id: string) => void;
}

const SortableContainerFake = memo(
    SortableContainer(({ children }: { children: any }) => {
        return <div>{children}</div>;
    })
);

const SortableItem = SortableElement(({ id, name, onClickEdit, key }: any) => (
    <Lesson id={id} name={name} key={key} onClickEdit={onClickEdit} />
));

function Chapter({
    name,
    handleClickEdit,
    _id,
    id,
    order,
    handleDelete,
}: Prop) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { lessons, addLesson, editLesson, sortLesson } =
        useGetLessonsByChapter(Number(id));

    const confirm = useConfirm();

    const onChange = () => {
        setIsOpen((prevState) => !prevState);
    };

    const clickEdit = () => {
        handleClickEdit({ _id, name, id, order });
    };

    const clickDelete = () => {
        confirm({
            title: 'Xóa chương học',
            description: 'Bạn có chắc chắn muốn xóa chương học',
            confirmationButtonProps: {
                variant: 'contained',
            },
        }).then((r) => {
            if (!id) return;
            handleDelete(id);
        });
    };

    const {
        isOpen: isOpenModal,
        handleClose,
        handleOpen,
        mode,
        handleSubmitModal,
        control,
        reset,
    } = useManageModalLesson(Number(id), {
        handleCreateLessonSuccess: addLesson,
        handleEditLessonSuccess: editLesson,
    });

    const handleClickEditLesson = (id: number) => {
        const lesson = lessons.find((item) => item.id === id);
        reset({
            ...lesson,
        });
        handleOpen();
    };

    return (
        <>
            <ModalLesson
                control={control}
                isOpen={isOpenModal}
                handleClickOpen={handleOpen}
                handleClose={handleClose}
                handleSubmit={handleSubmitModal}
                mode={mode}
            />
            <Accordion expanded={isOpen} onChange={onChange}>
                <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <div className={'tw-flex tw-justify-end'}>
                            <Button variant={'contained'} onClick={clickEdit}>
                                Sửa
                            </Button>
                            <Button onClick={clickDelete} variant={'outlined'}>
                                Xóa
                            </Button>
                            <Button onClick={handleOpen} variant={'contained'}>
                                Thêm mới bài học
                            </Button>
                        </div>

                        <SortableContainerFake
                            transitionDuration={500}
                            onSortEnd={sortLesson}
                        >
                            {lessons?.map((item) => (
                                <SortableItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    onClickEdit={handleClickEditLesson}
                                    index={item.order}
                                />
                            ))}
                        </SortableContainerFake>
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Chapter;
