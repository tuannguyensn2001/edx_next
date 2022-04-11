export declare interface IComment {
    id?: number;
    content?: string;
    userId?: string;
    parentId?: string;
    commentableId?: number;
    commentableModel?: 'lesson';
}
