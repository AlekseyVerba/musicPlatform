import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import Loader from "../../Loader"
import Track from "../../Track"
import { IAlbumTracksString } from "../../../types/album"
import { useLocation } from "react-router-dom"

const AddTracksFromAll: React.FC = () => {

    const { actionGetTracksFromAll, actionClearTrackForAlbum, actionGetFromMyTracks } = useActions()
    const { currentAlbum: { findTracks, isMoreCurrentAlbum, album }, user: { user: { _id } } } = useTypedSelector(state => state)
    const [offset, setOffset] = useState<number>(10)
    const { pathname } = useLocation()
    const isFromAll = pathname.indexOf("add-from-all-tracks") !== -1


    useEffect(() => {

        if (isFromAll) {
            actionGetTracksFromAll()
        } else {
            actionGetFromMyTracks(_id!)
        }


        return function () {
            actionClearTrackForAlbum()
            setOffset(10)
        }
    }, [pathname])



    const fetchMoreData = () => {
        if (isFromAll) {
            actionGetTracksFromAll(offset)
        } else {
            actionGetFromMyTracks(_id!, offset)
        }

        setOffset(offset + 10)
    };

    return (
        <div style={{ "margin": "30px 0" }}>
            {
                findTracks.length !== 0 ?
                    <InfiniteScroll
                        dataLength={findTracks.length}
                        next={fetchMoreData}
                        hasMore={isMoreCurrentAlbum}
                        loader={<Loader />}
                    >
                        {findTracks.map(track => {
                            return <Track key={track._id} currentItems={findTracks} currentTrack={track} album={album as IAlbumTracksString} forAlbum={true} />
                        })}
                    </InfiniteScroll>
                    :
                    <h2>Треков нету</h2>
            }
        </div>
    )
}

export default AddTracksFromAll