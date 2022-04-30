import { SERVER_API } from "../config"

export const actionGetCurrentTrack = async (trackID: string) => {

    try {

        const request = await fetch(`${SERVER_API}/tracks/${trackID}`)

        if (!request.ok) {
            const dataError = await request.json()
            return {status: false, message: dataError.message}
        }

        const data = await request.json()

        return data

    } catch (e) {
        return {
            status: false,
            message: "Произошла ошибка"
        }
    }

}