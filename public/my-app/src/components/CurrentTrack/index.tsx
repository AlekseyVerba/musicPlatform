import React, { useState } from "react"
import { ITrack } from "../../types/track/"
import { SERVER_API } from "../../config"
import "./index.scss"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import downloadFile from "../../actions/downloadFile";
import Like from "../Like"
import ButtonAddToMe from "../Buttons/ButtonAddToMe"
import ButtonRemoveFromMe from "../Buttons/ButtonRemoveFromMe"
import { Link } from "react-router-dom"

interface IPropsCurrentTrack {
    track: ITrack,
    addLike(idUser: string): void,
    removeLike(idUser: string): void
}

const CurrentTrack: React.FC<IPropsCurrentTrack> = ({ track: { _id, artist, audio, listens, name, picture, text, user: userTrack, likes }, addLike, removeLike }) => {

    const { removeTrack, actionAddActiveTrack, actionStart, actionPause, actionAddLike, actionRemoveLike, actionAddTrackToMe, actionRemoveTrackFromMe } = useActions()
    const { user: { isAuth, user } } = useTypedSelector(state => state)
    const [loadingAddToMeTrack, setLoadingAddToMe] = useState<boolean>(false)

    const typeFile = audio.split(".").pop()

    const handlerAddLike = (currentElementID: string) => {
        if (userTrack._id) {
            actionAddLike(currentElementID, user._id!)
            addLike(user._id!)
        } else {
            alert("Необходимо авторизоваться")
        }

    }

    const handlerRemoveLike = (currentElementID: string, userID: string) => {
        actionRemoveLike(currentElementID, userID)
        removeLike(userID)
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

    return (
        <div className="current-track">
            <div className="current-track__info">
                <div className="current-track__left col-3">
                    <img src={`${SERVER_API}/${picture}`} alt="imgTrack" />
                </div>
                <div className="current-track__right col-4">
                    <h3>
                        <span>Исполнитель - </span>
                        <span>{artist}</span>
                    </h3>
                    <h2>
                        <span>Название трека - </span>
                        <span>{name}</span>
                    </h2>
                    <h5>
                        <span>Прослушиваний: </span>
                        <span>{listens}</span>
                    </h5>
                </div>
                <div className="current-track__like col-1">
                    <div className="current-track__like-count">
                        <div>
                        {
                            likes ?
                                likes.length :
                                null
                        }
                        </div>
                        <Like arrayLikes={likes} currentElementID={_id} userCreated={userTrack} addLike={handlerAddLike} removeLike={handlerRemoveLike} />
                    </div>
                    
                    <div style={{width: "100%"}}>
                        <Link  to={`/users/${userTrack._id}`}>{userTrack.username}</Link>
                    </div>
                </div>
                <div className="col-3">
                    <button style={{ marginBottom: "10px" }} type="button" className="btn btn-success" onClick={() => downloadFile(_id, `${name}.${typeFile}`)}>Скачать</button>
                    {
                        user._id === userTrack._id ?
                            <>
                                <button onClick={() => removeTrack(_id)} style={{ marginBottom: "10px" }} type="button" className="btn btn-danger">Удалить</button>
                            </>
                            :
                            null
                    }

                    {
                        isAuth ?
                            <div>
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
            </div>
            <div className="current-track__text">
                <h3>Текст</h3>
                {
                    text ?
                        <p>{text}</p>
                        :
                        <p>Текста нету</p>
                }
            </div>
        </div>
    )
}

export default CurrentTrack