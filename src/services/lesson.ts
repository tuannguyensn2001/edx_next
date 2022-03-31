import { ILesson, LessonCreate } from 'models/ILesson';
import MyAPI from 'network';

export const fetchCreateLesson = (lesson: LessonCreate) => {
    return MyAPI.post('/v1/lessons', lesson);
};

export const fetchLessonsByChapterId = (chapterId: number) => {
    return MyAPI.get(`/v1/lessons/chapter/${chapterId}`);
};

export const fetchUpdateLesson = (
    lessonId: number,
    data: Pick<ILesson, 'name' | 'videoURL'>
) => {
    return MyAPI.put(`/v1/lessons/${lessonId}`, data);
};
