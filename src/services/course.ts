import { ICourse } from 'models/ICourse';
import MyAPI from 'network';

export const fetchCreateCourse = (data: ICourse) => {
    data.price = Number(data.price);
    return MyAPI.post('/v1/courses', data);
};

export const fetchMyCourses = () => {
    return MyAPI.get('/v1/courses');
};

export const fetchCourseByLesson = (lessonId: number) => {
    return MyAPI.get(`/v1/courses/lesson/${lessonId}`);
};
