import React, { useState } from "react"
import TracksList from "../../components/TrackList"
import { useActions } from "../../hooks/useActions"
import "./index.scss"
import AlbumsList from "../../components/AlbumsList"

const MyTracks: React.FC = () => {

    const [currentBlock, setCurrentBlock] = useState<"tracks" | "albums">("tracks")
    const {getMyTracks, actionCleartracks, getMyAlbums} = useActions()

    return (
        <div className="my-tracks">
            <div className="my-tracks__buttons">
                <button 
                    className={currentBlock === "tracks" ? "btn btn-lg btn-primary block-active" : "btn btn-lg btn-primary"} 
                    type="button"
                    disabled={currentBlock === "tracks" ? true : false}
                    onClick={() => setCurrentBlock("tracks")}
                >
                    Песни
                </button>
                <button 
                     className={currentBlock === "albums" ? "btn btn-lg btn-primary block-active" : "btn btn-lg btn-primary"} 
                     disabled={currentBlock === "albums" ? true : false}
                    onClick={() => setCurrentBlock("albums")}
                    type="button"
                >
                Альбомы
                </button>
            </div>

            {
                currentBlock === "tracks" ?
                <TracksList getTracks={getMyTracks} clearTracks={actionCleartracks} /> :
                <AlbumsList getAlbums={getMyAlbums} />
            }
        </div>
    )
}

export default MyTracks