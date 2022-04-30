import { Dispatch } from "react"
import { IAlbum } from "../../types/album"
import { ActionsAlbum, TypeActionAlbum } from "../../types/reducers/albumReducer"
import { ActionCurrentAlbum } from "../../types/reducers/currentAlbumReducer"
import { SERVER_API } from "../../config"
import { actionAddLikeToCurrentAlbum, actionRemoveLikeFromCurrentAlbum } from "./currentAlbumCreatorAction"

export const getAlbums = (filterInput: string, filterSelect: string, offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionsAlbum>) => {

        try {
            let urlRequest = `${SERVER_API}/albums/?`

            if (filterSelect) urlRequest += `searchSelect=${filterSelect}`

            if (filterInput) urlRequest += `&searchValue=${filterInput}`

            if (offset) urlRequest += `&offset=${offset || 0}`

            if (count) urlRequest = `&count=${count || 10}`

            const request = await fetch(urlRequest)
            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data: IAlbum[] = await request.json()

    

            if (data.length === 0) {
                dispatch({
                    type: TypeActionAlbum.CHANGE_MORE,
                    payload: false
                })
            }

            return dispatch({
                type: TypeActionAlbum.GET_ALBUMS,
                payload: data
            })

        } catch (e) {
            return console.log("Произошла ошибка")
        }

    }
}



export const getMyAlbums = (filterInput: string, filterSelect: string, offset?: number, count?: number) => {
    return async (dispatch: Dispatch<ActionsAlbum>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {
            let urlRequest = `${SERVER_API}/albums/my-albums/?`

            if (filterSelect) urlRequest += `searchSelect=${filterSelect}`

            if (filterInput) urlRequest += `&searchValue=${filterInput}`

            if (offset) urlRequest += `&offset=${offset || 0}`

            if (count) urlRequest = `&count=${count || 10}`

            const request = await fetch(urlRequest, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data: IAlbum[] = await request.json()

    

            if (data.length === 0) {
                dispatch({
                    type: TypeActionAlbum.CHANGE_MORE,
                    payload: false
                })
            }

            return dispatch({
                type: TypeActionAlbum.GET_ALBUMS,
                payload: data
            })

        } catch (e) {
            return console.log("Произошла ошибка")
        }

    }
}

export const clearAlbums = (): ActionsAlbum => {
    return {
        type: TypeActionAlbum.CLER_ALBUMS
    }
}

export const actionAddLikeToAlbum = (albumID: string, userID: string) => {

   return async (dispatch: Dispatch<ActionsAlbum | ActionCurrentAlbum>) => {

        try {

            const token = localStorage.getItem("currentUserToken")

            if (!token) {
                return alert("Вы не авторизованы")
            }

            dispatch({
                type: TypeActionAlbum.ADD_LIKE_TO_ALBUM,
                payload: {
                    albumID,
                    userID
                }
            })

            dispatch(actionAddLikeToCurrentAlbum(userID))

            const request = await fetch(`${SERVER_API}/albums/add-like/${albumID}`, {
                method: "PUT",
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
            return alert("Произошла ошибка: " + e)
        }

   }


}


export const actionRemoveLikeFromAlbum = (albumID: string, userID: string) => {

    return async (dispatch: Dispatch<ActionsAlbum | ActionCurrentAlbum>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            dispatch({
                type: TypeActionAlbum.REMOVE_LIKE_FROM_ALBUM,
                payload: {
                    albumID,
                    userID
                }
            })

            dispatch(actionRemoveLikeFromCurrentAlbum(userID))

            const request = await fetch(`${SERVER_API}/albums/remove-like/${albumID}`, {
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

export const actionRemoveAlbum = (albumID: string) => {
    return async (dispatch: Dispatch<ActionsAlbum>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            dispatch({
                type: TypeActionAlbum.REMOVE_ALBUM,
                payload: albumID
            })

            const request = await fetch(`${SERVER_API}/albums/${albumID}`, {
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

        } catch(e) {
            return console.log(`Произошла ошибка: ${e}`)
        }

    }
}
