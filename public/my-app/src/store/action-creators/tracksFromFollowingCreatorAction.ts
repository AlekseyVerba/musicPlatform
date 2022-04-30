import { Dispatch } from "react"
import { SERVER_API } from "../../config"
import { ActionTracksFromFollowing, TypeActionTracksFromFollowing } from "../../types/reducers/tracksFromFollowing"
import { TrackAndUser } from "../../types/TrackAndUser"

export const actionGetTrackFromFollowing = (offset: number = 0) => {
    return async (dispatch: Dispatch<ActionTracksFromFollowing>) => {
        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

       

        try {

            const request = await fetch(`${SERVER_API}/tracks/last-updates-friends/?offset=${offset}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            // debugger

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data: TrackAndUser[][] = await request.json()

            if (data.length === 0) {
                return dispatch({
                    type: TypeActionTracksFromFollowing.CHANGE_IS_MORE_TRACKS_FROM_FOLLOWING,
                    payload: false
                })
            }

            return dispatch({
                type: TypeActionTracksFromFollowing.GET_TRACKS_FROM_FOLLWING,
                payload: data
            })

        } catch(e) {
            alert(`Произошла ошибка: ${e}`)
        }
    }
}

export const actionClearTracksFromFollowing = (): ActionTracksFromFollowing => {
    return {
        type: TypeActionTracksFromFollowing.CLEAR_TRACKS_FROM_FOLLOWING
    }
}

export const actionAddLikeFromFollowing = (trackID: string, userID: string): ActionTracksFromFollowing => {
    return {
        type: TypeActionTracksFromFollowing.ADD_LIKE_TRACK_FOLLOWING,
        payload: {
            trackID,
            userID
        }
    }
}

export const actionRemoveLikeFromFollowing = (trackID: string, userID: string): ActionTracksFromFollowing => {
    return {
        type: TypeActionTracksFromFollowing.REMOVE_LIKE_TRACK_FOLLOWING,
        payload: {
            trackID,
            userID
        }
    }
}