import { IUser } from "../user/"

export interface ITrack {
    _id: string
    artist: string
    audio: string
    listens: number
    name: string
    picture: string
    text: string
    user: IUser
    likes?: string[]
}