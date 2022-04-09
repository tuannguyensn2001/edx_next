import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { TextField } from '@mui/material';
import { AxiosError } from 'axios';
import { LoginResponse, SignupType } from 'models/IUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { getSignUp } from 'repositories/auth';
import { MyResponse } from 'types/ResponseAPI';
import * as Yup from 'yup';

type FormSignup = SignupType & {
    confirmPassword?: string;
};

const schemaValidation = Yup.object({
    email: Yup.string()
        .email('Trường này phải là email')
        .required('Trường này không được bỏ trống'),
    password: Yup.string()
        .required('Trường này không được bỏ trống')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Mật khẩu phải bao gồm ít nhất 8 kí tự, 1 in hoa, 1 in thường, 1 số và 1 kí tự đặc biệt'
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không trùng khớp')
        .required('Trường này không được bỏ trống'),
});

function Login() {
    const { handleSubmit, register, formState } = useForm<FormSignup>({
        resolver: yupResolver(schemaValidation),
    });

    const router = useRouter();

    const signupMutation = useMutation<
        MyResponse<LoginResponse>,
        AxiosError<MyResponse>,
        SignupType
    >('login', (data) => getSignUp(data), {
        async onSuccess() {
            await router.push('/login');
            toast.success('Chúc mừng bạn đã đăng kí thành công');
        },
    });

    const submit = (data: FormSignup) => {
        const newData = { ...data };
        delete newData['confirmPassword'];
        signupMutation.mutate(newData);
    };

    return (
        <>
            <div
                className='tw-bg-no-repeat tw-bg-cover tw-bg-center tw-relative'
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2374&q=80)',
                }}
            >
                <div className='tw-absolute tw-bg-gradient-to-b tw-from-green-500 tw-to-green-400 tw-opacity-75 tw-inset-0 z-0' />
                <div className='tw-min-h-screen sm:tw-flex sm:tw-flex-row tw-mx-0 tw-justify-center'>
                    <div className='tw-flex-col tw-flex  tw-self-center tw-p-10 sm:tw-max-w-5xl xl:tw-max-w-2xl  tw-z-10'>
                        <div className='tw-self-start tw-hidden lg:tw-flex tw-flex-col  tw-text-white'>
                            <h1 className='tw-mb-3 tw-font-bold tw-text-5xl'>
                                👋 Chào mừng bạn{' '}
                            </h1>
                            <p className='tw-pr-3'>
                                Lorem ipsum is placeholder text commonly used in
                                the graphic, print, and publishing industries
                                for previewing layouts and visual mockups
                            </p>
                        </div>
                    </div>
                    <div className='tw-flex tw-justify-center tw-self-center  tw-z-10'>
                        <div className='tw-p-12 tw-bg-white tw-mx-auto tw-rounded-2xl tw-w-[500px] '>
                            <div className='tw-mb-4'>
                                <h3 className='tw-font-semibold tw-text-2xl tw-text-gray-800'>
                                    Đăng kí{' '}
                                </h3>
                            </div>
                            <div className='tw-space-y-5'>
                                <form onSubmit={handleSubmit(submit)}>
                                    {signupMutation.isError && (
                                        <div>
                                            <Alert severity={'error'}>
                                                {
                                                    signupMutation.error
                                                        .response?.data.message
                                                }
                                            </Alert>
                                        </div>
                                    )}
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            error={
                                                !!formState.errors?.email
                                                    ?.message
                                            }
                                            label={'Email'}
                                            fullWidth
                                            {...register('email')}
                                            helperText={
                                                formState.errors?.email?.message
                                            }
                                        />
                                    </div>
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            error={
                                                !!formState.errors?.username
                                                    ?.message
                                            }
                                            label={'Họ tên'}
                                            fullWidth
                                            {...register('username')}
                                            helperText={
                                                formState.errors?.username
                                                    ?.message
                                            }
                                        />
                                    </div>
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            error={
                                                !!formState.errors?.password
                                                    ?.message
                                            }
                                            label={'Mật khẩu'}
                                            type={'password'}
                                            {...register('password')}
                                            helperText={
                                                formState.errors?.password
                                                    ?.message
                                            }
                                            fullWidth
                                        />
                                    </div>
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            error={
                                                !!formState.errors
                                                    ?.confirmPassword?.message
                                            }
                                            label={'Xác nhận mật khẩu'}
                                            type={'password'}
                                            {...register('confirmPassword')}
                                            helperText={
                                                formState.errors
                                                    ?.confirmPassword?.message
                                            }
                                            fullWidth
                                        />
                                    </div>
                                    {/* <div className='tw-flex tw-items-center tw-justify-between'>
                                        <div className='tw-flex tw-items-center tw-mt-5'>
                                            <input
                                                id='remember_me'
                                                name='remember_me'
                                                type='checkbox'
                                                className='tw-h-4 tw-w-4 tw-bg-blue-500 focus:tw-ring-blue-400 tw-border-gray-300 tw-rounded'
                                            />
                                            <label
                                                htmlFor='remember_me'
                                                className='tw-ml-2 tw-block tw-text-sm tw-text-gray-800'
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className='tw-mt-10'>
                                        <button
                                            type='submit'
                                            className='tw-w-full tw-text-base tw-flex tw-justify-center tw-bg-green-400  hover:tw-bg-green-500 tw-text-gray-100 tw-p-3  tw-rounded-full tw-tracking-wide tw-font-semibold  tw-shadow-lg tw-cursor-pointer tw-transition tw-ease-in tw-duration-500 tw-border-0'
                                            disabled={signupMutation.isLoading}
                                        >
                                            Đăng kí
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='tw-pt-5 tw-text-center tw-text-gray-400 tw-text-xs'>
                                <span>Bạn đã có tài khoản?</span>
                                <Link href={'/login'}>
                                    <a className='hover:tw-text-blue-600 tw-text-blue-500 tw-underline tw-cursor-pointer'>
                                        &nbsp;Đăng nhập
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
