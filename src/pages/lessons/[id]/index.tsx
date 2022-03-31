import Chapter from 'features/lesson/components/Chapter';
import Playlist from 'features/lesson/components/Playlist';
import Content from 'features/lesson/components/Content';
import styles from './style.module.scss';
import Footer from 'features/lesson/components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import clsx from 'clsx';
import { useQuery } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { ICourse } from 'models/ICourse';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getCourseByLessonId } from 'repositories/course';

function Lesson() {
    const {
        query: { id },
    } = useRouter();

    const { data, isSuccess } = useQuery<
        MyResponse<ICourse> | undefined,
        AxiosError<MyResponse>
    >(
        ['course', id],
        async () => {
            if (!Number(id)) return undefined;
            return getCourseByLessonId(Number(id));
        },
        {
            onError(error) {
                console.log('error', error);
            },
        }
    );

    const isShowPlaylist = useSelector(
        (state: RootState) => state.lesson.isShowPlaylist
    );

    return (
        <div>
            <div className={'tw-h-[60px] tw-bg-gray-700'}></div>

            <div>
                <div className={styles.wrapper}>
                    <div
                        className={clsx([
                            'tw-col-span-9',
                            { 'tw-col-span-12': !isShowPlaylist },
                        ])}
                    >
                        <Content />
                    </div>
                    {isShowPlaylist && (
                        <div className='tw-col-span-3'>
                            {isSuccess && !!data?.data && (
                                <Playlist course={data?.data} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Lesson;
