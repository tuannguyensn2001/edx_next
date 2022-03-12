import {
    SortableContainer,
    SortableElement,
    SortEnd,
} from 'react-sortable-hoc';
import { useMemo, useState } from 'react';
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
import useGetChapters from 'features/course/hooks/useGetChapters';
import useCreateChapters from 'features/course/hooks/useCreateChapters';
import { useRouter } from 'next/router';
import useUpdateChapter from 'features/course/hooks/useUpdateChapter';

const SortableItem = memo(
    SortableElement(
        ({
            value,
            disabled,
            handleClickEdit,
        }: {
            value: IChapter;
            disabled: boolean;
            handleClickEdit: (chapter: IChapter) => void;
        }) => (
            <Chapter
                handleClickEdit={handleClickEdit}
                key={value._id}
                {...value}
            />
        )
    )
);

const SortableContainerFake = memo(
    SortableContainer(({ children }: { children: any }) => {
        return <div>{children}</div>;
    })
);

function FormChapter() {
    const {
        register,
        watch,
        control,
        setError,
        resetField,
        handleSubmit,
        setValue,
    } = useForm<FormChapterType>({
        defaultValues: {
            sortable: false,
            currentChapter: {
                name: '',
                id: undefined,
            },
        },
    });

    const mode = useMemo<'create' | 'edit'>(() => {
        return !!watch('currentChapter._id') ? 'edit' : 'create';
    }, [watch('currentChapter._id')]);

    const { query } = useRouter();

    const { chapters, setChapters } = useGetChapters();

    const { mutate } = useCreateChapters({
        onSuccess(chapter) {
            setChapters((prevState) => [...prevState, chapter]);
            setIsOpen(false);
            resetField('currentChapter', {
                keepError: false,
            });
        },
        onError(error) {
            setError('currentChapter.name', {
                message: error.response?.data.message,
            });
        },
    });

    const { mutate: mutateUpdate } = useUpdateChapter({
        onSuccess(chapter) {
            setChapters((prevState) => {
                const clone = [...prevState];

                const index = clone.findIndex(
                    (item) => item._id === chapter._id
                );

                clone[index] = {
                    ...clone[index],
                    name: chapter.name,
                };

                return clone;
            });
            resetField('currentChapter', {
                keepError: false,
            });
            setIsOpen(false);
        },
    });

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        setChapters(arrayMoveImmutable(chapters, oldIndex - 1, newIndex - 1));
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const submit = (data: FormChapterType) => {
        if (!query.id) return;

        if (mode === 'create') {
            const currentChapter = data.currentChapter;
            mutate({
                name: currentChapter.name,
                courseId: query.id.toString(),
            });
        } else if (mode === 'edit') {
            if (!data.currentChapter._id) return;
            mutateUpdate({
                id: data.currentChapter._id,
                data: {
                    name: data.currentChapter.name,
                },
            });
        }
    };

    const handleSubmitModal = () => {
        handleSubmit(submit)();
    };

    const handleClose = () => {
        setIsOpen(false);
        resetField('currentChapter');
    };

    const handleOpenEditChapter = (chapter: IChapter) => {
        setIsOpen(true);
        console.log(chapter);
        setValue('currentChapter', chapter);
    };

    return (
        <div>
            <ModalChapter
                mode={mode}
                control={control}
                isOpen={isOpen}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleSubmit={handleSubmitModal}
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
                            handleClickEdit={handleOpenEditChapter}
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
