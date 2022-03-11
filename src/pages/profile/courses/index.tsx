import DefaultLayout from 'layouts/Default';
import { useQuery } from 'react-query';
import { ICourse } from 'models/ICourse';
import { getMyCourses } from 'repositories/course';
import CardCourse from 'components/course/CardCourse';

function MyCourses() {
    const { data: courses } = useQuery('courses', async () => {
        const response = await getMyCourses();
        return response.data;
    });

    return (
        <DefaultLayout>
            <div className={'tw-mt-20'}>
                <div className={'tw-grid tw-grid-cols-3 tw-gap-4'}>
                    {courses?.map((course) => (
                        <div key={course.id}>
                            <CardCourse
                                id={course._id}
                                name={course.name}
                                imageUrl={course.imageUrl}
                                description={course.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default MyCourses;
