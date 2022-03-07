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
        <div className={styles.wrapper}>
            <div className='tw-flex tw-justify-center'>
                <div
                    className={
                        'tw-min-h-screen tw-flex tw-flex-col tw-justify-center tw-w-3/12'
                    }
                >
                    <div className='tw-bg-white tw-rounded-xl  '>
                        <div
                            className={
                                'tw-flex tw-justify-center tw-text-2xl tw-font-bold tw-mb-10 tw-px-10 tw-mt-10'
                            }
                        >
                            Đăng nhập
                        </div>
                        <hr />
                        <div className={' tw-px-10 tw-pt-10 tw-py-16'}>
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
                                <div className={'tw-mt-10'}>
                                    <LoadingButton
                                        type={'submit'}
                                        fullWidth
                                        variant={'contained'}
                                        loading={loginMutation.isLoading}
                                    >
                                        Đăng nhập
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
