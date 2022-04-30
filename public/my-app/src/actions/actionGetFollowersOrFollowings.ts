import { SERVER_API } from "../config"



export const actionGetFollowersOrFollowings = async (type: "followers" | "followings", userID: string, offset: number = 0) => {
    try {

        const request = await fetch(`${SERVER_API}/users/${type}/${userID}?offset=${offset}`)

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