import { ITrack } from "../../../types/track"
import { IAlbum } from "../../../types/album"
import { ActionCurrentAlbum, TypeActionsCurrentAlbum, IStateCurrentAlbum } from "../../../types/reducers/currentAlbumReducer"

const defaultStateCurrentAlbumReducer: IStateCurrentAlbum = {
    album: null,
    findTracks: [],
    isMoreCurrentAlbum: true,
    currentTracks: [],
    isMoreTracksInAlbum: true,
    comments: [],
    isMoreCommentsInAlbum: true
}

export const currentAlbumReducer = (state = defaultStateCurrentAlbumReducer, action: ActionCurrentAlbum): IStateCurrentAlbum => {
    switch(action.type) {

        case TypeActionsCurrentAlbum.GET_CURRENT_ALBUM: {
            return {
                ...state,
                album: action.payload
            }
        }

        case TypeActionsCurrentAlbum.GET_TRACKS_FOR_ALBUM: {
            return {
                ...state,
                findTracks: [...state.findTracks, ...action.payload]
            }
        }

        case TypeActionsCurrentAlbum.CLEAR_TRACKS_FOR_ALBUM: {
            return {
                ...state,
                findTracks: [],
                isMoreCurrentAlbum: true
            }
        }

        case TypeActionsCurrentAlbum.IS_MORE_CURRENT_ALBUM: {
            return {
                ...state,
                isMoreCurrentAlbum: action.payload
            }
        }

        case TypeActionsCurrentAlbum.ADD_TRACK_TO_ALBUM: {
            if (state.album === null) {
                return state
            }
            return {
                ...state,
                album: {...state.album, tracks: [...state.album?.tracks!, action.payload]}
            }
        }

        case TypeActionsCurrentAlbum.REMOVE_TRACK_FROM_ALBUM: {
            if (state.album === null) {
                return state
            }

            return {
                ...state,
                album: {...state.album, tracks: state.album.tracks.filter(track => track !== action.payload)}
            }
        }

        case TypeActionsCurrentAlbum.GET_TRACKS_IN_ALBUM: {
            return {
                ...state,
                currentTracks: [...state.currentTracks, ...action.payload]
            }
        }

        case TypeActionsCurrentAlbum.CLEAR_TRACKS_IN_ALBUM: {
            return {
                ...state,
                currentTracks: [],
                isMoreTracksInAlbum: true
            }
        }

        case TypeActionsCurrentAlbum.CHANGE_IS_MORE_TRACKS_IN_ALBUM: {
            return {
                ...state,
                isMoreTracksInAlbum: action.payload
            }
        }

        case TypeActionsCurrentAlbum.ADD_LIKE_TO_CURRENT_ALBUM: {

            if (!state.album) {
                return state
            }

            return {
                ...state,
                album: {...state.album, likes: [...state.album.likes, action.payload]}
            }
        }

        case TypeActionsCurrentAlbum.REMOVE_LIKE_FROM_CURRENT_ALBUM: {

            if (!state.album) {
                return state
            }

            return {
                ...state,
                album: {...state.album, likes: state.album.likes.filter(like => like !== action.payload)}
            }

        }

        case TypeActionsCurrentAlbum.GET_COMMENTS_IN_CURRENT_ALBUM: {
            return {
                ...state,
                comments: [...state.comments, ...action.payload]
            }
        }

        case TypeActionsCurrentAlbum.ADD_COMMENT_TO_CURRENT_ALBUM: {
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        }

        case TypeActionsCurrentAlbum.REMOVE_COMMENT_FROM_CURRENT_ALBUM: {
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        }

        case TypeActionsCurrentAlbum.CHANGE_IS_MORE_COMMENTS: {
            return {
                ...state,
                isMoreCommentsInAlbum: action.payload
            }
        }

        case TypeActionsCurrentAlbum.CLEAR_COMMENTS_IN_ALBUM: {
            return {
                ...state,
                comments: [],
                isMoreCommentsInAlbum: true
            }
        }

        default: {
            return state
        }
    }
}