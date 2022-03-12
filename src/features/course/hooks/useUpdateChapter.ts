import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { IChapter, UpdateChapterDTO } from 'models/IChapter';
import { AxiosError } from 'axios';
import { getUpdateChapter } from 'repositories/chapter';
import { toast } from 'react-toastify';

interface Prop {
    onSuccess?: (data: IChapter) => void;
    onError?: (error: AxiosError<MyResponse>) => void;
}

export default function useUpdateChapter({ onSuccess, onError }: Prop) {
    return useMutation<
        MyResponse<IChapter>,
        AxiosError<MyResponse>,
        {
            id: string;
            data: UpdateChapterDTO;
        }
    >('update', ({ id, data }) => getUpdateChapter(id, data), {
        onSuccess(data) {
            if (!data.data) return;
            onSuccess && onSuccess(data.data);
            toast.success(data.message);
        },
        onError(error) {
            // toast.error(error.response?.data.message);
            onError && onError(error);
        },
    });
}
