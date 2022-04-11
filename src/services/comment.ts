import { IComment } from 'models/IComment';
import MyAPI from 'network';

export const fetchCreateComment = (comment: IComment) => {
    return MyAPI.post('/v1/comments', comment);
};