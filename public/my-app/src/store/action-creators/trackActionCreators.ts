import { Dispatch } from "redux"
import { ITrack } from "../../types/track"
import { ActionTracks, ActionTypeTrack } from "../../types/reducers/trackReducer"
import { SERVER_API } from "../../config"


export const getTracks = (filterInput: string, filterSelect: string,offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionTracks>) => {
        try {

            let urlRequest = `${SERVER_API}/tracks/?`

            if (filterSelect) urlRequest += `searchSelect=${filterSelect}`

            if (filterInput) urlRequest += `&searchValue=${filterInput}`

            if (offset) urlRequest += `&offset=${offset}`

            const request = await fetch(urlRequest)
            // debugger


            if (!request.ok) {
                return alert("Произошла ошибка")
            }

            const data = await request.json()
            if (data.length === 0) {
                dispatch({ type: ActionTypeTrack.STOP_LOAD })
            }
            dispatch({
                type: ActionTypeTrack.GET_TRACKS,
                payload: data
            })

        } catch (e) {
            alert("Ошибка")
        }
    }
}


export const getMyTracks = (filterInput: string, filterSelect: string,offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionTracks>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            let urlRequest = `${SERVER_API}/tracks/my-tracks/?`

            if (filterSelect) urlRequest += `searchSelect=${filterSelect}`

            if (filterInput) urlRequest += `&searchValue=${filterInput}`

            if (offset) urlRequest += `&offset=${offset}`

            const request = await fetch(urlRequest, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // debugger


            if (!request.ok) {
                return alert("Произошла ошибка")
            }

            const data = await request.json()
            if (data.length === 0) {
                dispatch({ type: ActionTypeTrack.STOP_LOAD })
            }
            dispatch({
                type: ActionTypeTrack.GET_TRACKS,
                payload: data
            })

        } catch (e) {
            alert(`Ошибка: ${e}`)
        }
    }
}


export const removeTrack = (trackID: string) => {
    return async (dispatch: Dispatch<ActionTracks>) => {
        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            const request = await fetch(`${SERVER_API}/tracks/${trackID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            dispatch({ type: ActionTypeTrack.REMOVE_TRACK, payload: trackID })

        } catch (e) {
            return alert("Произошла ошибка")
        }
    }
}

export const actionChangeListens = (payload: string): ActionTracks => {
    return {
        type: ActionTypeTrack.CHANGE_LISTEN_TRACK,
        payload
    }
}

export const actionCleartracks = (): ActionTracks => {
    return {
        type: ActionTypeTrack.CLEAR_TRACK
    }
}

export const actionAddLike = (trackID: string, userID: string) => {
    return async (dispatch: Dispatch<ActionTracks>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {
            dispatch({ type: ActionTypeTrack.ADD_LIKE, payload: { trackID, userID } })
            const request = await fetch(`${SERVER_API}/tracks/like/${trackID}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const errorData = await request.json()
                return alert(errorData.message)
            }

            return

        } catch (e) {
            return alert("Произошла ошибка")
        }
    }
}

export const actionRemoveLike = (trackID: string, userID: string) => {
    debugger
    return async (dispatch: Dispatch<ActionTracks>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            dispatch({
                type: ActionTypeTrack.REMOVE_LIKE,
                payload: {
                    trackID,
                    userID
                }
            })

            const request = await fetch(`${SERVER_API}/tracks/like/${trackID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            return

        } catch (e) {
            alert("Произошла ошибка")
        }

    }

}

