import { IUser } from "../user/"
import { ITrack } from "../track/"

export interface TrackAndUser {
    _id: string
    user: IUser,
    track: ITrack,
    createdAt: string,
    updatedAt: string
}