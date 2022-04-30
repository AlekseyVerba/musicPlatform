import { Dispatch } from "react"
import { ActionCurrentProfile, TypeActionCurrentProfile } from "../../types/reducers/currentProfile"
import { SERVER_API } from "../../config"
import { IUser } from "../../types/user"

export const actionGetCurrentProfile = (userID: string) => {
    return async (dispatch: Dispatch<ActionCurrentProfile>) => {

        try {

            const request = await fetch(`${SERVER_API}/users/${userID}`)

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            const data: IUser = await request.json() 

            return dispatch({
                type: TypeActionCurrentProfile.GET_CURRENT_PROFILE,
                payload: data
            })

        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}

export const actionClearCurrentProfile = (): ActionCurrentProfile => {
    return {
        type: TypeActionCurrentProfile.GET_CURRENT_PROFILE,
        payload: null
    }
}