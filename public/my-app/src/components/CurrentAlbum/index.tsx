import React, { useState } from "react"
import { IAlbum } from "../../types/album/"
import { SERVER_API } from "../../config"
import Like from "../Like"
import "./index.scss"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import ButtonAddToMe from "../Buttons/ButtonAddToMe"
import ButtonRemoveFromMe from "../Buttons/ButtonRemoveFromMe"
import ButtonRemove from "../Buttons/ButtonRemove"

interface ICurrentAlbumProp {
    album: IAlbum
}

const CurrentAlbumComponent: React.FC<ICurrentAlbumProp> = ({ album: { _id, describe, imageURL, isShowInRecommendation, likes, name, tracks, user: userAlbum } }) => {

    const { user: { user } } = useTypedSelector(state => state)
    const { actionRemoveAlbum, actionAddLikeToAlbum, actionRemoveLikeFromAlbum, actionAddAlbumtoMe, actionRemoveAlbumFromMe, actionAddLikeToCurrentAlbum } = useActions()
    const [loadingAddToMe, setLoadingAddToMe] = useState<boolean>(false)


    const handlerAddLike = (currentElementID: string) => {
        if (userAlbum._id) {
            actionAddLikeToAlbum(currentElementID, user._id!)
        } else {
            alert("Необходимо авторизоваться")
        }

    }

    const handlerAddAlbumToMe = async () => {
        setLoadingAddToMe(true)
        await actionAddAlbumtoMe(_id)
        setLoadingAddToMe(false)
    }

    const handlerRemoveAlbumFromMe = async () => {
        setLoadingAddToMe(true)
        await actionRemoveAlbumFromMe(_id)
        setLoadingAddToMe(false)
    }

    return (
        <div className="current-album">
            <div className="current-album__img col-2">
                <img src={`${SERVER_API}/${imageURL}`} alt="album_avatar" />
            </div>
            <div className="current-album__info col-4">
                <h1>Название: {name}</h1>
                <div>Описание: {describe ? describe : "Описания нету"}</div>
            </div>
            <div className="current-track__like col-1">
                <div className="current-track__like-count">
                    {
                        likes ?
                            likes.length :
                            null
                    }
                </div>
                <Like arrayLikes={likes} currentElementID={_id} userCreated={userAlbum} addLike={handlerAddLike} removeLike={actionRemoveLikeFromAlbum} />
            </div>
            <div className="col-4 current-album__actions">

                {
                    user._id ?
                        <>
                            {
                                user.albums.includes(_id) ?

                                    <ButtonRemoveFromMe functionRemove={handlerRemoveAlbumFromMe} loading={loadingAddToMe} text="Удалить альбом из моей музыки" />
                                    :
                                    <ButtonAddToMe functionAdd={handlerAddAlbumToMe} loading={loadingAddToMe} text="Добавить в мои альбомы" />
                            }

                            {
                                user._id === userAlbum._id ?
                                    <ButtonRemove removeHandler={() => actionRemoveAlbum(_id)} />
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

export default CurrentAlbumComponent