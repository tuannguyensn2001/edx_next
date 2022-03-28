import { ILesson, LessonCreate } from 'models/ILesson';
import { AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';
import { fetchCreateLesson, fetchLessonsByChapterId } from 'services/lesson';

export const getCreateLesson = async (lesson: LessonCreate) => {
    const response: AxiosResponse<MyResponse<ILesson>> =
        await fetchCreateLesson(lesson);
    return response.data;
};

export const getLessonsByChapterId = async (chapterId: number) => {
    const response: AxiosResponse<MyResponse<ILesson[]>> =
        await fetchLessonsByChapterId(chapterId);
    return response.data.data;
};
