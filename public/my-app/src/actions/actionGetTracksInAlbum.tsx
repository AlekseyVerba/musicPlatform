import { ITrack } from "../types/track"
import { SERVER_API } from "../config"

export const actionGetTrackInAlbum = async (albumID: string) => {
    try {
        
        const request = await fetch(`${SERVER_API}/tracks/tracks-from-album/${albumID}`)

        if (!request.ok) {
            const dataError = await request.json()
            alert(dataError.message)
            return {
                status: false,
                data: dataError
            }
        }

        const data = await request.json()

        return {
            status: true,
            data
        }

    } catch(e) {
        alert(`Произошла ошибка: ${e}`)
        return {
            status: false
        }
    }
}