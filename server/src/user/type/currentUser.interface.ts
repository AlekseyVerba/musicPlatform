import { User } from "../schemas/user.schema"

export type currentUserType = Omit<User, "email" | "password">