import {ActionsPlayer, IStatePlayer, TypeActionsPlayer} from "../../../types/reducers/playerReducer"
import {shuffle} from "../../../helpFunctions/sortRandomArray"

const defaultState: IStatePlayer = {
    activeTrack: null,
    currentTimeTrack: 0,
    durationTimeTrack: 0,
    isPause: true,
    volume: 50,
    currentPlaylist: [],
    isTrackRepeat: false,
    isTracksSpread: false,
    spreadArray: []
}

function getRandomFloat(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

export const playerReducer = (state = defaultState, action: ActionsPlayer): IStatePlayer => {
    switch(action.type) {
        case TypeActionsPlayer.ACTIVE_TRACK: {

            if (state.isTracksSpread && action.payload.track && action.payload.isTrackEnd === true) {
                return {
                    ...state,
                    activeTrack: action.payload.track
                }
            }

            if (action.payload.track && state.isTracksSpread) {

                if (state.currentPlaylist.length === state.spreadArray.length) {
                    return {
                        ...state,
                        activeTrack: state.currentPlaylist[getRandomFloat(0, state.currentPlaylist.length)],
                        spreadArray: []
                    }
                }

                let idx = getRandomFloat(0, state.currentPlaylist.length)
                console.log(idx)
                while(state.spreadArray.indexOf(idx) !== -1) {
                    idx = getRandomFloat(0, state.currentPlaylist.length)
                    
                }

                

                return {
                    ...state,
                    activeTrack: state.currentPlaylist[idx],
                    spreadArray: [...state.spreadArray, idx]
                }
            }

            return {
                ...state,
                activeTrack: action.payload.track
            }
        }

        case TypeActionsPlayer.START: {
            return {
                ...state,
                isPause: false
            }
        }

        case TypeActionsPlayer.PAUSE: {
            return {
                ...state,
                isPause: true
            }
        }

        case TypeActionsPlayer.CHANGE_CURRENT_TIME: {
            return {
                ...state,
                currentTimeTrack: action.payload
            }
        }

        case TypeActionsPlayer.ADD_DURATION_TIME: {
            return {
                ...state,
                durationTimeTrack: action.payload
            }
        }

        case TypeActionsPlayer.VOLUME: {
            return {
                ...state,
                volume: action.payload
            }
        }

        case TypeActionsPlayer.CHANGE_TRACK: {
            return {
                ...state,
                activeTrack: action.payload
            }
        }

        case TypeActionsPlayer.UPDATE_CURRENT_PLAYLIST: {
            return {
                ...state,
                currentPlaylist: action.payload
            }
        }

        case TypeActionsPlayer.CHANGE_STATUS_TRACK_REPEAT: {
            return {
                ...state,
                isTrackRepeat: action.payload
            }
        }

        case TypeActionsPlayer.CHANGE_STATUS_TRACKS_SPREAD: {

            return {
                ...state,
                isTracksSpread: action.payload,
            }
        }

        default: {
            return state
        }
    }
}

