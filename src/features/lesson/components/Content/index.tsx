import styles from './style.module.scss';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { setEnded } from 'features/lesson/slices';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { ILesson } from 'models/ILesson';

interface Prop {
    lesson: ILesson;
    isSuccess: boolean;
}

function Content({ lesson, isSuccess }: Prop) {
    const [isOpenNote, setIsOpenNote] = useState<boolean>(false);

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

    return (
        <div className={styles.wrapper}>
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
                            onStart={handleStart}
                            onEnded={handleEnded}
                            controls
                            width={'100%'}
                            height={'100%'}
                            // url={'https://www.youtube.com/watch?v=pPJ-PjsY7rc'}
                            url={`https://www.youtube.com/watch?v=${lesson?.videoURL}`}
                        />
                    )}
                </div>
                <div>
                    <div onClick={() => setIsOpenNote(true)}>thêm ghi chú</div>
                </div>
            </div>
        </div>
    );
}

export default Content;
