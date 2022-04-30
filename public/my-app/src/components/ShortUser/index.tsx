import React, { useState } from "react"
import profilePNG from "../../assets/profile.png"
import { IUser } from "../../types/user/"
import { SERVER_API } from "../../config"
import "./index.scss"
import { Link } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import ButtonUnfollow from "../Buttons/ButtonUnfollow"
import ButtonFollow from "../Buttons/ButtonFollow"
import { useActions } from "../../hooks/useActions"

interface IShortUser {
    user: IUser,
    typeComponents?: "followers" | "followings"
}

const ShortUser: React.FC<IShortUser> = ({ user: { _id, username, imageURL }, typeComponents = "followers" }) => {

    const { currentProfile: { profile }, user: { user: { _id: _idCurrentUser, following } } } = useTypedSelector(state => state)

    const { actionFollow, actionUnfollow } = useActions()
    const [loading, setLoading] = useState<boolean>(false)

    const handlerFollow = async () => {
        setLoading(true)
        await actionFollow(_id!,_idCurrentUser!)
        setLoading(false)
    }

    const handlerUnfollow = async () => {
        setLoading(true)
        await actionUnfollow(_id!, _idCurrentUser!)
        setLoading(false)
    }

    return (
        <div className="short-user">
            <div className="short-user__image">
                {
                    imageURL ?
                        <img src={`${SERVER_API}/${imageURL}`} alt="avatar" />
                        :
                        <img src={profilePNG} alt="avatar" />
                }
            </div>
            <div className="short-user__link col-12">
                <Link to={`/users/${_id}`}>{username}</Link><br></br>
                {
                    profile?._id === _idCurrentUser && typeComponents === "followings" ?
                        <>
                            {
                                following.includes(_id!) ?
                                    <ButtonUnfollow functionUnfollow={handlerUnfollow} loading={loading} />
                                    :
                                    <ButtonFollow functionFollow={handlerFollow} loading={loading} />
                            }


                        </>
                        :

                        null
                }
            </div>
        </div>
    )
}

export default ShortUser