import { CreateTrackI } from "../../types/requestInterfaces/createTrackInterface"

export enum ActionTypeCreateTrack {
    ADD_INFO_TRACK = "ADD_INFO_TRACK",
    ADD_AUDIO_FILE = "ADD_AUDIO_FILE",
    ADD_IMG_FILE = "ADD_IMG_FILE",
    CLEAR_INFO = "CLEAR_INFO"
}

interface ActionAddInfo {
    type: ActionTypeCreateTrack.ADD_INFO_TRACK,
    payload: CreateTrackI
}

interface ActionAddAudioFile {
    type: ActionTypeCreateTrack.ADD_AUDIO_FILE,
    payload: File
}

interface ActionAddImgFile {
    type: ActionTypeCreateTrack.ADD_IMG_FILE,
    payload: File
}

interface ActionClearInfo {
    type: ActionTypeCreateTrack.CLEAR_INFO,
}

export type ActionsCreateTrack = ActionAddInfo | ActionAddAudioFile | ActionAddImgFile | ActionClearInfo


export interface IStateCreateTrack {
    name: string | null
    artist: string | null
    text: string | null
    audio: File | null
    imgAudio: File | null
}