import { SERVER_API } from "../config"



export const actionGetAlbumsFromUser = async (userID: string, offset: number = 0) => {
    try {

        const request = await fetch(`${SERVER_API}/users/albums/${userID}?offset=${offset}`)

        if (!request.ok) {
            const dataError = await request.json()
            return {
                status: false,
                message: dataError.message
            }
        }

        const data = await request.json()

        return {
            status: true,
            data
        }

    } catch(e) {
        return {
            status: false,
            message: e
        }
    }
}