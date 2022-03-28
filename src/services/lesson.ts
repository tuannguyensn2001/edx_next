import { LessonCreate } from 'models/ILesson';
import MyAPI from 'network';

export const fetchCreateLesson = (lesson: LessonCreate) => {
    return MyAPI.post('/v1/lessons', lesson);
};

export const fetchLessonsByChapterId = (chapterId: number) => {
    return MyAPI.get(`/v1/lessons/chapter/${chapterId}`);
};
