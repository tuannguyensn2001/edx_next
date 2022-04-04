import styles from './style.module.scss';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginResponse, LoginType } from 'models/IUser';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getLogin } from 'repositories/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from 'features/auth/slices';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

type FormLogin = LoginType;

function Login() {
    const { handleSubmit, register } = useForm<FormLogin>({
        defaultValues: {
            email: 'tuannguyensn2001a@gmail.com',
            password: 'java2001',
        },
    });

    const dispatch = useDispatch();

    const router = useRouter();

    const loginMutation = useMutation<
        MyResponse<LoginResponse>,
        AxiosError<MyResponse>,
        LoginType
    >('login', (data) => getLogin(data), {
        async onSuccess(response) {
            if (!!response?.data) dispatch(setLoggedIn(response.data));
            await router.push('/');
            toast.success('Chào mừng bạn trở lại');
        },
    });

    const submit = (data: FormLogin) => {
        loginMutation.mutate(data);
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
                                Hi 👋 Welcome Back{' '}
                            </h1>
                            <p className='tw-pr-3'>
                                Lorem ipsum is placeholder text commonly used in
                                the graphic, print, and publishing industries
                                for previewing layouts and visual mockups
                            </p>
                        </div>
                    </div>
                    <div className='tw-flex tw-justify-center tw-self-center  tw-z-10'>
                        <div className='tw-p-12 tw-bg-white tw-mx-auto tw-rounded-2xl tw-w-96 '>
                            <div className='tw-mb-4'>
                                <h3 className='tw-font-semibold tw-text-2xl tw-text-gray-800'>
                                    Đăng nhập{' '}
                                </h3>
                            </div>
                            <div className='tw-space-y-5'>
                                <form onSubmit={handleSubmit(submit)}>
                                    {loginMutation.isError && (
                                        <div>
                                            <Alert severity={'error'}>
                                                {
                                                    loginMutation.error.response
                                                        ?.data.message
                                                }
                                            </Alert>
                                        </div>
                                    )}
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            required
                                            label={'Email'}
                                            fullWidth
                                            {...register('email')}
                                        />
                                    </div>
                                    <div className={'tw-mt-10'}>
                                        <TextField
                                            required
                                            label={'Mật khẩu'}
                                            type={'password'}
                                            {...register('password')}
                                            fullWidth
                                        />
                                    </div>
                                    <div className='tw-flex tw-items-center tw-justify-between'>
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
                                    </div>
                                    <div className='tw-mt-5'>
                                        <button
                                            type='submit'
                                            className='tw-w-full tw-text-base tw-flex tw-justify-center tw-bg-green-400  hover:tw-bg-green-500 tw-text-gray-100 tw-p-3  tw-rounded-full tw-tracking-wide tw-font-semibold  tw-shadow-lg tw-cursor-pointer tw-transition tw-ease-in tw-duration-500 tw-border-0'
                                            disabled={loginMutation.isLoading}
                                        >
                                            Đăng nhập
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='tw-pt-5 tw-text-center tw-text-gray-400 tw-text-xs'>
                                <span>Copyright © 2021-2022</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
