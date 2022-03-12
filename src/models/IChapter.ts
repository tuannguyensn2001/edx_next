export declare interface IChapter {
    id?: string;
    _id?: string;
    name: string;
    order: number;
}

export type UpdateChapterDTO = Pick<IChapter, 'name'>;
