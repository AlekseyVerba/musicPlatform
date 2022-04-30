export interface IUser {
    _id: string | null
    username: string | null
    email: string | null
    imageURL: string | null
    followers: string[]
    following: string[]
    tracks: string[]
    albums: string[]
}



export interface ICreateUser {
    username: string
    email: string
    password: string
}

export interface ILoginUser {
    email: string
    password: string
}