import { Channel } from 'socket/channel';

export interface Message<T = any> {
    channel?: Channel;
    detail?: string;
    data?: T;
    isJoinRoom?: boolean;
    roomId?: string;
    isLeaveRoom?: boolean;
    userId?: number;
}

export const dispatchMessage = (message: Message) => JSON.stringify(message);

export const getMessage = (message: string): Message => {
    return JSON.parse(message);
};
