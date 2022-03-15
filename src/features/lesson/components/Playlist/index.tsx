import Chapter from 'features/lesson/components/Chapter';
import styles from './style.module.scss';

function Playlist() {
    return (
        <div className={styles.wrapper}>
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
            <Chapter />
        </div>
    );
}

export default Playlist;
