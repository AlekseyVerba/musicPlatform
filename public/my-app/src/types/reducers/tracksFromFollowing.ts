import { TrackAndUser } from "../TrackAndUser"

export enum TypeActionTracksFromFollowing {
    GET_TRACKS_FROM_FOLLWING = "GET_TRACKS_FROM_FOLLWING",
    CLEAR_TRACKS_FROM_FOLLOWING = "CLEAR_TRACKS_FROM_FOLLOWING",
    CHANGE_IS_MORE_TRACKS_FROM_FOLLOWING = "IS_MORE_TRACKS_FROM_FOLLOWING",
    ADD_LIKE_TRACK_FOLLOWING = "ADD_LIKE_TRACK_FOLLOWING",
    REMOVE_LIKE_TRACK_FOLLOWING = "REMOVE_LIKE_TRACK_FOLLOWING"
}

interface actionGetTracksFromFollowing {
    type: TypeActionTracksFromFollowing.GET_TRACKS_FROM_FOLLWING,
    payload: TrackAndUser[][]
}

interface actionClearTracksFromFollowing {
    type: TypeActionTracksFromFollowing.CLEAR_TRACKS_FROM_FOLLOWING
}

interface actionChangeIsMoreTracksFromFollowing {
    type: TypeActionTracksFromFollowing.CHANGE_IS_MORE_TRACKS_FROM_FOLLOWING,
    payload: boolean
}

interface actionAddLikeTrackFollowing {
    type: TypeActionTracksFromFollowing.ADD_LIKE_TRACK_FOLLOWING
    payload: {
        trackID: string
        userID: string
    }
}

interface actionRemoveLikeTrackFollowing {
    type: TypeActionTracksFromFollowing.REMOVE_LIKE_TRACK_FOLLOWING
    payload: {
        trackID: string
        userID: string
    }
}

export type ActionTracksFromFollowing = actionGetTracksFromFollowing | actionClearTracksFromFollowing | actionChangeIsMoreTracksFromFollowing | actionAddLikeTrackFollowing | actionRemoveLikeTrackFollowing

export interface IStateTracksFromFollowing {
    tracks: TrackAndUser[][]
    isMoreTracksFromFollowing: boolean
}