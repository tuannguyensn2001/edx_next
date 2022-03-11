import { FormCourseContextProvider } from 'features/course/context/useFormCourseContext';
import FormCourse from 'features/course/components/FormCourse';
import { useForm } from 'react-hook-form';
import { ICourse } from 'models/ICourse';
import { memo } from 'react';

function FormEditCourse() {
    const { control, handleSubmit, setValue } = useForm<ICourse>({
        defaultValues: {
            name: '',
            status: 'ACTIVE',
            description: '',
            price: undefined,
            imageUrl:
                'https://ecdn.game4v.com/g4v-content/uploads/2019/09/opm_ten.jpg',
        },
    });

    const submit = (data: ICourse) => {
        console.log(data);
    };

    return (
        <div>
            <div className={'tw-mt-5'}>
                <FormCourseContextProvider value={{ control, setValue }}>
                    <form onSubmit={handleSubmit(submit)}>
                        <FormCourse status={'Chỉnh sửa'} />
                    </form>
                </FormCourseContextProvider>
            </div>
        </div>
    );
}

export default memo(FormEditCourse);
