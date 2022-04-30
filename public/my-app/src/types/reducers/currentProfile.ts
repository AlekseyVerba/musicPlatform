import { IUser } from "../user/"

export enum TypeActionCurrentProfile {
        GET_CURRENT_PROFILE = "GET_CURRENT_PROFILE"
}

interface ActionGetCurrentProfile {
    type: TypeActionCurrentProfile.GET_CURRENT_PROFILE
    payload: IUser | null
}

export type ActionCurrentProfile = ActionGetCurrentProfile

export interface IStateCurrentProfile {
    profile: IUser | null
}