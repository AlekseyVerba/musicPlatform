import { Request } from "express"
import { currentUserType } from "../user/type/currentUser.interface"


export interface RequestExpress extends Request {
    user?: currentUserType
}