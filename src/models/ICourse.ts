import { IChapter } from 'models/IChapter';

export declare interface ICourse {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number | null;
    status: 'ACTIVE' | 'INACTIVE';
    imageUrl: string;
    _id: string;
    chapters?: IChapter[];
}
