import { ActionsPlayer, TypeActionsPlayer} from "../../types/reducers/playerReducer"
import { ITrack } from "../../types/track"

export const actionAddActiveTrack = (payload: ITrack | null, isTrackEnd?: boolean): ActionsPlayer => {

    
    return {
        type: TypeActionsPlayer.ACTIVE_TRACK,
        payload: {
            track: payload,
            isTrackEnd: isTrackEnd
        }
    }
}

export const actionStart = (): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.START
    }
}

export const actionPause = (): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.PAUSE
    }
}

export const actionChangeCurrentTime = (payload: number): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.CHANGE_CURRENT_TIME,
        payload
    }
}

export const actionAddDurationTime = (payload: number): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.ADD_DURATION_TIME,
        payload
    }
}

export const actionChangeVolume = (payload: number): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.VOLUME,
        payload
    }
}

export const actionUpdateCurrentList = (payload: ITrack[]): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.UPDATE_CURRENT_PLAYLIST,
        payload
    }
}

export const actionChangeStatusTrackRepeat = (payload: boolean): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.CHANGE_STATUS_TRACK_REPEAT,
        payload
    }
}

export const actionChangeStatusTracksSpread = (payload: boolean): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.CHANGE_STATUS_TRACKS_SPREAD,
        payload
    }
}

export const actionClearSpreadArray = (): ActionsPlayer => {
    return {
        type: TypeActionsPlayer.CLEAR_SPREAD_ARRAY
    }
}
// export const actionChangeTrack = (currentTrackID: ): ActionsPlayer => {

// }