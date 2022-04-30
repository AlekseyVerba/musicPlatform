import React, { useState } from "react";
import { ITrack } from "../../types/track"
import { SERVER_API } from "../../config"
import { Link } from "react-router-dom"
import "./index.scss"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import downloadFile from "../../actions/downloadFile";
import playImage from "../../assets/play.png"
import pauseImage from "../../assets/pause.png"
import { fmtMSS } from "../../helpFunctions/index"
import Like from "../Like";
import ButtonAddToMe from "../Buttons/ButtonAddToMe";
import ButtonRemove from "../Buttons/ButtonRemove";
import ButtonRemoveFromMe from "../Buttons/ButtonRemoveFromMe"
import ButtonAddToAlbum from "../Buttons/ButtonAddToAlbum"
import ButtonRemoveFromAlbum from "../Buttons/ButtonRemoveFromAlbum"
import { IAlbumTracksString, IAlbum } from "../../types/album"

interface ITrackProp {
    currentItems: ITrack[],
    currentTrack: ITrack,
    forAlbum?: boolean
    album?: IAlbumTracksString,
    addLike?(trackID: string, idUser: string): void
    removeLike?(trackID: string, idUser: string): void
}

const Track: React.FC<ITrackProp> = ({ currentTrack: { _id, artist, audio, listens, name, picture, text, user: userTrack, likes }, currentItems, forAlbum = false, album, addLike, removeLike }) => {

    const { user: { user, isAuth, }, player: { activeTrack, durationTimeTrack } } = useTypedSelector(state => state)
    const { removeTrack, actionAddActiveTrack, actionStart, actionPause, actionAddLike, actionRemoveLike, actionUpdateCurrentList, actionAddTrackToMe, actionRemoveTrackFromMe, actionAddTrackToAlbum, actionRemoveTrackFromAlbum } = useActions()
    const typeFile = audio.split(".").pop()
    const [loadingAddToMeTrack, setLoadingAddToMe] = useState<boolean>(false)
    const [loadingAddTrackToAlbum, setLoadingAddTrackToAlbum] = useState<boolean>(false)


    const startTrack = () => {
        actionAddActiveTrack({ _id, artist, audio, listens, name, picture, text, user }, true)
        actionStart()
        actionUpdateCurrentList(currentItems)
    }

    const pauseTrack = () => {
        actionAddActiveTrack(null)
        actionPause()
    }

    const handlerAddLike = (currentElementID: string) => {
        if (user._id) {
            actionAddLike(currentElementID, user._id!)
            if (addLike) {
                addLike(_id, user._id!)
            }
        } else {
            alert("Необходимо авторизоваться")
        }

    }

    const handlerRemoveLike = (currentElementID: string, userID: string) => {
        actionRemoveLike(currentElementID, userID)
        if (removeLike) {
            removeLike(_id, user._id!)
        }
    }

    const handlerAddTrackToMe = async () => {
        setLoadingAddToMe(true)
        await actionAddTrackToMe(_id)
        setLoadingAddToMe(false)
    }

    const handlerRemoveTrackFromMe = async () => {
        setLoadingAddToMe(true)
        await actionRemoveTrackFromMe(_id)
        setLoadingAddToMe(false)
    }

    const handlerAddTrackToAlbum = async () => {
        setLoadingAddTrackToAlbum(true)
        await actionAddTrackToAlbum(album?._id!, _id)
        setLoadingAddTrackToAlbum(false)
    }

    const handlerRemoveTrackFromAlbum = async () => {
        setLoadingAddTrackToAlbum(true)
        await actionRemoveTrackFromAlbum(album?._id!, _id)
        setLoadingAddTrackToAlbum(false)
    }



    return (
        <div className="track">
            {
                activeTrack && activeTrack?._id === _id ?
                    <button className="track__controller track__pause col-1" onClick={pauseTrack}>
                        <img src={pauseImage} alt="pause" />
                    </button>
                    :
                    <button className="track__controller track__play col-1" onClick={startTrack}>
                        <img src={playImage} alt="play" />
                    </button>
            }

            <img className="track__img col-1" alt="img" src={`${SERVER_API}/${picture}`} />
            <div className="track__info col-4">
                <Link className="track__name" to={`/tracks/${_id}`}>{name}</Link>
                <h6 className="track__artist">{artist}</h6>
                <div>
                    <span>Прослушиваний: </span>
                    <span>{listens}</span>
                </div>
            </div>



            <div className="track__right-info col-2">
                {
                    _id === activeTrack?._id ?
                        <div className="track__time">
                            {fmtMSS(Math.ceil(durationTimeTrack))}
                        </div>
                        :

                        null
                }

                <div className="track__user">
                    <Link to={`/users/${userTrack._id}`}>{userTrack.username}</Link>
                    {
                        !forAlbum ?
                            <div className="track__likes">
                                <div className="count-likes">
                                    {
                                        likes ?
                                            likes.length
                                            :
                                            null
                                    }
                                </div>
                                <Like currentElementID={_id} arrayLikes={likes} userCreated={user} addLike={handlerAddLike} removeLike={handlerRemoveLike} />
                            </div>
                            :
                            null
                    }


                </div>
            </div>

            {
                !forAlbum ?
                    <div className="track__actions col-3">

                        <button style={{ marginBottom: "10px" }} type="button" className="btn btn-success" onClick={() => downloadFile(_id, `${name}.${typeFile}`)}>Скачать</button>
                        {
                            user._id === userTrack._id ?
                                <>
                                    <ButtonRemove removeHandler={() => removeTrack(_id)} />
                                </>
                                :
                                null
                        }

                        {
                            isAuth ?
                                <div style={{ position: "relative" }}>
                                    {
                                        !user.tracks.includes(_id) ?
                                            <ButtonAddToMe functionAdd={handlerAddTrackToMe} text="Добавить в мои песни" loading={loadingAddToMeTrack} />
                                            :
                                            <ButtonRemoveFromMe functionRemove={handlerRemoveTrackFromMe} text="Удалить из моих песен" loading={loadingAddToMeTrack} />
                                    }
                                </div>
                                :
                                null

                        }

                    </div>

                    :

                    <div className="track__actions col-3">
                        {
                            album?.user._id === user._id ?
                                <div style={{ position: "relative" }}>
                                    {

                                        album && album?.tracks.includes(_id) ?
                                            <ButtonRemoveFromAlbum loading={loadingAddTrackToAlbum} removeHandler={handlerRemoveTrackFromAlbum} />
                                            :
                                            <ButtonAddToAlbum loading={loadingAddTrackToAlbum} functionAdd={handlerAddTrackToAlbum} />
                                    }


                                </div>
                                :

                                null
                        }


                    </div>
            }


        </div>
    )
}

export default Track