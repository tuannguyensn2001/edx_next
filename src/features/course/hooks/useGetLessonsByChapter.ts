import { useEffect, useRef, useState } from 'react';
import { ILesson } from 'models/ILesson';
import { useMutation, useQuery } from 'react-query';
import { getLessonsByChapterId } from 'repositories/lesson';
import { AxiosError, AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';
import { arrayMoveImmutable } from 'array-move';
import { SortEnd } from 'react-sortable-hoc';
import { fetchUpdateOrderLesson } from 'services/lesson';

export default function useGetLessonsByChapter(chapterId: number) {
    const [lessons, setLessons] = useState<ILesson[]>([]);

    const timeout = useRef<ReturnType<typeof setTimeout>>();

    useQuery<ILesson[] | undefined, AxiosError<MyResponse>>(
        ['lessons', chapterId],
        () => getLessonsByChapterId(chapterId),
        {
            onSuccess(data) {
                if (!data) return;
                setLessons((prevState) => [...prevState, ...data]);
            },
        }
    );

    const updateOrderMutation = useMutation<
        AxiosResponse<MyResponse>,
        AxiosError<MyResponse>,
        number[]
    >('update_order', async (data) => {
        return await fetchUpdateOrderLesson(data);
    });

    const addLesson = (lesson: ILesson) =>
        setLessons((prevState) => [...prevState, lesson]);

    const sortLesson = ({ oldIndex, newIndex }: SortEnd) => {
        const newLessons = arrayMoveImmutable(
            lessons,
            oldIndex - 1,
            newIndex - 1
        );
        setLessons(newLessons);

        if (!!timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            updateOrderMutation.mutate(newLessons.map((item) => item.id));
        }, 3000);
    };

    useEffect(() => {
        return () => {
            !!timeout.current && clearTimeout(timeout.current);
        };
    }, []);

    const editLesson = (
        id: number,
        data: Pick<ILesson, 'name' | 'videoURL'>
    ) => {
        setLessons((prevState) => {
            const clone = [...prevState];

            const lesson = clone.find((item) => item.id === id);

            Object.assign(lesson, data);

            return clone;
        });
    };

    return {
        lessons,
        addLesson,
        editLesson,
        sortLesson,
    };
}
