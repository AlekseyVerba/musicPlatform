import { ActionUser, IStateUser } from "../../../types/reducers/userReducerType"
import { TypeActionUser } from "../../../types/reducers/userReducerType"

const defaultState: IStateUser = {
    user: {
        _id: null,
        email: null,
        imageURL: null,
        username: null,
        followers: [],
        following: [],
        tracks: [],
        albums: []
    },
    isAuth: false,
    errorLogin: null,
    successLogin: null,
    errorRegister: null,
    successRegister: null,
    loading: false
}

export const userReducer = (state = defaultState, action: ActionUser): IStateUser => {
    switch(action.type) {

        case TypeActionUser.SAY_HELLO: {
            console.log(action.payload)
            return state
        }

        case TypeActionUser.REGESTRATION: {
            return state
        }

        case TypeActionUser.LOGIN: {
            return {
                ...state,
                user: action.payload,
                errorLogin: null,
                isAuth: true
            }
        }

        case TypeActionUser.ADD_ERROR_REGISTER: {
            return {
                ...state,
                errorRegister: action.payload
            }
        }

        case TypeActionUser.ADD_SUCCESS_REGISTER: {
            return {
                ...state,
                successRegister: action.payload
            }
        }

        case TypeActionUser.ADD_SUCCESS_LOGIN: {
            return {
                ...state,
                successLogin: action.payload
            }
        }

        case TypeActionUser.ADD_ERROR_LOGIN: {
            return {
                ...state,
                errorLogin: action.payload
            }
        }

        case TypeActionUser.LOGOUT: {
            localStorage.removeItem("currentUserToken")
            return {
                ...state,
                user: {
                    _id: null,
                    email: null,
                    imageURL: null,
                    username: null,
                    followers: [],
                    following: [],
                    tracks: [],
                    albums: []
                },
                isAuth: false
            }
        }

        case TypeActionUser.FOLLOW: {
            return {
                ...state,
                user: {...state.user, following: [...state.user.following, action.payload]}
            }
        }

        case TypeActionUser.UNFOLLOW: {
            return {
                ...state,
                user: {...state.user, following: state.user.following.filter(follow => follow !== action.payload)}
            }
        }

        case TypeActionUser.ADD_TO_ME_TRACK: {
            return {
                ...state,
                user: {...state.user, tracks: [...state.user.tracks, action.payload]}
            }
        }

        case TypeActionUser.REMOVE_FROM_ME_TRACK: {
            return {
                ...state,
                user: {...state.user, tracks: state.user.tracks.filter(track => track !== action.payload)}
            }
        }

        case TypeActionUser.ADD_ALBUM_TO_MY_ALBUMS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    albums: [...state.user.albums, action.payload]
                }
            }
        }

        case TypeActionUser.REMOVE_ALBUM_FROM_MY_ALBUMS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    albums: state.user.albums.filter(album => album !== action.payload)
                }
            }
        }

        case TypeActionUser.CHANGED_AVATAR: {
            return {
                ...state,
                user: {
                    ...state.user,
                    imageURL: action.payload
                }
            }
        }

        default: {
            return state
        }
    }
}