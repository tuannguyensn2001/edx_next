import { AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';
import { IChapter, UpdateChapterDTO } from 'models/IChapter';
import {
    fetchChaptersByCourse,
    fetchCreateChapters,
    fetchUpdateChapter,
} from 'services/chapter';
import { AxiosError } from 'axios';

export const getChaptersByCourse = async (
    courseId: string | string[] | undefined
) => {
    if (!courseId) {
        throw new Error('Error course id');
    }
    const response: AxiosResponse<MyResponse<IChapter[]>> =
        await fetchChaptersByCourse(courseId);
    return response.data;
};

export const getCreateChapter = async (name: string, courseId: string) => {
    const response: AxiosResponse<MyResponse<IChapter>> =
        await fetchCreateChapters(name, courseId);
    return response.data;
};

export const getUpdateChapter = async (id: string, data: UpdateChapterDTO) => {
    const response: AxiosResponse<MyResponse<IChapter>> =
        await fetchUpdateChapter(id, data);
    return response.data;
};
