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
import { ILesson } from 'models/ILesson';
import { getLessonById } from 'repositories/lesson';
import { useMemo } from 'react';
import { IChapter } from 'models/IChapter';

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

    const lessons = useMemo<ILesson[]>(() => {
        const course = data?.data;

        if (!course?.chapters) return [];

        return course.chapters.reduce((total: ILesson[], chapter: IChapter) => {
            if (!Array.isArray(chapter?.lessons)) return total;
            return [...total, ...chapter.lessons];
        }, []);
    }, [data]);

    const nextAndPreviousLesson = useMemo<(number | null)[]>(() => {
        const index = lessons.findIndex(
            (item) => Number(item.id) === Number(id)
        );

        if (index === -1) return [null, null];

        if (index === 0) return [null, lessons[index + 1].id];

        if (index === lessons.length - 1) return [lessons[index - 1].id, null];

        return [lessons[index - 1].id, lessons[index + 1].id];
    }, [lessons, id]);

    const {
        isLoading,
        data: dataLesson,
        isSuccess: isSuccessLesson,
    } = useQuery<MyResponse<ILesson>, AxiosError<MyResponse>>(['id', id], () =>
        getLessonById(Number(id))
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
                        {dataLesson?.data && (
                            <Content
                                lesson={dataLesson.data}
                                isSuccess={isSuccessLesson}
                            />
                        )}
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
                {dataLesson?.data && (
                    <Footer
                        next={nextAndPreviousLesson[1]}
                        previous={nextAndPreviousLesson[0]}
                        lesson={dataLesson?.data}
                    />
                )}
            </div>
        </div>
    );
}

export default Lesson;
