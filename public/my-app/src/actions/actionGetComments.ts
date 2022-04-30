import { SERVER_API } from "../config"
import { ICommentTrack } from "../types/comment"
import { IResponseGetComments } from "../types/responses/getComments"

export const actionGetComments = async (trackID: string): Promise<IResponseGetComments> => {

        const request = await fetch(`${SERVER_API}/tracks/comments/${trackID}`)

        if(!request.ok) {
            const dataError = await request.json()
            alert(dataError.text)
            return {
                comments: [],
                status: false,
                text: "Произошла ошбка"
            }
        }

        const data: ICommentTrack[] = await request.json()
        return {
            comments: data,
            status: true,
        }
}