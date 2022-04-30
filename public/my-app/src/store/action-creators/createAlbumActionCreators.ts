import { Dispatch } from "react"
import { ActionsCreateAlbum, TypesActionsCreateAlbum } from "../../types/reducers/createAlbum"
import { SERVER_API } from "../../config"
import { IAlbum, IAlbumTracksString } from "../../types/album"

export const actionAddInfoToNewAlbum = (name: string, description: string, isShowInRecommendation: boolean): ActionsCreateAlbum => {
    return {
        type: TypesActionsCreateAlbum.ADD_FIRST_STEP_ALBUM,
        payload: {
            name,
            description,
            isShowInRecommendation
        }
    }
}

export const actionAddImgToNewAlbum = (payload: File): ActionsCreateAlbum => {
    return {
        type: TypesActionsCreateAlbum.ADD_IMG_ALBUM,
        payload
    }
}


export const actionCreateAlbum = (name: string, avatarAlbum: File, description?: string, isShowInRecommendation?: boolean) => {

    return async (dispatch: Dispatch<ActionsCreateAlbum>) => {

        const token = localStorage.getItem("currentUserToken")

        if (!token) {
            alert("Вы не авторизованы")
            return
        }
    
        try {
    
            const newData = new FormData()
            newData.append("name", name)
            newData.append("avatar", avatarAlbum)
            
            description && newData.append("description", description)
            isShowInRecommendation && newData.append("isShowInRecommendation", isShowInRecommendation ? "true" : "false")
    
            const request = await fetch(`${SERVER_API}/albums/create`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: newData
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data: IAlbumTracksString = await request.json()

             dispatch({
                type: TypesActionsCreateAlbum.GET_NEW_ALBUM,
                payload: data
            })

           
            return true
    
        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }

}

export const actionClearCreateAlbum = ():ActionsCreateAlbum => {
    return {
        type: TypesActionsCreateAlbum.CLEAR_STATE_ALBUM,
    }
}