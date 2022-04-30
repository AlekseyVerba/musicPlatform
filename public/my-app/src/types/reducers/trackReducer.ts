import { ITrack } from "../track"

export enum ActionTypeTrack {
    GET_TRACKS = "GET_TRACKS",
    START_LOADING = "START_LOADING",
    ADD_ERROR = "ADD_ERROR",
    REMOVE_TRACK = "REMOVE_TRACK",
    CHANGE_LISTEN_TRACK = "CHANGE_LISTEN_TRACK",
    CLEAR_TRACK = "CLEAR_TRACK",
    STOP_LOAD = "STOP_LOAD",
    ADD_LIKE = "ADD_LIKE",
    REMOVE_LIKE = "REMOVE_LIKE"
}

interface ActionGetTracksI {
    type: ActionTypeTrack.GET_TRACKS
    payload: ITrack[]
}

interface ActionStartLoading {
    type: ActionTypeTrack.START_LOADING
}

interface ActionAddError {
    type: ActionTypeTrack.ADD_ERROR
    payload: string | null
}

interface ActionRemoveTrack {
    type: ActionTypeTrack.REMOVE_TRACK,
    payload: string
}

interface ActionChangeListenTrack {
    type: ActionTypeTrack.CHANGE_LISTEN_TRACK,
    payload: string
}

interface ActionClearTracks {
    type: ActionTypeTrack.CLEAR_TRACK
}

interface ActionStopIsMore {
    type: ActionTypeTrack.STOP_LOAD
}

interface ActionAddLike {
    type: ActionTypeTrack.ADD_LIKE
    payload: {
        trackID: string,
        userID: string
    }
}

interface ActionRemoveLike {
    type: ActionTypeTrack.REMOVE_LIKE,
    payload: {
        trackID: string,
        userID: string
    }
}

export type ActionTracks = ActionGetTracksI | ActionStartLoading | ActionAddError | ActionRemoveTrack | ActionChangeListenTrack | ActionClearTracks | ActionStopIsMore | ActionAddLike | ActionRemoveLike

export interface IStateTrack {
    tracks: ITrack[],
    error: string | null
    loading: boolean,
    isMore: boolean
}