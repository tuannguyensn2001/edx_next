import { ILesson } from 'models/ILesson';

export declare interface IChapter {
    id?: string;
    _id?: string;
    name: string;
    order: number;
    lessons?: ILesson[];
}

export type UpdateChapterDTO = Pick<IChapter, 'name'>;
