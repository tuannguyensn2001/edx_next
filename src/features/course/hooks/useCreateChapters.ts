import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { IChapter } from 'models/IChapter';
import { AxiosError } from 'axios';
import { getCreateChapter } from 'repositories/chapter';
import { toast } from 'react-toastify';

interface Prop {
    onSuccess?: (data: IChapter) => void;
    onError?: (error: AxiosError<MyResponse>) => void;
}

export default function useCreateChapters({ onSuccess, onError }: Prop) {
    return useMutation<
        MyResponse<IChapter>,
        AxiosError<MyResponse>,
        { name: string; courseId: string }
    >(
        'create_chapter',
        (chapter: { name: string; courseId: string }) => {
            return getCreateChapter(chapter.name, chapter.courseId);
        },
        {
            onSuccess(data) {
                if (!data.data) return;
                onSuccess && onSuccess(data.data);
                toast.success(data.message);
            },
            onError(error) {
                // toast.error(error.response?.data.message);
                onError && onError(error);
            },
        }
    );
}
