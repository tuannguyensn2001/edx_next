import { IComment } from 'models/IComment';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../style.module.scss';
import { FacebookSelector, FacebookCounter } from '@charkour/react-reactions';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import locale
import relativeTime from 'dayjs/plugin/relativeTime';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export interface CommentItemProps {
    // comment: IComment;
    id: number;
    userName: string;
    comment: any;
    countersEmoji: any;
    createdAt: number;
    onAddReaction: (id: number, emoji: any) => void;
}

export default function CommentItem({
    id,
    userName,
    comment,
    countersEmoji,
    createdAt,
    onAddReaction,
}: CommentItemProps) {
    const [hasReply, setHasReply] = useState(false);

    return (
        <div className='tw-mb-8'>
            <div className='tw-flex tw-gap-3'>
                <div>
                    <img
                        className='tw-w-10 tw-h-10 tw-rounded-full'
                        src='https://secure.gravatar.com/avatar/f40a155bca4077692a174455ba3fade5?s=220&d=identicon'
                        alt='avarta'
                    />
                </div>
                <div className='tw-bg-gray-200 tw-py-2 tw-px-4 tw-rounded-2xl tw-relative'>
                    <div className='tw-font-medium'>{userName}</div>
                    <div className='tw-font-light tw-mt-1'>{comment}</div>
                    {countersEmoji.length > 0 && (
                        <div
                            style={{ boxShadow: '0 1px 3px 0 #00000033' }}
                            className='tw-absolute tw-z-50 tw-inline-block tw-bg-white tw-p-1 tw-rounded-full tw-right-0'
                        >
                            <FacebookCounter
                                user={userName}
                                counters={countersEmoji}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='tw-flex tw-gap-3 tw-text-sm tw-mt-4 tw-ml-14 tw-font-light'>
                <div className={styles.reactionBox}>
                    <div className='tw-text-[#f15121] tw-cursor-pointer hover:tw-underline'>
                        Thích
                    </div>
                    <div className={styles.reactionSelector}>
                        <FacebookSelector
                            onSelect={(emoji) =>
                                onAddReaction(+id, { emoji, by: 'Khang' })
                            }
                        />
                    </div>
                </div>
                <div
                    onClick={() => setHasReply((prev) => !prev)}
                    className='tw-text-[#f15121] tw-cursor-pointer hover:tw-underline'
                >
                    Trả lời
                </div>
                <div className='tw-text-gray-500'>
                    {dayjs(createdAt).fromNow()}
                </div>
            </div>
            {hasReply && (
                <div className='tw-ml-16 tw-mt-2'>
                    <form>
                        <TextField
                            fullWidth
                            size='small'
                            variant='standard'
                            autoFocus
                        />
                        <div className={styles.buttonGroup}>
                            <div>
                                <button
                                    onClick={() => setHasReply(false)}
                                    className={styles.cancelButton}
                                >
                                    Huỷ
                                </button>
                                <button
                                    type={'submit'}
                                    className={styles.replyButton}
                                >
                                    Trả lời
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
