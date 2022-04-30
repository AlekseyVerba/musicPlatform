import { IUser } from "../user/"
import { IAlbum } from "../album"

interface IComment {
    _id: string
    user: IUser,
    text: string
}

export interface ICommentTrack extends IComment {
    track: string
}

export interface ICommentAlbum extends IComment {
    album: IAlbum
}