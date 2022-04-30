import React, { useState } from "react"
import { IAlbum } from "../../types/album"
import { SERVER_API } from "../../config"
import AlbumPNG from "../../assets/album.png"
import { Link } from "react-router-dom"
import Like from "../Like"
import ButtonRemove from "../Buttons/ButtonRemove"
import PlayPNG from "../../assets/play.png"
import "./index.scss"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useActions } from "../../hooks/useActions"
import ButtonAddToMe from "../Buttons/ButtonAddToMe"
import ButtonRemoveFromMe from "../Buttons/ButtonRemoveFromMe"
import { actionGetTrackInAlbum } from "../../actions/actionGetTracksInAlbum"



interface IAlbumProp {
    album: IAlbum
    addLike?(albumID: string, idUser: string): void
    removeLike?(albumID: string, idUser: string): void
}

const Album: React.FC<IAlbumProp> = ({ album: { _id, describe, imageURL, isShowInRecommendation, likes, name, tracks, user: userCreateAlbum }, addLike, removeLike }) => {

    const { user: { user } } = useTypedSelector(state => state)
    const { actionAddLikeToAlbum, actionRemoveLikeFromAlbum, actionRemoveAlbum, actionAddAlbumtoMe, actionRemoveAlbumFromMe, actionAddActiveTrack, actionStart, actionUpdateCurrentList } = useActions()
    const [loadingAddToMe, setLoadingAddToMe] = useState<boolean>(false)


    if (!isShowInRecommendation) {
        return null
    }

    const handlerAddLike = (currentElementID: string) => {
        if (user._id) {
            actionAddLikeToAlbum(currentElementID, user._id!)
            if (addLike) {
                addLike(_id, user._id!)
            }
        } else {
            alert("Необходимо авторизоваться")
        }

    }

    const handlerRemoveLike = (currentElementID: string, userID: string) => {
        actionRemoveLikeFromAlbum(currentElementID, userID)
        if (removeLike) {
            removeLike(_id, user._id!)
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

    const playAlbum = async () => {
        const result = await actionGetTrackInAlbum(_id)
        
        if (result.status) {
            actionStart()
            const firstTrack = result.data[0]
            actionAddActiveTrack( firstTrack, true)

            actionUpdateCurrentList(result.data)
            
        }
    }


    return (
        <div className={`album ${_id}`}>

            <button onClick={playAlbum} className="btn btn-primary album__play col-1" >
                Слушать
            </button>

            <div className="album__img col-2">
                {
                    imageURL ?
                        <img src={`${SERVER_API}/${imageURL}`} alt="album" />
                        :
                        <img src={AlbumPNG} alt="album" />
                }

            </div>
            <div className="album__info-track col-2">
                <Link to={`/albums/${_id}`}>{name}</Link>
                <p>{describe}</p>
                <Link to={`/users/${userCreateAlbum._id}`}>{userCreateAlbum.username}</Link>
            </div>
            <div className="album__info-total col-2">
                <span>Количество трэков: {tracks.length}</span>
                <div className="album__likes">
                    <div className="album__like">{likes.length}</div>
                    <Like arrayLikes={likes} currentElementID={_id} userCreated={user} addLike={handlerAddLike} removeLike={handlerRemoveLike} />
                </div>
            </div>
            <div className="album__controller col-4">
                {
                    user._id ?
                        <>
                            {
                                user.albums.includes(_id) ?

                                    <ButtonRemoveFromMe functionRemove={handlerRemoveAlbumFromMe} loading={loadingAddToMe} text="Удалить альбом из моей музыки" />
                                    :
                                    <ButtonAddToMe functionAdd={handlerAddAlbumToMe} loading={loadingAddToMe} text="Добавить в мои альбомы" />
                            }
                            <>

                            </>

                            {
                                user._id === userCreateAlbum._id ?
                                    <ButtonRemove removeHandler={() => actionRemoveAlbum(_id)} />
                                    :
                                    null
                            }

                            {/* <ButtonAddToMe /> */}
                        </>
                        :
                        null
                }

            </div>
        </div>
    )
}

export default Album