import React, { useEffect } from "react"
import AlbumsList from "../../components/AlbumsList"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Link } from "react-router-dom"
import { useActions } from "../../hooks/useActions"

const AlbumsPage: React.FC = () => {

    const { user: { isAuth } } = useTypedSelector(state => state)
    const { getAlbums } = useActions()

    return (
        <div className="albums">
            <h2 className="albums__title">Все альбомы</h2>
            {
                isAuth ?
                    <div className="btn-load__wrapper">
                        <Link to="/albums/create-album/first" className="btn btn-primary btn-lg btn-load">Загрузить альбом</Link>
                    </div>
                    : null
            }
            <AlbumsList getAlbums={getAlbums} />
        </div>
    )
}

export default AlbumsPage