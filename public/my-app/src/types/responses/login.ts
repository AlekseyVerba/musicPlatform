import { IUser } from "../user/" 


export interface IResponceLogin {
    user: IUser
    token: string
}