import React from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { IUser } from "../../types/user"
import "./index.scss"

interface IPropLike {
    arrayLikes: string[] | undefined
    currentElementID: string
    userCreated: IUser,
    removeLike: (currentElementID: string, userID: string) => void
    addLike: (currentElementID: string) => void
}

const Like: React.FC<IPropLike> = ({arrayLikes, currentElementID, userCreated, addLike, removeLike}) => {

    const { user: { user } } = useTypedSelector(state => state)

    
    return (
        <>
        {
            user && arrayLikes?.includes(user._id!) ?

            <div onClick={() => removeLike(currentElementID, userCreated._id!)} className="heart heart--hide"></div>

            :

            <div onClick={() => addLike(currentElementID)} className="heart heart--click"></div>
        }   
        </>
    )

}

export default Like