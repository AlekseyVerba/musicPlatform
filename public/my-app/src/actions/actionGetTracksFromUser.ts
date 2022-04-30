import { SERVER_API } from "../config"



export const actionGetTracksFromUser = async (userID: string, offset: number = 0) => {
    try {

        const request = await fetch(`${SERVER_API}/tracks/tracks-from-user/${userID}?offset=${offset}`)

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