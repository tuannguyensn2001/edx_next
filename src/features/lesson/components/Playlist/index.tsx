import Chapter from 'features/lesson/components/Chapter';
import styles from './style.module.scss';
import { ICourse } from 'models/ICourse';

interface Prop {
    course: ICourse;
}

function Playlist({ course }: Prop) {
    return (
        <div className={styles.wrapper}>
            {course?.chapters?.map((chapter) => (
                <Chapter chapter={chapter} key={chapter.id} />
            ))}
        </div>
    );
}

export default Playlist;
