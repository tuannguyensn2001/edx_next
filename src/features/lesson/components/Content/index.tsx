import styles from './style.module.scss';
import Youtube from 'react-youtube';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { setEnded } from 'features/lesson/slices';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';

function Content() {
    const [isOpenNote, setIsOpenNote] = useState<boolean>(false);

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
                    <ReactPlayer
                        onStart={handleStart}
                        onEnded={handleEnded}
                        controls
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=pPJ-PjsY7rc'}
                    />
                </div>
                <div>
                    <div onClick={() => setIsOpenNote(true)}>thêm ghi chú</div>
                </div>
            </div>
        </div>
    );
}

export default Content;
