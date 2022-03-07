import { AxiosResponse } from 'axios';
import { ICourse } from 'models/ICourse';
import { MyResponse } from 'types/ResponseAPI';
import { fetchCreateCourse, fetchMyCourses } from 'services/course';

export const getCreateCourse = async (data: ICourse) => {
    const response: AxiosResponse<MyResponse<ICourse>> =
        await fetchCreateCourse(data);
    return response.data;
};

export const getMyCourses = async () => {
    const response: AxiosResponse<MyResponse<ICourse[]>> =
        await fetchMyCourses();
    return response.data;
};
