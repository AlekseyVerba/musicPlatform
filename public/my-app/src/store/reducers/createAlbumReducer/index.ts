import { ActionsCreateAlbum, IStateCreateAlbum, TypesActionsCreateAlbum } from "../../../types/reducers/createAlbum"

const defaultStateCreateAlbum: IStateCreateAlbum = {
    name: "",
    description: "",
    isShowInRecommendation: true,
    avatarURL: null,
    tracks: [],
    newAlbum: null
}

export const createAlbumReducer = (state = defaultStateCreateAlbum, action: ActionsCreateAlbum): IStateCreateAlbum => {

    switch(action.type) {

        case TypesActionsCreateAlbum.ADD_FIRST_STEP_ALBUM: {
            return {
                ...state,
                name: action.payload.name,
                description: action.payload.description,
                isShowInRecommendation: action.payload.isShowInRecommendation
            }
        }

        case TypesActionsCreateAlbum.ADD_IMG_ALBUM: {
            return {
                ...state,
                avatarURL: action.payload
            }
        }

        case TypesActionsCreateAlbum.CLEAR_STATE_ALBUM: {
            return {
                ...state,
                avatarURL: null,
                description: "",
                isShowInRecommendation: true,
                name: "",
                newAlbum: null
            }
        }

        case TypesActionsCreateAlbum.GET_NEW_ALBUM: {
            debugger
            return {
                ...state,
                newAlbum: action.payload
            }
        }

        default: {
            return state
        }

    }

}