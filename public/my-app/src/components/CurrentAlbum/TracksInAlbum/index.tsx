import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IAlbumTracksString } from "../../../types/album"
import Loader from "../../Loader"
import Track from "../../Track"

const TracksInAlbum: React.FC = () => {

    const { pathname } = useLocation()
    const { actionGetTracksInAlbum, actionClearTracksInAlbum } = useActions()
    const { currentTracks, album, isMoreTracksInAlbum } = useTypedSelector(state => state.currentAlbum)
    const [offset, setOffset] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
       
        setLoading(true)
        const get = async () => {
            actionGetTracksInAlbum(album?._id!)
            setLoading(false)
        }
        get()

        return function () {
            actionClearTracksInAlbum()
            setOffset(10)
        }
    }, [pathname])


    const fetchMoreData = () => {
        actionGetTracksInAlbum(album?._id!, offset)
        setOffset(offset + 10)
    };


    return (
        <div style={{ "margin": "30px 0" }}>
            {
                currentTracks.length !== 0 ?
                    <InfiniteScroll
                        dataLength={currentTracks.length}
                        next={fetchMoreData}
                        hasMore={isMoreTracksInAlbum}
                        loader={<Loader />}
                    >
                        {currentTracks.map(track => {
                            return <Track key={track._id} currentItems={currentTracks} currentTrack={track} album={album as IAlbumTracksString} forAlbum={true} />
                        })}
                    </InfiniteScroll>
                    :
                    <h2>В альбоме ещё нету треков</h2>
            }
        </div>
    )
}


export default TracksInAlbum