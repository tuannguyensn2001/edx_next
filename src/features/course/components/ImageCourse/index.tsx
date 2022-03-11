import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { AxiosError } from 'axios';
import { getUploadFile } from 'repositories/file';
import useFormCourseContext from 'features/course/context/useFormCourseContext';
import { Controller } from 'react-hook-form';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import styles from './style.module.scss';
import clsx from 'clsx';

function ImageCourse() {
    const context = useFormCourseContext();

    const uploadMutation = useMutation<
        MyResponse<string>,
        AxiosError<MyResponse>,
        FormData
    >('upload', (form) => getUploadFile(form), {
        onSuccess(response) {
            if (!response.data) return;
            context?.setValue('imageUrl', response.data);
        },
    });

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const form = new FormData();

            form.append('file', file);

            uploadMutation.mutate(form);
        },
        [uploadMutation]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled: uploadMutation.isLoading,
    });

    return (
        <div {...getRootProps()} className={'hover:tw-cursor-pointer'}>
            <input {...getInputProps()} />
            <Controller
                control={context?.control}
                name={'imageUrl'}
                render={({ field }) => (
                    <div className={styles.image}>
                        <img
                            className={clsx([
                                'tw-w-full tw-h-60 tw-object-cover',
                                {
                                    [styles.loading_img]:
                                        uploadMutation.isLoading,
                                },
                            ])}
                            src={field.value}
                            alt=''
                        />
                        {uploadMutation.isLoading && (
                            <div className={styles.loading}>
                                <CircularProgress />
                            </div>
                        )}
                    </div>
                )}
            />
        </div>
    );
}

export default ImageCourse;
