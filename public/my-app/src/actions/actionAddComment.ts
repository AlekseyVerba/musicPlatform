import { SERVER_API } from "../config"
import { ICommentTrack } from "../types/comment"

export const actionAddComment = async (trackID: string, text: string): Promise<ICommentTrack> => {
    const token = localStorage.getItem("currentUserToken")

    if (!token) {
       alert("Вы не авторизованы")
       return {} as ICommentTrack
    }

    const request = await fetch(`${SERVER_API}/tracks/add-comment/${trackID}`,{
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })

    if(!request.ok) {
        const dataError = await request.json()
        alert(dataError.message)
        return {} as ICommentTrack
    }

    const data: ICommentTrack = await request.json()

    return data

}