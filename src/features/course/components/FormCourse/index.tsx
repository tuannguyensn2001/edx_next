import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Button,
} from '@mui/material';
import ImageCourse from 'features/course/components/ImageCourse';
import { Controller } from 'react-hook-form';
import useFormCourseContext from 'features/course/context/useFormCourseContext';

interface Prop {
    status: string;
}

function FormCourse({ status }: Prop) {
    const context = useFormCourseContext();

    return (
        <div>
            <div className={'tw-grid tw-grid-cols-12 tw-gap-4'}>
                <div className='tw-col-span-9'>
                    <div>
                        <Controller
                            control={context?.control}
                            name={'name'}
                            render={({ field }) => (
                                <TextField
                                    placeholder={'Nhập tên khóa học'}
                                    label={'Tên khóa học'}
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={'tw-mt-5'}>
                        <Controller
                            control={context?.control}
                            name={'description'}
                            render={({ field }) => (
                                <TextField
                                    label={'Mô tả khóa học'}
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={'tw-mt-5'}>
                        <Controller
                            control={context?.control}
                            name={'price'}
                            render={({ field }) => (
                                <TextField
                                    type={'number'}
                                    label={'Mức giá'}
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={'tw-mt-5'}>
                        <Controller
                            control={context?.control}
                            name={'status'}
                            render={({ field }) => (
                                <FormControl>
                                    <FormLabel>Trạng thái</FormLabel>
                                    <RadioGroup row {...field}>
                                        <FormControlLabel
                                            control={<Radio />}
                                            label={'Hoạt động'}
                                            value={'ACTIVE'}
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            label={'Tạm ẩn'}
                                            value={'INACTIVE'}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>
                </div>
                <div className='tw-col-span-3'>
                    <ImageCourse />
                </div>
            </div>
            <div>
                <Button variant={'contained'} type={'submit'}>
                    {status || 'Tạo mới'}
                </Button>
            </div>
        </div>
    );
}

export default FormCourse;
