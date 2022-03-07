import { ICourse } from 'models/ICourse';
import MyAPI from 'network';

export const fetchCreateCourse = (data: ICourse) => {
    return MyAPI.post('/v1/courses', data);
};

export const fetchMyCourses = () => {
    return MyAPI.get('/v1/courses');
};
