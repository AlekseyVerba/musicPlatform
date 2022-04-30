import { ITrack } from "../track/"

export enum TypeActionsPlayer {
    START = "START",
    PAUSE = "PAUSE",
    ACTIVE_TRACK = "ACTIVE_TRACK",
    CHANGE_CURRENT_TIME = "CHANGE_CURRENT_TIME",
    ADD_DURATION_TIME = "ADD_DURATION_TIME",
    VOLUME = "VOLUME",
    CHANGE_TRACK = "CHANGE_TRACK",
    UPDATE_CURRENT_PLAYLIST = "UPDATE_CURRENT_PLAYLIST",
    CHANGE_STATUS_TRACK_REPEAT = "CHANGE_STATUS_TRACK_REPEAT",
    CHANGE_STATUS_TRACKS_SPREAD = "CHANGE_STATUS_TRACKS_SPREAD",
    ADD_INDEX_TO_SPREAD_ARRAY = "ADD_INDEX_TO_SPREAD_ARRAY",
    CLEAR_SPREAD_ARRAY = "CLEAR_SPREAD_ARRAY"
}


interface ActionStart {
    type: TypeActionsPlayer.START,
}

interface ActionPause {
    type: TypeActionsPlayer.PAUSE,
}

interface ActionActiveTrack {
    type: TypeActionsPlayer.ACTIVE_TRACK,
    payload: {
        track: ITrack | null
        isTrackEnd?: boolean
    }
}

interface ActionChangeCurrentTime {
    type: TypeActionsPlayer.CHANGE_CURRENT_TIME,
    payload: number
}

interface ActionAddDurationTime {
    type: TypeActionsPlayer.ADD_DURATION_TIME,
    payload: number
}

interface ActionChangeVolume {
    type: TypeActionsPlayer.VOLUME
    payload: number
}

interface ActionChangeTrack {
    type: TypeActionsPlayer.CHANGE_TRACK,
    payload: ITrack
}
interface ActionUpdateCurrentPlaylist {
    type: TypeActionsPlayer.UPDATE_CURRENT_PLAYLIST,
    payload: ITrack[]
}

interface ActionChangeStatusTrackRepeat {
    type: TypeActionsPlayer.CHANGE_STATUS_TRACK_REPEAT
    payload: boolean
}

interface ActionChangeStatusTracksSpread {
    type: TypeActionsPlayer.CHANGE_STATUS_TRACKS_SPREAD
    payload: boolean
}

interface ActionAddIndexToSpreadArray {
    type: TypeActionsPlayer.ADD_INDEX_TO_SPREAD_ARRAY,
    payload: number
}

interface ActionClearSpreadArray {
    type: TypeActionsPlayer.CLEAR_SPREAD_ARRAY,
}

export type ActionsPlayer = ActionStart | ActionPause | ActionActiveTrack | ActionChangeCurrentTime | ActionAddDurationTime | ActionChangeVolume | ActionChangeTrack | ActionUpdateCurrentPlaylist | ActionChangeStatusTrackRepeat | ActionChangeStatusTracksSpread | ActionAddIndexToSpreadArray | ActionClearSpreadArray


export interface IStatePlayer {
    volume: number
    activeTrack: null | ITrack
    currentTimeTrack: number
    durationTimeTrack: number
    isPause: boolean
    currentPlaylist: ITrack[]
    isTrackRepeat: boolean
    isTracksSpread: boolean,
    spreadArray: number[]
}