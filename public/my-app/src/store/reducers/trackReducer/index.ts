import {ActionTracks, ActionTypeTrack,IStateTrack} from "../../../types/reducers/trackReducer"
import {ITrack} from "../../../types/track/"

const defaultState: IStateTrack = {
    tracks: [],
    error: null,
    loading: true,
    isMore: true
}

export const trackReducer = (state = defaultState, action: ActionTracks):IStateTrack => {
    switch(action.type) {
        
        case ActionTypeTrack.GET_TRACKS: {
            return {
                ...state,
                tracks: [...state.tracks, ...action.payload]
            }
        }

        case ActionTypeTrack.REMOVE_TRACK: {
            return {
                ...state,
                tracks: state.tracks.filter(track => track._id !== action.payload)
            }
        }

        case ActionTypeTrack.CHANGE_LISTEN_TRACK: {
            return {
                ...state,
                tracks: state.tracks.map(track => {
                    if (track._id === action.payload) {
                        track.listens++
                    }

                    return track
                })
            }
        }
        
        case ActionTypeTrack.CLEAR_TRACK: {
            return {
                ...state,
                tracks: [],
                isMore: true
            }
        }

        case ActionTypeTrack.STOP_LOAD: {
            return {
                ...state,
                isMore: false
            }
        }

        case ActionTypeTrack.ADD_LIKE: {
            return {
                ...state,
                tracks: [...state.tracks.map(track => {
                    if (track._id === action.payload.trackID) {
                        if (!track.likes?.includes(action.payload.userID)) {
                            track.likes?.push(action.payload.userID)
                        }
                    }

                    return track

                })]
            }
        }

        case ActionTypeTrack.REMOVE_LIKE: {
            return {
                ...state,
                tracks: [...state.tracks.map(track => {
                    if (track._id === action.payload.trackID) {
                        if (track.likes?.includes(action.payload.userID)) {
                            const idCurrentLike = track.likes?.indexOf(action.payload.userID)
                            track.likes = [...track.likes.slice(0,idCurrentLike), ...track.likes.slice(idCurrentLike + 1)]
                        }
                    }

                    return track

                })]
            }
        }

        default: {
            return state
        }

    }

}