import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLesson, ILesson, LessonCreate } from 'models/ILesson';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getCreateLesson } from 'repositories/lesson';
import { toast } from 'react-toastify';

type PropCallback = {
    handleCreateLessonSuccess: (lesson: ILesson) => void;
};

export default function useManageModalLesson(
    chapterId: number,
    { handleCreateLessonSuccess }: PropCallback
) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    const { mutate } = useMutation<
        MyResponse<ILesson>,
        AxiosError<MyResponse>,
        LessonCreate
    >('create', (lesson) => getCreateLesson(lesson), {
        onSuccess(response) {
            if (!response.data) return;
            toast.success(response.message);
            handleClose();
            handleCreateLessonSuccess(response.data);
        },
        onError(err) {
            toast.error(err.response?.data.message);
        },
    });

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
            mutate({
                ...data,
                chapterId,
            });
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
