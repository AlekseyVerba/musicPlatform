import {IAlbum, IAlbumTracksString} from "../album"

export enum TypesActionsCreateAlbum {
    ADD_FIRST_STEP_ALBUM = "ADD_FIRST_STEP_ALBUM",
    ADD_IMG_ALBUM = "ADD_IMG_ALBUM",
    CREATE_ALBUM = "CREATE_ALBUM",
    CLEAR_STATE_ALBUM = "CLEAR_STATE_ALBUM",
    GET_NEW_ALBUM = "GET_NEW_ALBUM"
}

interface ActionAddFirstStepAlbum {
    type: TypesActionsCreateAlbum.ADD_FIRST_STEP_ALBUM
    payload: {
        name: string
        description: string
        isShowInRecommendation: boolean
    }
}

interface ActionAddImgAlbum {
    type: TypesActionsCreateAlbum.ADD_IMG_ALBUM
    payload: File
}

interface ActionGetNewAlbum {
    type: TypesActionsCreateAlbum.GET_NEW_ALBUM
    payload: IAlbumTracksString
}

interface ActionClearStateAlbum {
    type: TypesActionsCreateAlbum.CLEAR_STATE_ALBUM
}

export type ActionsCreateAlbum = ActionAddFirstStepAlbum | ActionAddImgAlbum | ActionClearStateAlbum | ActionGetNewAlbum

export interface IStateCreateAlbum {
    name: string,
    description: string
    isShowInRecommendation: boolean
    avatarURL: File | null
    tracks: string[]
    newAlbum: IAlbumTracksString | null
}