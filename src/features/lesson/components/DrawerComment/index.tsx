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
import { style } from '@mui/system';

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

const COMMENT_LIST = [
    {
        id: 1,
        userName: 'Dũng Trần',
        comment: 'cho em xin file preview về hooks được không anh',
        countersEmoji: [],
        createdAt: 1650686754245,
    },
    {
        id: 2,
        userName: 'Khang',
        comment:
            '11 năm từ ngày a Đức dalab còn là nhân sự 24h, bao năm trôi qua cứ vô thức nghe những bài hát của Da Lab chỉ vì thích chứ k biết Da Lab là ai hay những ai nhưng hôm nay khi nhận ra bác ấy, nhớ lại con người sống hết mình với đam mê ấy thì lại thấy những bài này hay phê đến lạ ^_^',
        countersEmoji: [
            { emoji: 'haha', by: 'Khang' },
            { emoji: 'love', by: 'aaa' },
        ],
        createdAt: 1650686754245,
    },
];

function DrawerComment({ isOpen, onClose }: Prop, ref: React.Ref<any>) {
    const { handleSubmit, control, watch } = useForm<FormComment>({
        defaultValues: {
            message: '',
        },
    });
    const message = watch('message');
    const ws = useRef<WebSocket>();
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentList, setCommentList] = useState(() => COMMENT_LIST);
    console.log(
        '🚀 ~ file: index.tsx ~ line 69 ~ DrawerComment ~ commentList',
        commentList
    );

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

    const handleAddReaction = (id: number, emoji: any) => {
        setCommentList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, countersEmoji: [...item.countersEmoji, emoji] }
                    : item
            )
        );
    };

    return (
        <Drawer anchor={'right'} open={isOpen} onClose={onClose}>
            <div className={styles.wrapper}>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name={'message'}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    size='small'
                                    variant='standard'
                                    label='Bạn có thắc mắc gì trong bài học này?'
                                />
                            )}
                        />
                        <div className={styles.buttonGroup}>
                            <div>
                                <button
                                    type={'submit'}
                                    disabled={!message}
                                    className={styles.submitButton}
                                >
                                    Bình luận
                                </button>
                            </div>
                        </div>
                        {/* <Button type={'submit'} variant={'contained'}>
                            Bình luận
                        </Button> */}
                    </form>
                </div>
                <div className='tw-mt-4'>
                    {/* {comments.map((item) => ( */}
                    {/* <CommentItem key={item.id} comment={item} /> */}
                    {commentList.map((item) => (
                        <CommentItem
                            key={item.id}
                            {...item}
                            onAddReaction={handleAddReaction}
                        />
                    ))}
                </div>
            </div>
        </Drawer>
    );
}

export default forwardRef(DrawerComment);
