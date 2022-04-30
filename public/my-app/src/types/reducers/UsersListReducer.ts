import { IUser } from "../user"

export enum TypesActionsUserList {
    GET_LIST_USERS = "GET_LIST_USERS",
    CLEAR_LIST_USERS = "CLEAR_LIST_USERS",
    IS_MORE_USER_LIST = "IS_MORE_USER_LIST",
    ADD_FOLLOWER_TO_USER_LIST = "ADD_FOLLOWER_TO_USER_LIST",
    REMOVE_FOLLOWER_FROM_USER_LIST = "REMOVE_FOLLOWER_FROM_USER_LIST"
}

interface ActionGetListUsers {
    type: TypesActionsUserList.GET_LIST_USERS
    payload: IUser[]
}

interface ActionClearListUsers {
    type: TypesActionsUserList.CLEAR_LIST_USERS
}

interface ActionIsMoreUserListChange {
    type: TypesActionsUserList.IS_MORE_USER_LIST
    payload: boolean
}

interface ActionAddFollower {
    type: TypesActionsUserList.ADD_FOLLOWER_TO_USER_LIST
    payload: {
        userFollowingID: string,
        currentUserID: string
    }
}

interface ActionRemoveFollower {
    type: TypesActionsUserList.REMOVE_FOLLOWER_FROM_USER_LIST
    payload: {
        userFollowingID: string,
        currentUserID: string
    }
}

export type ActionsUserList = ActionGetListUsers | ActionClearListUsers | ActionIsMoreUserListChange | ActionAddFollower | ActionRemoveFollower

export interface IStateUserList {
    users: IUser[],
    isMoreUserList: boolean
}