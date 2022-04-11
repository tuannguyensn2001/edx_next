import { IComment } from 'models/IComment';
import { AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';
import { fetchCreateComment } from 'services/comment';

export const getCreateComment = async (comment: IComment) => {
    const response: AxiosResponse<MyResponse<IComment>> =
        await fetchCreateComment(comment);
    return response.data;
};