import styles from './style.module.scss';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { setEnded } from 'features/lesson/slices';
import { Drawer } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { ILesson } from 'models/ILesson';

interface Prop {
    lesson: ILesson;
    isSuccess: boolean;
}

function Content({ lesson, isSuccess }: Prop) {
    const [isOpenNote, setIsOpenNote] = useState<boolean>(false);
    const [played, setPlayed] = useState(0);
    const prevPlayed = useRef<number | undefined>();
    const playerRef = useRef<any>();
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        prevPlayed.current = played;
    }, [played]);

    const alertInform = () => {
        setPlaying(false);
        alert('Vui lòng không tua quá nhanh');
        playerRef.current.seekTo(prevPlayed.current);
        return;
    };

    const {
        query: { id },
    } = useRouter();

    const dispatch = useDispatch();

    const handleEnded = () => {
        dispatch(setEnded(true));
    };

    const handleStart = () => {
        dispatch(setEnded(false));
    };

    if (played > 1000) {
        alertInform();
    }

    return (
        <div className={styles.wrapper}>
            {prevPlayed.current} <br />
            {played}
            <Drawer
                hideBackdrop
                anchor={'bottom'}
                open={isOpenNote}
                onClose={() => setIsOpenNote(false)}
            >
                <div className={'tw-h-40'}>
                    <Button onClick={() => setIsOpenNote(false)}>Hủy bỏ</Button>
                </div>
            </Drawer>
            <div className={'tw-h-full'}>
                <div className={styles.video_wrapper}>
                    {isSuccess && (
                        <ReactPlayer
                            ref={playerRef}
                            playing={playing}
                            onStart={handleStart}
                            onEnded={handleEnded}
                            progressInterval={10000}
                            controls
                            width={'100%'}
                            height={'100%'}
                            onSeek={(s) => console.log('seek', s)}
                            // url={'https://www.youtube.com/watch?v=pPJ-PjsY7rc'}
                            url={`https://www.youtube.com/watch?v=${lesson?.videoURL}`}
                            onProgress={(progress) =>
                                setPlayed(progress.playedSeconds)
                            }
                        />
                    )}
                </div>
                <div>
                    <div onClick={() => setIsOpenNote(true)}>thêm ghi chú</div>
                    <div onClick={() => setPlaying((prev) => !prev)}>
                        Play/stop
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
