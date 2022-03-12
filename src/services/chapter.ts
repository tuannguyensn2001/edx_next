import MyAPI from 'network';
import { UpdateChapterDTO } from 'models/IChapter';

export const fetchChaptersByCourse = (courseId: string | string[]) => {
    return MyAPI.get('/v1/chapters', {
        params: {
            courseId: courseId,
        },
    });
};

export const fetchCreateChapters = (name: string, courseId: string) => {
    return MyAPI.post('/v1/chapters', { name, courseId });
};

export const fetchUpdateChapter = (id: string, data: UpdateChapterDTO) => {
    return MyAPI.put(`/v1/chapters/${id}`, data);
};

export const fetchDeleteChapter = (id: string) => {
    return MyAPI.delete(`/v1/chapters/{id}`);
};
