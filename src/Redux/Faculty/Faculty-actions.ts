import {
    CREATE_GROUP,
    CREATE_GROUP_SUCCEED, GET_COMMENTS_BY_USER_ID, GET_COMMENTS_BY_USER_ID_SUCCEED, SEND_COMMENT, SEND_COMMENT_SUCCEED,
} from "./Faculty-constants";
import {ICommentInterface, IGroup} from "./Faculty-interfaces";


export interface CreateGroup {
    type: typeof CREATE_GROUP,
    payload: string
}

export interface CreateGroupSucceed {
    type: typeof CREATE_GROUP_SUCCEED,
    payload: IGroup
}


export interface SendComment {
    type: typeof SEND_COMMENT,
    payload: {userId: number, comment: string, receiverId: number}
}

export interface SendCommentSucceed {
    type: typeof SEND_COMMENT_SUCCEED,
    payload: ICommentInterface
}

export interface GetCommentByUserId {
    type: typeof GET_COMMENTS_BY_USER_ID,
    payload: number
}

export interface GetCommentByUserIdSucceed {
    type: typeof GET_COMMENTS_BY_USER_ID_SUCCEED,
    payload: ICommentInterface[]
}

export type FacultyActionTypes =
    | CreateGroupSucceed
    | CreateGroup
    | SendComment
    | SendCommentSucceed
    | GetCommentByUserId
    | GetCommentByUserIdSucceed
