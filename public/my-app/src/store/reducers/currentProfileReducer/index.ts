import { ActionCurrentProfile, IStateCurrentProfile, TypeActionCurrentProfile } from "../../../types/reducers/currentProfile"

const IDefaultStateCurrentProfile: IStateCurrentProfile = {
    profile: null
}

export const currentProfileRedcuer = (state = IDefaultStateCurrentProfile, action: ActionCurrentProfile): IStateCurrentProfile => {

    switch(action.type) {

        case TypeActionCurrentProfile.GET_CURRENT_PROFILE: {
            return {
                ...state,
                profile: action.payload
            }
        }

        default: {
            return state
        }
    } 

}