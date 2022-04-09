import DefaultLayout from 'layouts/Default';
import FormCourse from 'features/course/components/FormCourse';
import { useForm } from 'react-hook-form';
import { ICourse } from 'models/ICourse';
import { FormCourseContextProvider } from 'features/course/context/useFormCourseContext';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getCreateCourse } from 'repositories/course';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function CreateCourse() {
    const router = useRouter();

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

    const createCourseMutation = useMutation<
        MyResponse<ICourse>,
        AxiosError<MyResponse>,
        ICourse
    >(
        'create',
        (data) => getCreateCourse({ ...data, price: Number(data.price) }),
        {
            onSuccess() {
                toast.success('Tạo mới khóa học thành công');
            },
        }
    );

    const submit = (data: ICourse) => {
        createCourseMutation.mutate(data);
    };
    return (
        <DefaultLayout>
            <div className={' tw-px-20'}>
                <div>Thêm mới khóa học</div>
                <div className={'tw-mt-10'}>
                    <FormCourseContextProvider value={{ control, setValue }}>
                        <form onSubmit={handleSubmit(submit)}>
                            <FormCourse  status={''}/>
                        </form>
                    </FormCourseContextProvider>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default CreateCourse;
