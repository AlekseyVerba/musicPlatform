import { ActionTypeCreateTrack, ActionsCreateTrack, IStateCreateTrack } from "../../../types/reducers/createTrackReducer"

const defaultState: IStateCreateTrack = {
    artist: null,
    audio: null,
    imgAudio: null,
    name: null,
    text: null
}

export const createTrackReducer = (state = defaultState, action: ActionsCreateTrack): IStateCreateTrack => {

    switch(action.type) {
        
        case ActionTypeCreateTrack.ADD_INFO_TRACK: {
            return {
                ...state,
                artist: action.payload.artist,
                name: action.payload.name,
                text: action.payload.text
            }
        }

        case ActionTypeCreateTrack.ADD_IMG_FILE: {
            console.log(action.payload)
            return {
                ...state,
                imgAudio: action.payload
            }
        }

        case ActionTypeCreateTrack.ADD_AUDIO_FILE: {
            return {
                ...state,
                audio: action.payload
            }
        }

        case ActionTypeCreateTrack.CLEAR_INFO: {
            return {
                ...state,
                artist: null,
                audio: null,
                imgAudio: null,
                name: null,
                text: null
            }
        }

        default: {
            return state
        }

    }

}