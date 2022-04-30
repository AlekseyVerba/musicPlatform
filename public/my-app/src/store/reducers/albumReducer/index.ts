import { ActionsAlbum, IStateAlbum, TypeActionAlbum } from "../../../types/reducers/albumReducer"

const defaultStateAlbum: IStateAlbum = {
    items: [],
    isMore: true
} 

export const albumReducer = (state = defaultStateAlbum, action: ActionsAlbum): IStateAlbum => {
    switch(action.type) {

        case TypeActionAlbum.GET_ALBUMS: {
            return {
                ...state,
                items: [...state.items, ...action.payload]
            }
        }

        case TypeActionAlbum.CLER_ALBUMS: {
            return {
                ...state,
                items: [],
                isMore: true
            }
        }

        case TypeActionAlbum.CHANGE_MORE: {
            return {
                ...state,
                isMore: action.payload
            }
        }

        case TypeActionAlbum.ADD_LIKE_TO_ALBUM: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.payload.albumID) {
                        if (!item.likes.includes(action.payload.userID)) {
                            item.likes.push(action.payload.userID)
                        }
                    }
                    return item
                })
            }
        }

        case TypeActionAlbum.REMOVE_LIKE_FROM_ALBUM: {
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.payload.albumID) {
                        if (item.likes?.includes(action.payload.userID)) {
                            const idCurrentLike = item.likes?.indexOf(action.payload.userID)
                            item.likes = [...item.likes.slice(0,idCurrentLike), ...item.likes.slice(idCurrentLike + 1)]
                        }
                    }

                    return item

                })
            }
        }

        case TypeActionAlbum.REMOVE_ALBUM: {
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        }



        default: {
            return state
        }
    }
}