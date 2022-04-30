import React, { useEffect, useState } from "react"
import { useParams, Link, Outlet, useLocation } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import CurrentAlbumComponent from "../../components/CurrentAlbum"
import Loader from "../../components/Loader"
import "./index.scss"


const CurrentAlbum: React.FC = () => {

    const { albumID } = useParams()
    const { actionGetCurrentAlbum } = useActions()
    const { currentAlbum: { album }, user: { user } } = useTypedSelector(state => state)
    const { pathname } = useLocation()
    const [load, setLoad] = useState<boolean>(true)

    useEffect(() => {
        async function getData() {
            setLoad(true)
            await actionGetCurrentAlbum(albumID!)
            setLoad(false)
        }
        getData()
    }, [albumID])

    if (load) {
        return <Loader />
    }

    if (!album) {
        return <h1>Альбом не найден</h1>
    }

    return (
        <div className="current-album-page">
            <CurrentAlbumComponent album={album!} />
            <div className="current-album-page__controller">
                <Link to={`/albums/${albumID}/tracks`} className={pathname.indexOf("/tracks") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Песни в альбоме</Link>
                {
                    album.user._id === user._id ?
                        <>
                            <Link to={`/albums/${albumID}/add-from-all-tracks`} className={pathname.indexOf("add-from-all-tracks") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Добавить песни из общего списка</Link>
                            <Link to={`/albums/${albumID}/add-from-my-tracks`} className={pathname.indexOf("/add-from-my-tracks") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Добавить песни из моих песен</Link>
                        </>
                        :

                        null

                }
                <Link to={`/albums/${albumID}/comments`} className={pathname.indexOf("/comments") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Комментарии</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default CurrentAlbum