import { IAlbum } from "../album"
import { ITrack } from "../track/"
import { ICommentAlbum } from "../../types/comment/"

export enum TypeActionsCurrentAlbum {
    GET_CURRENT_ALBUM = "GET_CURRENT_ALBUM",
    GET_TRACKS_FOR_ALBUM = "GET_TRACKS_FOR_ALBUM",
    CLEAR_TRACKS_FOR_ALBUM = "CLEAR_TRACKS_FOR_ALBUM",
    IS_MORE_CURRENT_ALBUM = "IS_MORE_CURRENT_ALBUM",
    ADD_TRACK_TO_ALBUM = "ADD_TRACK_TO_ALBUM",
    REMOVE_TRACK_FROM_ALBUM = "REMOVE_TRACK_FROM_ALBUM",
    GET_TRACKS_IN_ALBUM = "GET_TRACKS_IN_ALBUM",
    CLEAR_TRACKS_IN_ALBUM = "CLEAR_TRACKS_IN_ALBUM",
    CHANGE_IS_MORE_TRACKS_IN_ALBUM = "CHANGE_IS_MORE_TRACKS_IN_ALBUM",
    ADD_LIKE_TO_CURRENT_ALBUM = "ADD_LIKE_TO_CURRENT_ALBUM",
    REMOVE_LIKE_FROM_CURRENT_ALBUM = "REMOVE_LIKE_FROM_CURRENT_ALBUM",
    GET_COMMENTS_IN_CURRENT_ALBUM = "GET_COMMENTS_IN_ALBUM",
    ADD_COMMENT_TO_CURRENT_ALBUM = "ADD_COMMENT_TO_ALBUM",
    REMOVE_COMMENT_FROM_CURRENT_ALBUM = "REMOVE_COMMENT_FROM_CURRENT_ALBUM",
    CLEAR_COMMENTS_IN_ALBUM = "CLEAR_COMMENTS_IN_ALBUM",
    CHANGE_IS_MORE_COMMENTS = "CHANGE_IS_MORE_COMMENTS"
}

interface ActionGetCurrentAlbum {
    type: TypeActionsCurrentAlbum.GET_CURRENT_ALBUM
    payload: IAlbum
}

interface ActionGetTracksForAlbum {
    type: TypeActionsCurrentAlbum.GET_TRACKS_FOR_ALBUM
    payload: ITrack[]
}

interface ActionChangeIsMoreCurrentAlbum {
    type: TypeActionsCurrentAlbum.IS_MORE_CURRENT_ALBUM
    payload: boolean
}

interface ActionAddTrackToAlbum {
    type: TypeActionsCurrentAlbum.ADD_TRACK_TO_ALBUM
    payload: string
}

interface ActionRemoveTrackFromAlbum {
    type: TypeActionsCurrentAlbum.REMOVE_TRACK_FROM_ALBUM
    payload: string
}

interface ActionClearTrackForAlbum {
    type: TypeActionsCurrentAlbum.CLEAR_TRACKS_FOR_ALBUM
}

interface ActionGetTracksInAlbum {
    type: TypeActionsCurrentAlbum.GET_TRACKS_IN_ALBUM,
    payload: ITrack[]
}

interface ActionClearTracksInAlbum {
    type: TypeActionsCurrentAlbum.CLEAR_TRACKS_IN_ALBUM,
}

interface ActionChangeIsMoreTracksInAlbum {
    type: TypeActionsCurrentAlbum.CHANGE_IS_MORE_TRACKS_IN_ALBUM,
    payload: boolean
}

interface ActionRemoveLikeFromCurrentAlbum {
    type: TypeActionsCurrentAlbum.REMOVE_LIKE_FROM_CURRENT_ALBUM
    payload: string
}

interface ActionAddLikeToCurrentAlbum {
    type: TypeActionsCurrentAlbum.ADD_LIKE_TO_CURRENT_ALBUM
    payload: string
}

interface ActionGetCommentsInCurrentAlbum {
    type: TypeActionsCurrentAlbum.GET_COMMENTS_IN_CURRENT_ALBUM
    payload: ICommentAlbum[]
}

interface ActionAddCommentInCurrentAlbum {
    type: TypeActionsCurrentAlbum.ADD_COMMENT_TO_CURRENT_ALBUM,
    payload: ICommentAlbum
}

interface ActionRemoveCommentFromCurrentAlbum {
    type: TypeActionsCurrentAlbum.REMOVE_COMMENT_FROM_CURRENT_ALBUM
    payload: string
}

interface ActionChangeIsMoreComments {
    type: TypeActionsCurrentAlbum.CHANGE_IS_MORE_COMMENTS,
    payload: boolean
}

interface ActionClearCommentInCurrentAlbum {
    type: TypeActionsCurrentAlbum.CLEAR_COMMENTS_IN_ALBUM
}

export type ActionCurrentAlbum = ActionGetCurrentAlbum | ActionGetTracksForAlbum | ActionClearTrackForAlbum | ActionChangeIsMoreCurrentAlbum | ActionAddTrackToAlbum | ActionRemoveTrackFromAlbum | ActionGetTracksInAlbum | ActionClearTracksInAlbum | ActionChangeIsMoreTracksInAlbum | ActionAddLikeToCurrentAlbum | ActionRemoveLikeFromCurrentAlbum | ActionGetCommentsInCurrentAlbum | ActionAddCommentInCurrentAlbum | ActionRemoveCommentFromCurrentAlbum | ActionChangeIsMoreComments | ActionClearCommentInCurrentAlbum

export interface IStateCurrentAlbum {
    album: IAlbum | null,
    currentTracks: ITrack[],
    findTracks: ITrack[],
    isMoreCurrentAlbum: boolean,
    isMoreTracksInAlbum: boolean,
    isMoreCommentsInAlbum: boolean,
    comments: ICommentAlbum[]
}