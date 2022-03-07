import { AxiosResponse } from 'axios';
import { MyResponse } from 'types/ResponseAPI';
import { fetchUploadFile } from 'services/file';

export const getUploadFile = async (form: FormData) => {
    const response: AxiosResponse<MyResponse<string>> = await fetchUploadFile(
        form
    );
    return response.data;
};
