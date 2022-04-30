import { User } from "../schemas/user.schema"

export interface UserWithTokenInterface {
    user: User
    token: string
}