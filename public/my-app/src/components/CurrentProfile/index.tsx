import React, { useState } from "react";
import { IUser } from "../../types/user/"
import { SERVER_API } from "../../config"
import profilePNG from "../../assets/profile.png"
import { Link } from "react-router-dom";
import ButtonUnfollow from "../Buttons/ButtonUnfollow"
import ButtonFollow from "../Buttons/ButtonFollow"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./index.scss"

export interface IPropsCurrentProfile {
    user: IUser
}

const CurrentProfileComponent: React.FC<IPropsCurrentProfile> = ({ user }) => {


    const { user: { user: currentUser } } = useTypedSelector(state => state)
    const [loadingFollow, setLoadingFollow] = useState<boolean>(false)
    const { actionUnfollow, actionFollow, actionChangeAvatar } = useActions()
    const [canChangeAvatar, setCanChangeAvatar] = useState<boolean>(false)

    const handlerUnfollow = async () => {
        setLoadingFollow(true)
        await actionUnfollow(user._id!, currentUser._id!)
        setLoadingFollow(false)
    }

    const handlerFollow = async () => {
        setLoadingFollow(true)
        await actionFollow(user._id!, currentUser._id!)
        setLoadingFollow(false)
    }

    const mouseOver = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setCanChangeAvatar(true)
    }

    const mouseOut = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setCanChangeAvatar(false)

    }

    const handlerChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files![0]
        actionChangeAvatar(file)
    }

    // debugger
    console.log("aaaa")
    console.log(user.imageURL)
    console.log(currentUser._id === user._id)


    return (
        <div className="current-profile">
            <div onMouseEnter={mouseOver} onMouseLeave={mouseOut} className="current-profile__img col-2">
                {
                    user.imageURL || (currentUser._id === user._id && currentUser.imageURL) ?
                        <img src={`${SERVER_API}/${currentUser._id === user._id ? currentUser.imageURL : user.imageURL}`} alt="avatar a" />
                        :
                        <img src={profilePNG} alt="avatar f" />
                }
                {
                    canChangeAvatar && currentUser._id === user._id ?
                        <label className="current-profile__img-change">
                            <span>Изменить фото</span>
                            <input onChange={handlerChangeAvatar} type="file" accept="image/*" style={{display: "none"}} />
                        </label>
                        :
                        null
                }

            </div>
            <div className="current-profile__info col-6">
                <h1>{user.username}</h1>
                <div className="current-profile__info-down">
                    <div className="current-profile__info-down-left">
                        <Link to={"follewers"}>Подписчики: {user.followers.length}</Link><br />
                        <Link to={"following"}>Подписки: {user.following.length}</Link>
                    </div>
                    <div className="current-profile__info-down-right">
                        <h4>Песни: {user.tracks.length}</h4>
                        <h4>Альбомы: {user.albums.length}</h4>
                    </div>
                </div>


            </div>
            <div className="col-3">
                {
                    currentUser._id !== user._id ?
                        <>
                            {
                                currentUser._id ?
                                    <>
                                        {
                                            currentUser.following.includes(user._id!) ?
                                                <ButtonUnfollow functionUnfollow={handlerUnfollow} loading={loadingFollow} />
                                                :
                                                <ButtonFollow functionFollow={handlerFollow} loading={loadingFollow} />
                                        }
                                    </>

                                    :

                                    null
                            }
                        </>
                        :

                        null
                }



            </div>
        </div>
    )
}

export default CurrentProfileComponent