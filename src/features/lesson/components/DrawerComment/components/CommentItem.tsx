import { IComment } from 'models/IComment';
import * as React from 'react';

export interface CommentItemProps {
    comment: IComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
    return <div>{comment.content}</div>;
}
