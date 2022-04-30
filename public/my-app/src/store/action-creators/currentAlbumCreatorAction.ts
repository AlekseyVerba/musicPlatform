import { IAlbum } from "../../types/album"
import { ITrack } from "../../types/track"
import { ActionCurrentAlbum, TypeActionsCurrentAlbum } from "../../types/reducers/currentAlbumReducer"
import { Dispatch } from "react"
import { SERVER_API } from "../../config"

export const actionGetCurrentAlbum = (id: string) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        try {

            const request = await fetch(`${SERVER_API}/albums/${id}`)

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()

            return dispatch({
                type: TypeActionsCurrentAlbum.GET_CURRENT_ALBUM,
                payload: data
            })

        } catch (e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}


export const actionClearTrackForAlbum = (): ActionCurrentAlbum => {
    return {
        type: TypeActionsCurrentAlbum.CLEAR_TRACKS_FOR_ALBUM
    }
}


export const actionGetTracksFromAll = (offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {
        try {

            let urlRequest = `${SERVER_API}/tracks/?`

            if (offset) {
                urlRequest += `offset=${offset}`
            }

            const request = await fetch(urlRequest)



            if (!request.ok) {
                return alert("Произошла ошибка")
            }

            const data = await request.json()
            if (data.length === 0) {
                dispatch({ type: TypeActionsCurrentAlbum.IS_MORE_CURRENT_ALBUM, payload: false })
            }
            dispatch({
                type: TypeActionsCurrentAlbum.GET_TRACKS_FOR_ALBUM,
                payload: data
            })

        } catch (e) {
            return alert("Ошибка")
        }
    }
}

export const actionGetFromMyTracks = (userID: string, offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {


        try {

            let urlRequest = `${SERVER_API}/tracks/tracks-from-user/${userID}?`

            if (offset) {
                urlRequest += `offset=${offset}`
            }

            const request = await fetch(urlRequest)



            if (!request.ok) {
                return alert("Произошла ошибка")
            }

            const data = await request.json()
            if (data.length === 0) {
                dispatch({ type: TypeActionsCurrentAlbum.IS_MORE_CURRENT_ALBUM, payload: false })
            }
            dispatch({
                type: TypeActionsCurrentAlbum.GET_TRACKS_FOR_ALBUM,
                payload: data
            })

        } catch (e) {
            return alert("Ошибка")
        }
    }
}


export const actionAddTrackToAlbum = (albumID: string, trackID: string) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        const token = localStorage.getItem("currentUserToken")

        if (!token) {
            alert("Вы не авторизованы")
            return
        }

        try {

            const request = await fetch(`${SERVER_API}/albums/${albumID}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({trackID})
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()

            return dispatch({
                type: TypeActionsCurrentAlbum.ADD_TRACK_TO_ALBUM,
                payload: trackID
            })

        } catch (e) {
            return alert(`Произошла ошибка: ${e}`)
        }
    }
}


export const actionRemoveTrackFromAlbum = (albumID: string, trackID: string) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        const token = localStorage.getItem("currentUserToken")

        if (!token) {
            alert("Вы не авторизованы")
            return
        }

        try {

            const request = await fetch(`${SERVER_API}/albums/${albumID}/${trackID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({trackID})
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()

            return dispatch({
                type: TypeActionsCurrentAlbum.REMOVE_TRACK_FROM_ALBUM,
                payload: trackID
            })

        } catch (e) {
            return alert(`Произошла ошибка: ${e}`)
        }
    }
}

export const actionGetTracksInAlbum = (albumID: string, offset?: number) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {
        try {

            let urlRequest = `${SERVER_API}/tracks/tracks-from-album/${albumID}?`

            if (offset) {
                urlRequest += `offset=${offset}`
            }

            const request = await fetch(urlRequest)
    
            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }
    
            const data = await request.json()

            if (data.length === 0) {
                dispatch({ type: TypeActionsCurrentAlbum.CHANGE_IS_MORE_TRACKS_IN_ALBUM, payload: false })
            }
    
            return dispatch({
                type: TypeActionsCurrentAlbum.GET_TRACKS_IN_ALBUM,
                payload: data
            })
    
        } catch (e) {
            return alert(`Произошла ошибка: ${e}`)
        }
    }
}

export const actionClearTracksInAlbum = (): ActionCurrentAlbum => {
    return {
        type: TypeActionsCurrentAlbum.CLEAR_TRACKS_IN_ALBUM
    }
}

export const actionAddLikeToCurrentAlbum = (userID: string): ActionCurrentAlbum => {
    return {
        type: TypeActionsCurrentAlbum.ADD_LIKE_TO_CURRENT_ALBUM,
        payload: userID
    }
}

export const actionRemoveLikeFromCurrentAlbum = (userID: string): ActionCurrentAlbum => {
    return {
        type: TypeActionsCurrentAlbum.REMOVE_LIKE_FROM_CURRENT_ALBUM,
        payload: userID
    }
}

export const actionGetCommentsInAlbum = (albumID: string, offset?: number) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        try {

            let urlRequest = `${SERVER_API}/albums/comments/${albumID}?`

            if (offset) {
                urlRequest += `offset=${offset}`
            }

            const request = await fetch(urlRequest)

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()

            if (data.length === 0) {
                dispatch({
                    type: TypeActionsCurrentAlbum.CHANGE_IS_MORE_COMMENTS,
                    payload: false
                })
            }

            return dispatch({
                type: TypeActionsCurrentAlbum.GET_COMMENTS_IN_CURRENT_ALBUM,
                payload: data
            })

        } catch(e) {
            return alert(e)
        }

    }
}

export const actionAddCommentToAlbum = (albumID: string, text: string) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        const token = localStorage.getItem("currentUserToken")

        if (!token) {
            alert("Вы не авторизованы")
            return
        }

        console.log(text)

        try {

            const request = await fetch(`${SERVER_API}/albums/comments/${albumID}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text})
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data = await request.json()

            

            return dispatch({
                type: TypeActionsCurrentAlbum.ADD_COMMENT_TO_CURRENT_ALBUM,
                payload: data
            })

        } catch(e) {
            return alert(e)
        }

    }
}


export const actionRemoveCommentFromAlbum = (commentID: string) => {
    return async (dispatch: Dispatch<ActionCurrentAlbum>) => {

        const token = localStorage.getItem("currentUserToken")

        if (!token) {
            alert("Вы не авторизованы")
            return
        }



        try {

            const request = await fetch(`${SERVER_API}/albums/comments/${commentID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            

            

            return dispatch({
                type: TypeActionsCurrentAlbum.REMOVE_COMMENT_FROM_CURRENT_ALBUM,
                payload: commentID
            })

        } catch(e) {
            return alert(e)
        }

    }
}

export const actionClearCommentsInAlbum = (): ActionCurrentAlbum => {
    return {
        type: TypeActionsCurrentAlbum.CLEAR_COMMENTS_IN_ALBUM
    }
}