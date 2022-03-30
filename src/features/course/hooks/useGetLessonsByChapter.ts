import { useState } from 'react';
import { ILesson } from 'models/ILesson';
import { useQuery } from 'react-query';
import { getLessonsByChapterId } from 'repositories/lesson';
import { AxiosError } from 'axios';
import { MyResponse } from 'types/ResponseAPI';

export default function useGetLessonsByChapter(chapterId: number) {
    const [lessons, setLessons] = useState<ILesson[]>([]);

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

    const addLesson = (lesson: ILesson) =>
        setLessons((prevState) => [...prevState, lesson]);

    return {
        lessons,
        addLesson,
    };
}
