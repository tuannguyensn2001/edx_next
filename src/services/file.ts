import MyAPI from 'network';

export const fetchUploadFile = (form: FormData) => {
    return MyAPI.post('/v1/upload', form);
};