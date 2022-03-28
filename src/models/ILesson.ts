export declare interface ILesson {
    id: number;
    name: string;
    videoURL: string;
    order: number;
    chapterId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type FormLesson = Pick<ILesson, 'name' | 'videoURL' | 'id'>;

export type LessonCreate = Pick<ILesson, 'name' | 'videoURL' | 'chapterId'>;
