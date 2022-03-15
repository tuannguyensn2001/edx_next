import styles from './style.module.scss';

function Content() {
    return (
        <div className={styles.wrapper}>
            {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ].map((item) => (
                <div key={item}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Accusantium atque commodi cum dolor, dolore dolorem est ipsa
                    labore laudantium libero numquam perferendis quam qui sequi
                    vitae! Fuga natus perferendis porro.
                </div>
            ))}
        </div>
    );
}

export default Content;
