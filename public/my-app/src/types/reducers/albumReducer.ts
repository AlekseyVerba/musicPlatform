import { IAlbum } from "../album"


export enum TypeActionAlbum {
    GET_ALBUMS = "GET_ALBUMS",
    CLER_ALBUMS = "CLER_ALBUMS",
    CHANGE_MORE = "CHANGE_MORE",
    ADD_LIKE_TO_ALBUM = "ADD_LIKE_TO_ALBUM",
    REMOVE_LIKE_FROM_ALBUM = "REMOVE_LIKE_FROM_ALBUM",
    REMOVE_ALBUM = "REMOVE_ALBUM",

}

interface IActionGetAlbums {
    type: TypeActionAlbum.GET_ALBUMS
    payload: IAlbum[]
}

interface IActionClearAlbums {
    type: TypeActionAlbum.CLER_ALBUMS
}

interface IActionChangeMore {
    type: TypeActionAlbum.CHANGE_MORE
    payload: boolean
}

interface IActionAddLike {
    type: TypeActionAlbum.ADD_LIKE_TO_ALBUM
    payload: {
        albumID: string,
        userID: string
    }
}

interface IActionRemoveLike {
    type: TypeActionAlbum.REMOVE_LIKE_FROM_ALBUM
    payload: {
        albumID: string,
        userID: string
    }
}

interface IActionRemoveAlbum {
    type: TypeActionAlbum.REMOVE_ALBUM
    payload: string
}




export type ActionsAlbum = IActionGetAlbums | IActionClearAlbums | IActionChangeMore | IActionAddLike | IActionRemoveLike | IActionRemoveAlbum 

export interface IStateAlbum {
    items: IAlbum[],
    isMore: boolean
}