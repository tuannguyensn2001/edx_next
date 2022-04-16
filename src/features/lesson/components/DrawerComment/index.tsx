import { Drawer, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { MyResponse } from 'types/ResponseAPI';
import { IComment } from 'models/IComment';
import { AxiosError } from 'axios';
import { getCreateComment } from 'repositories/comment';
import styles from './style.module.scss';
import CommentItem from './components/CommentItem';

interface Prop {
    isOpen: boolean;
    onClose: () => void;
}

interface FormComment {
    message: string;
}

interface Comment {
    content: string;
    id: number;
}

function DrawerComment({ isOpen, onClose }: Prop, ref: React.Ref<any>) {
    const { handleSubmit, control } = useForm<FormComment>({
        defaultValues: {
            message: '',
        },
    });
    const ws = useRef<WebSocket>();
    const [comments, setComments] = useState<IComment[]>([]);

    useImperativeHandle(ref, () => ({
        addComment: (comment: IComment) => {
            setComments((prevState) => [...prevState, comment]);
        },
    }));

    const {
        query: { id },
    } = useRouter();

    useEffect(() => {
        setComments([]);
    }, [id]);

    const createComment = useMutation<
        MyResponse<IComment>,
        AxiosError<MyResponse>,
        IComment
    >('create', async (data) => getCreateComment(data));

    const onSubmit = (data: FormComment) => {
        createComment.mutate({
            content: data.message,
            commentableModel: 'lesson',
            commentableId: Number(id),
        });
    };

    return (
        <Drawer anchor={'right'} open={isOpen} onClose={onClose}>
            <div className={styles.wrapper}>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name={'message'}
                            render={({ field }) => <TextField {...field} />}
                        />
                        <Button type={'submit'} variant={'contained'}>
                            Bình luận
                        </Button>
                    </form>
                </div>
                <div>
                    {comments.map((item) => (
                        <CommentItem key={item.id} comment={item} />
                    ))}
                </div>
            </div>
        </Drawer>
    );
}

export default forwardRef(DrawerComment);
