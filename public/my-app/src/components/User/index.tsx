import React, { useState } from "react"
import { IUser } from "../../types/user/"
import { SERVER_API } from "../../config"
import profilePNG from "../../assets/profile.png"
import { Link } from "react-router-dom"
import ButtonFollow from "../Buttons/ButtonFollow"
import ButtonUnfollow from "../Buttons/ButtonUnfollow"
import "./index.scss"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"


interface IUserProp {
    item: IUser
}

const User: React.FC<IUserProp> = ({ item: { _id, email, imageURL, username, followers, following, tracks, albums } }) => {

    const { user: { user: currentUser } } = useTypedSelector(state => state)
    const { actionFollow, actionUnfollow } = useActions()
    const [loading, setLoading] = useState<boolean>(false)

    if (currentUser._id === _id) {
        return null
    }

    const handlerFollow = async () => {
        setLoading(true)
        await actionFollow(_id!, currentUser._id!)
        setLoading(false)
    }

    const handlerUnfollow = async () => {
        setLoading(true)
        await actionUnfollow(_id!, currentUser._id!)
        setLoading(false)
    }


    return (
        <div className="user">
            <div className="user__image col-2">
                <div className="user__username">
                    <Link to={`/users/${_id}`}>{username}</Link>
                </div>
                {
                    imageURL ?
                        <img src={`${SERVER_API}/${imageURL}`} alt="avatar" />
                        :
                        <img src={profilePNG} alt="avatar" />
                }



            </div>
            <div className="user__info col-6">
                
                <div>Количество подписок: {following.length}</div>
                <div>Количество подписчиков: {followers.length}</div>
                <div>Количество песен: {tracks.length}</div>
                <div>Количество альбомов: {albums.length}</div>
            </div>
            <div className="user__controller col-2">
                {
                    currentUser._id ?
                        <>
                            {
                                currentUser.following.includes(_id!) ?
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

export default User