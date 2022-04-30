import { SERVER_API } from "../config"


export const listenAudio = async (trackID: string) => {
    fetch(`${SERVER_API}/tracks/${trackID}`, {
        method: "PUT"
    })
}

