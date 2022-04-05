import { ILesson } from 'models/ILesson';
import Link from 'next/link';

interface Prop {
    lesson: ILesson;
}

function LessonItem({ lesson }: Prop) {
    return (
        <Link prefetch passHref href={`/lessons/${lesson?.id}`}>
            <div
                className={
                    'tw-bg-slate-50 hover:tw-bg-slate-200 tw-py-4 tw-px-5 tw-cursor-pointer  tw-transition-colors'
                }
            >
                <span className={'tw-no-underline'}>{lesson?.name}</span>
            </div>
        </Link>
    );
}

export default LessonItem;
