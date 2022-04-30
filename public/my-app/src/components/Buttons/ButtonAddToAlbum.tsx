import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonAddToAlbumProps {
    functionAdd(): void
    loading: boolean
}

const ButtonAddToAlbum: React.FC<IButtonAddToAlbumProps> = ({functionAdd, loading}) => {
    return (
        <div style={{ position: "relative" }}>
            <button type="button" onClick={functionAdd} disabled={loading} className="btn btn-primary">Добавить в альбом</button>
            {loading && <SmallLoader />}
        </div>
    )
}

export default ButtonAddToAlbum