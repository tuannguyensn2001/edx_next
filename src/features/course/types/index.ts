import { IChapter } from 'models/IChapter';

export interface FormChapterType {
    sortable: boolean;
    currentChapter: Pick<IChapter, '_id' | 'id' | 'name'>;
}
