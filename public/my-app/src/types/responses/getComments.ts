import { ICommentTrack } from "../comment"

export interface IResponseGetComments {
    status: boolean
    comments: ICommentTrack[]
    text?: string
}