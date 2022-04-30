import { IUser } from "../user/"
import { ITrack } from "../track"

export interface IAlbum {
    _id: string
    name: string
    describe: string
    isShowInRecommendation: boolean
    imageURL: string
    user: IUser,
    likes: string[],
    tracks: string[]
}

export interface IAlbumTracksString extends IAlbum {
    tracks: string[]
}

