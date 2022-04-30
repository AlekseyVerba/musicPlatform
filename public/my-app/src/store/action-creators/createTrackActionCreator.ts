import { Dispatch } from "react"
import { SERVER_API } from "../../config"
import { ActionTypeCreateTrack, ActionsCreateTrack, IStateCreateTrack} from "../../types/reducers/createTrackReducer"
import { CreateTrackI } from "../../types/requestInterfaces/createTrackInterface"



export const actionAddTextInfoForAudio = (info: CreateTrackI): ActionsCreateTrack => {
    return {
        type: ActionTypeCreateTrack.ADD_INFO_TRACK,
        payload: {
            artist: info.artist || null,
            name: info.name || null,
            text: info.text || null
        }
    }
}

export const actionAddAudioFile = (audio: File): ActionsCreateTrack => {
    return {
        type: ActionTypeCreateTrack.ADD_AUDIO_FILE,
        payload: audio
    }
}

export const actionAddImgFile = (img: File): ActionsCreateTrack => {
    console.log(img)
    return {
        type: ActionTypeCreateTrack.ADD_IMG_FILE,
        payload: img
    }
}

export const createTrack = (name: string | null, artist: string | null, text: string | null, audio: File | null, imgAudio: File | null) => {
    return async (dispatch: Dispatch<ActionsCreateTrack>) => {
        try {

            const formData = new FormData()
            if (name) {
                formData.append("name", name)
            }
            if (artist) {
                formData.append("artist", artist)
            }
            if (text) {
                formData.append("text",text)
            }
            if (imgAudio) {
                formData.append("imgAudio", imgAudio)
            }

            if (audio) {
                formData.append("audio", audio)
            }

            const token = localStorage.getItem("currentUserToken")

            if (!token) {
               alert("Вы не авторизованы")
               return 
            }

            const request = await fetch(`${SERVER_API}/tracks/create`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()
            dispatch({type: ActionTypeCreateTrack.CLEAR_INFO})
            return true


        } catch(e) {
            alert("Произошла ошибка")
            return 
        }
    }
}