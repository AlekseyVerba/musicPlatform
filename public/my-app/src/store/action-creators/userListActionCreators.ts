import { IUser } from "../../types/user/"
import { ActionsUserList, TypesActionsUserList } from "../../types/reducers/UsersListReducer"
import { Dispatch } from "react"
import { SERVER_API } from "../../config"

export const actionGetUserList = (filterInput: string, filterSelect: string,offset: number = 0, count: number = 10) => {
    return async (dispatch: Dispatch<ActionsUserList>) => {

        try {

            let urlRequest = `${SERVER_API}/users/?`

            if (filterSelect) urlRequest += `searchSelect=${filterSelect}`

            if (filterInput) urlRequest += `&searchValue=${filterInput}`

            if (offset) urlRequest += `&offset=${offset || 0}`

            if (count) urlRequest += `&count=${count || 10}`


            const request = await fetch(urlRequest)

            if (!request.ok) {
                return alert("Произошла ошибка")
            }

            const data: IUser[] = await request.json()
            console.log(data)

            if (data.length === 0) {
                dispatch({
                    type: TypesActionsUserList.IS_MORE_USER_LIST,
                    payload: false
                })
            }

            return dispatch({
                type: TypesActionsUserList.GET_LIST_USERS,
                payload: data
            })

        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}

export const actionClearUserList = (): ActionsUserList => {
    return {
        type: TypesActionsUserList.CLEAR_LIST_USERS,
    }
}