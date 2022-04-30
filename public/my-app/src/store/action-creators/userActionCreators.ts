import { ActionUser, TypeActionUser } from "../../types/reducers/userReducerType"
import { ActionsUserList, TypesActionsUserList } from "../../types/reducers/UsersListReducer"
import { ICreateUser, ILoginUser } from "../../types/user/"
import { Dispatch } from "redux"
import { SERVER_API } from "../../config"
import { IResponceLogin } from "../../types/responses/login"


export const actionSayHello = (text: string): ActionUser => {
    return {
        type: TypeActionUser.SAY_HELLO,
        payload: text
    }
}


export const actionRegister = (userInfo: ICreateUser) => {
    return async (dispatch: Dispatch<ActionUser>) => {
        try {
            dispatch({type: TypeActionUser.ADD_ERROR_REGISTER, payload: null})
            dispatch({type: TypeActionUser.ADD_SUCCESS_REGISTER, payload: null})
            const request = await fetch(`${SERVER_API}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })

            if (!request.ok) {
                const dataError = await request.json()
                return dispatch({type: TypeActionUser.ADD_ERROR_REGISTER, payload: dataError.message})
            }

            const data = await request.json()

            dispatch({type: TypeActionUser.ADD_SUCCESS_REGISTER, payload: "Успешно"})
            setTimeout(() => {
                dispatch({type: TypeActionUser.ADD_SUCCESS_REGISTER, payload: null})
            }, 3000)

            return dispatch({type: TypeActionUser.REGESTRATION})

        } catch(e) {
            return dispatch({type: TypeActionUser.ADD_ERROR_REGISTER, payload: "Произошла ошибка"})
        }

    }
}


export const actonLogin = (infoUser: ILoginUser) => {
    return async (dispatch: Dispatch<ActionUser>) => {
        dispatch({type: TypeActionUser.ADD_ERROR_LOGIN, payload: null})
        dispatch({type: TypeActionUser.ADD_SUCCESS_LOGIN, payload: null})
        try {

            const request = await fetch(`${SERVER_API}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...infoUser})
            })

            if (!request.ok) {
                const dataError = await request.json()
                return dispatch({type: TypeActionUser.ADD_ERROR_LOGIN, payload: dataError.message})
            }

            const data: IResponceLogin = await request.json()
            console.log(data)
            localStorage.setItem("currentUserToken", data.token)

            return dispatch({type: TypeActionUser.LOGIN, payload: data.user})


        } catch(e) {
            dispatch({type: TypeActionUser.ADD_ERROR_LOGIN, payload: "Произошла ошибка"})
        }

    }
}

export const actionAuth = () => {
    return async (dispatch: Dispatch<ActionUser>) => {
        const token = localStorage.getItem("currentUserToken")
        if (token) {
            try {

                const request = await fetch(`${SERVER_API}/auth`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
    
                if (!request.ok) {
                    localStorage.removeItem("currentUserToken")
                }
    
                const data: IResponceLogin = await request.json()
                localStorage.setItem("currentUserToken", data.token)
                return dispatch({type: TypeActionUser.LOGIN, payload: data.user})
    
            } catch(e) {
                localStorage.removeItem("currentUserToken")
            }
        }
        

    }
}

export const actionLogout = (): ActionUser => {
    return {
        type: TypeActionUser.LOGOUT
    }
}

export const actionFollow = (userID: string, currentUserID: string) => {
    return async (dispatch: Dispatch<ActionUser | ActionsUserList>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }
    
        try {
    
            const request = await fetch(`${SERVER_API}/users/follow/${userID}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            dispatch({
                type: TypesActionsUserList.ADD_FOLLOWER_TO_USER_LIST,
                payload: {
                    userFollowingID: userID,
                    currentUserID
                }
            })

            return dispatch({
                type: TypeActionUser.FOLLOW,
                payload: userID
            })
    
        } catch(e) {
            return alert("Призошла ошибка: " + e)
        }

    }

}

export const actionUnfollow = (userID: string, currentUserID: string) => {
    return async (dispatch: Dispatch<ActionUser | ActionsUserList>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }
    
        try {
    
            const request = await fetch(`${SERVER_API}/users/unfollow/${userID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            dispatch({
                type: TypesActionsUserList.REMOVE_FOLLOWER_FROM_USER_LIST,
                payload: {
                    userFollowingID: userID,
                    currentUserID
                }
            })

            return dispatch({
                type: TypeActionUser.UNFOLLOW,
                payload: userID
            })
    
        } catch(e) {
            return alert("Призошла ошибка: " + e)
        }

    }

}

export const actionAddTrackToMe = (trackID: string) => {
    return async (dispatch: Dispatch<ActionUser>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            const request = await fetch(`${SERVER_API}/tracks/add-to-user/${trackID}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            return dispatch({
                type: TypeActionUser.ADD_TO_ME_TRACK,
                payload: trackID
            })
 
        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}


export const actionRemoveTrackFromMe = (trackID: string) => {
    return async (dispatch: Dispatch<ActionUser>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            const request = await fetch(`${SERVER_API}/tracks/remove-from-user/${trackID}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            return dispatch({
                type: TypeActionUser.REMOVE_FROM_ME_TRACK,
                payload: trackID
            })
 
        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}


export const actionAddAlbumtoMe = (albumID: string) => {
    return async (dispatch: Dispatch<ActionUser>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            const request = await fetch(`${SERVER_API}/albums/add-to-user/${albumID}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            return dispatch({
                type: TypeActionUser.ADD_ALBUM_TO_MY_ALBUMS,
                payload: albumID
            })
 
        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}


export const actionRemoveAlbumFromMe = (albumID: string) => {
    return async (dispatch: Dispatch<ActionUser>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            const request = await fetch(`${SERVER_API}/albums/remove-from-user/${albumID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!request.ok) {
                const dataError = await request.json()
                return alert(dataError.message)
            }

            return dispatch({
                type: TypeActionUser.REMOVE_ALBUM_FROM_MY_ALBUMS,
                payload: albumID
            })
 
        } catch(e) {
            return alert(`Произошла ошибка: ${e}`)
        }

    }
}

export const actionChangeAvatar = (avatar: File) => {
    return async (dispatch: Dispatch<ActionUser>) => {

        const token = localStorage.getItem("currentUserToken")
        if (!token) {
            return alert("Вы не авторизованы")
        }

        try {

            if (!avatar) {
                return alert("Файл должен быть добавлен")
            }

            const newData = new FormData()
            newData.append("avatar", avatar)

            const request = await fetch(`${SERVER_API}/users/change-avatar`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: newData
            })

            if (!request.ok) {
                const errorData = await request.json()
                return alert(errorData.message)
            }

            const data = await request.text()


            return dispatch({
                type: TypeActionUser.CHANGED_AVATAR,
                payload: data
            })

        } catch(e) {
            alert(`Произошла ошибка ${e}`)
        }

    }
}