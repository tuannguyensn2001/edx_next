import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLesson, ILesson, LessonCreate } from 'models/ILesson';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getCreateLesson, getUpdateLesson } from 'repositories/lesson';
import { toast } from 'react-toastify';

type PropCallback = {
    handleCreateLessonSuccess: (lesson: ILesson) => void;
    handleEditLessonSuccess: (
        id: number,
        data: Pick<ILesson, 'name' | 'videoURL'>
    ) => void;
};

export default function useManageModalLesson(
    chapterId: number,
    { handleCreateLessonSuccess, handleEditLessonSuccess }: PropCallback
) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        reset({
            id: undefined,
            name: '',
            videoURL: '',
        });
    };

    const { mutate } = useMutation<
        MyResponse<ILesson>,
        AxiosError<MyResponse>,
        LessonCreate
    >('create', (lesson) => getCreateLesson(lesson), {
        onSuccess(response) {
            if (!response.data) return;
            toast.success(response.message);
            handleCreateLessonSuccess(response.data);
            handleClose();
        },
        onError(err) {
            toast.error(err.response?.data.message);
        },
    });

    const { mutate: mutateUpdate } = useMutation<
        MyResponse<Pick<ILesson, 'name' | 'id' | 'videoURL'>>,
        AxiosError<MyResponse>,
        Pick<ILesson, 'id' | 'name' | 'videoURL'>
    >(
        'update',
        async (lesson) => {
            return await getUpdateLesson(lesson.id, {
                name: lesson.name,
                videoURL: lesson.videoURL,
            });
        },
        {
            onSuccess(response) {
                toast.success(response.message);
                if (!response.data?.id) return;
                handleEditLessonSuccess(response.data?.id, {
                    name: response.data?.name,
                    videoURL: response.data?.videoURL,
                });
                handleClose();
            },
        }
    );

    const { control, handleSubmit, watch, reset } = useForm<FormLesson>({
        defaultValues: {
            name: '',
            videoURL: '',
            id: undefined,
        },
    });

    const mode = useMemo<'create' | 'edit'>(() => {
        return !!watch('id') ? 'edit' : 'create';
    }, [watch('id')]);

    const handleSubmitModal = () => {
        handleSubmit((data: FormLesson) => {
            if (mode === 'create') {
                mutate({
                    ...data,
                    chapterId,
                });
            } else if (mode === 'edit') {
                mutateUpdate(data);
            }
        })();
    };

    return {
        isOpen,
        handleClose,
        handleOpen,
        mode,
        handleSubmitModal,
        control,
        reset,
    };
}
