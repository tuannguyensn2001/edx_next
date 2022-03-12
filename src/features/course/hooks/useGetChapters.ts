import { useState } from 'react';
import { IChapter } from 'models/IChapter';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getChaptersByCourse } from 'repositories/chapter';

export default function useGetChapters() {
    const [chapters, setChapters] = useState<IChapter[]>([]);

    const { query } = useRouter();

    const { isLoading } = useQuery<
        MyResponse<IChapter[]>,
        AxiosError<MyResponse>
    >(
        ['chapters', query],
        async () => {
            return await getChaptersByCourse(query?.id);
        },
        {
            onSuccess(data) {
                if (!data.data) return;
                setChapters(data.data);
            },
        }
    );

    return {
        chapters,
        setChapters,
        isLoading,
    };
}
