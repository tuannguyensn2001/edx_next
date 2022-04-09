import Button from '@mui/material/Button';
import {
    ArrowBack,
    ArrowCircleRight,
    ArrowCircleRightOutlined,
    ArrowForward,
    Menu,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMemo } from 'react';
import { toggleShowPlaylist } from 'features/lesson/slices';
import { Tooltip } from '@mui/material';
import { ILesson } from 'models/ILesson';
import Link from 'next/link';

interface Prop {
    lesson: ILesson;
    next: number | null;
    previous: number | null;
}

function Footer({ lesson, next, previous }: Prop) {
    const { isShowPlaylist, isEnded } = useSelector(
        (state: RootState) => state.lesson
    );

    const dispatch = useDispatch();

    const icon = useMemo(() => {
        return isShowPlaylist ? <ArrowCircleRightOutlined /> : <Menu />;
    }, [isShowPlaylist]);

    const handleClickTogglePlaylist = () => {
        dispatch(toggleShowPlaylist());
    };

    return (
        <div
            className={
                'tw-h-16 tw-fixed tw-bottom-0 tw-w-full tw-bg-gray-100  tw-flex tw-flex-col tw-justify-center tw-px-10'
            }
        >
            <div className={'tw-flex tw-justify-between'}>
                <div></div>
                <div className={'tw-flex'}>
                    <div>
                        <Link prefetch passHref href={`/lessons/${previous}`}>
                            <Button
                                disabled={previous === null}
                                startIcon={<ArrowBack />}
                            >
                                Bài trước
                            </Button>
                        </Link>
                    </div>
                    <div className={'tw-ml-4'}>
                        <Tooltip
                            title={
                                isEnded
                                    ? ''
                                    : 'Bạn cần hoàn thành bài học để đi đến bài tiếp theo'
                            }
                            arrow
                        >
                            <span>
                                <Link
                                    prefetch
                                    passHref
                                    href={`/lessons/${next}`}
                                >
                                    <Button
                                        disabled={!isEnded || !next}
                                        variant={'contained'}
                                        endIcon={<ArrowForward />}
                                    >
                                        Bài kế tiếp
                                    </Button>
                                </Link>
                            </span>
                        </Tooltip>
                    </div>
                </div>
                <div>
                    <Button
                        onClick={handleClickTogglePlaylist}
                        variant={'outlined'}
                        endIcon={icon}
                    >
                        {lesson.name}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
