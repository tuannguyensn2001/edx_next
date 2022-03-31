import { ILesson } from 'models/ILesson';

interface Prop {
    lesson: ILesson;
}

function LessonItem({ lesson }: Prop) {
    return (
        <div
            className={
                'tw-bg-slate-50 hover:tw-bg-slate-200 tw-py-4 tw-px-5 tw-cursor-pointer  tw-transition-colors'
            }
        >
            {lesson.name}
        </div>
    );
}

export default LessonItem;
