import { Button } from '@mui/material';
import Link from 'next/link';
import useAuth from 'hooks/useAuth';

function Header() {
    const { isLoggedIn, user } = useAuth();

    return (
        <div
            className={
                'tw-h-[60px] tw-flex tw-justify-between tw-shadow tw-px-20'
            }
        >
            <div className={'tw-flex tw-flex-col tw-justify-center'}>
                Logo nhưng chưa biết để gì
            </div>
            <div className={'tw-flex tw-flex-col tw-justify-center'}>
                {!isLoggedIn && (
                    <>
                        <Link href={'/login'}>
                            <Button variant={'contained'}>Đăng nhập</Button>
                        </Link>
                    </>
                )}

                {isLoggedIn && !!user && (
                    <div className={'tw-flex'}>
                        <div
                            className={
                                'tw-flex tw-flex-col tw-justify-center tw-mr-5'
                            }
                        >
                            {user['username']}
                        </div>
                        <img
                            className='tw-inline-block tw-h-10 tw-w-10 tw-rounded-full tw-ring-2 tw-ring-white'
                            src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
                            alt=''
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
