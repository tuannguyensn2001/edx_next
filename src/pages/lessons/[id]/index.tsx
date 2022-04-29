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
import { useEffect, useMemo, useRef } from 'react';
import { IChapter } from 'models/IChapter';
import { DOMAIN } from 'config/socket';
import { useToggle } from 'react-use';
import DrawerComment from 'features/lesson/components/DrawerComment';
import Button from '@mui/material/Button';
import { dispatchMessage, getMessage } from 'services/socket';
import { Channel } from 'socket/channel';
import WithAuth from 'components/auth/WithAuth';

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

        if (index === 0) return [null, lessons[index + 1]?.id];

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

    const [isOpenDrawerComment, toggleDrawerComment] = useToggle(false);

    const ws = useRef<WebSocket>();

    const drawer = useRef();

    useEffect(() => {
        if (!id) return;
        const tempws = new WebSocket(DOMAIN);

        tempws.onopen = () => {
            tempws.send(
                dispatchMessage({
                    isJoinRoom: true,
                    roomId: `lesson-detail-${id}`,
                })
            );
        };
        tempws.onmessage = (payload) => {
            const message = getMessage(payload.data);

            if (message.channel === Channel.RECEIVE_COMMENT) {
                if (!drawer.current) return;
                // @ts-ignore
                drawer.current.addComment(message.data);
            }
        };
        ws.current = tempws;

        window.onbeforeunload = () => {
            tempws.send(
                dispatchMessage({
                    isLeaveRoom: true,
                    roomId: `lesson-detail-${id}`,
                })
            );
        };

        return () => {
            console.log('changed');
            tempws.send(
                dispatchMessage({
                    isLeaveRoom: true,
                    roomId: `lesson-detail-${id}`,
                })
            );
        };
    }, [id]);

    return (
        <div>
            <DrawerComment
                ref={drawer}
                isOpen={isOpenDrawerComment}
                onClose={() => toggleDrawerComment(false)}
            />
            <div className={'tw-h-[60px] tw-bg-gray-700'}>
                <Button onClick={() => toggleDrawerComment(true)}>
                    Bình luận
                </Button>
            </div>

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

export default WithAuth<null>(Lesson);
