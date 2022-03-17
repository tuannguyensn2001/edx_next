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

function Footer() {
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
                        <Button startIcon={<ArrowBack />}>Bài trước</Button>
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
                                <Button
                                    disabled={!isEnded}
                                    variant={'contained'}
                                    endIcon={<ArrowForward />}
                                >
                                    Bài kế tiếp
                                </Button>
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
                        1. Học javascript
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
