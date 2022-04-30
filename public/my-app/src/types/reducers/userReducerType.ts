import { IUser } from "../user"

export enum TypeActionUser {
    SAY_HELLO = "SAY_HELLO",
    REGESTRATION = "REGESTRATION",
    LOGIN = "LOGIN",
    ADD_ERROR_REGISTER = "ADD_ERROR_REGISTER",
    ADD_SUCCESS_REGISTER = "ADD_SUCCESS_REGISTER",
    ADD_ERROR_LOGIN = "ADD_ERROR_LOGIN",
    ADD_SUCCESS_LOGIN = "ADD_SUCCESS_LOGIN",
    LOGOUT = "LOGOUT",
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    ADD_TO_ME_TRACK = "ADD_TO_ME_TRACK",
    REMOVE_FROM_ME_TRACK = "REMOVE_FROM_ME_TRACK",
    ADD_ALBUM_TO_MY_ALBUMS = "ADD_ALBUM_TO_MY_ALBUMS",
    REMOVE_ALBUM_FROM_MY_ALBUMS = "REMOVE_ALBUM_FROM_MY_ALBUMS",
    CHANGED_AVATAR = "CHANGED_AVATAR"
}

interface ActionSayHello {
    type: TypeActionUser.SAY_HELLO
    payload: string
}

interface ActionRegister {
    type: TypeActionUser.REGESTRATION
}

interface ActionLogin {
    type: TypeActionUser.LOGIN
    payload: IUser
}

interface ActionAddErrorRegister {
    type: TypeActionUser.ADD_ERROR_REGISTER,
    payload: string | null
}

interface ActionAddSuccessRegister {
    type: TypeActionUser.ADD_SUCCESS_REGISTER,
    payload: string | null
}

interface ActionAddErrorLogin {
    type: TypeActionUser.ADD_ERROR_LOGIN,
    payload: string | null
}

interface ActionAddSuccessLogin {
    type: TypeActionUser.ADD_SUCCESS_LOGIN,
    payload: string | null
}

interface ActionLogout {
    type: TypeActionUser.LOGOUT,
}

interface ActionFollow {
    type: TypeActionUser.FOLLOW,
    payload: string
}

interface ActionUnFollow {
    type: TypeActionUser.UNFOLLOW,
    payload: string
}

interface ActionAddToMeTrack {
    type: TypeActionUser.ADD_TO_ME_TRACK,
    payload: string
}

interface ActionRemoveFromMeTrack {
    type: TypeActionUser.REMOVE_FROM_ME_TRACK,
    payload: string
}

interface ActionRemoveAlbumFromMyAlbums {
    type: TypeActionUser.REMOVE_ALBUM_FROM_MY_ALBUMS
    payload: string
}

interface ActionAddAlbumToMyAlbums {
    type: TypeActionUser.ADD_ALBUM_TO_MY_ALBUMS
    payload: string
}

interface ActionChangeAvatar {
    type: TypeActionUser.CHANGED_AVATAR
    payload: string
}

export type ActionUser = ActionSayHello | ActionRegister | ActionLogin | ActionAddErrorRegister | ActionAddSuccessRegister | ActionAddErrorLogin | ActionAddSuccessLogin | ActionLogout | ActionFollow | ActionUnFollow | ActionRemoveFromMeTrack | ActionAddToMeTrack | ActionRemoveAlbumFromMyAlbums | ActionAddAlbumToMyAlbums | ActionChangeAvatar

export interface IStateUser {
    user: IUser
    isAuth: boolean
    errorLogin: string | null | undefined
    successLogin: string | null | undefined
    errorRegister: string | null | undefined
    successRegister: string | null | undefined
    loading: boolean
}