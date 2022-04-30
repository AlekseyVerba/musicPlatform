import { ActionTracksFromFollowing, IStateTracksFromFollowing, TypeActionTracksFromFollowing } from "../../../types/reducers/tracksFromFollowing"


const IDefaultStateTracksFromFollowing: IStateTracksFromFollowing = {
    isMoreTracksFromFollowing: true,
    tracks: []
}

export const tracksFromFollowing = (state = IDefaultStateTracksFromFollowing, action: ActionTracksFromFollowing): IStateTracksFromFollowing  => {

    switch(action.type) {

        case TypeActionTracksFromFollowing.GET_TRACKS_FROM_FOLLWING: {
            const updateArray = [...state.tracks]
            action.payload.forEach(el => {
                updateArray.push(el)
            })
            

            return {
                ...state,
                tracks: updateArray
            }
        }

        case TypeActionTracksFromFollowing.CLEAR_TRACKS_FROM_FOLLOWING: {
            return {
                ...state,
                tracks: [],
                isMoreTracksFromFollowing: true
            }
        }

        case TypeActionTracksFromFollowing.CHANGE_IS_MORE_TRACKS_FROM_FOLLOWING: {
            return {
                ...state,
                isMoreTracksFromFollowing: action.payload
            }
        }

        case TypeActionTracksFromFollowing.ADD_LIKE_TRACK_FOLLOWING: {
            const items = state.tracks.map(track => {
                return track.map(trackOne => {
                    if (trackOne.track._id === action.payload.trackID) {
                        trackOne.track.likes = [...trackOne.track.likes!, action.payload.userID]
                    }
                    return trackOne
                })
            })

            return {
                ...state,
                tracks: items
            }
        }

        case TypeActionTracksFromFollowing.REMOVE_LIKE_TRACK_FOLLOWING: {
            const items = state.tracks.map(track => {
                return track.map(trackOne => {
                    if (trackOne.track._id === action.payload.trackID) {
                        trackOne.track.likes = trackOne.track.likes?.filter(like => like !== action.payload.userID)
                    }
                    return trackOne
                })
            })

            return {
                ...state,
                tracks: items
            }
        }

        default: {
            return state
        }
    }
}