import React, {useEffect, useState} from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import Loader from "../../Loader"
import Track from "../../Track"

const ThirdCreateAlbum: React.FC = () => {


    const { getTracks, actionCleartracks } = useActions()
    const { tracks: { tracks, isMore }, createAlbum: { newAlbum }, filter: {filterSelectValue, searchValue} } = useTypedSelector(state => state)
    const [offset, setOffset] = useState<number>(10)

    const navigator = useNavigate()

    useEffect(() => {
        actionCleartracks()
        getTracks(searchValue, filterSelectValue)
        return function clearItems() {
            actionCleartracks()
        }
    }, [])

    useEffect(() => {
        if (!newAlbum) {
            navigator("/albums/create-album/first")
        }
    }, []) 

    const fetchMoreData = () => {
        console.log(offset)
        getTracks(searchValue, filterSelectValue, offset)
        setOffset(offset + 10)
    };


    return (
        <div className="tracks-list">
        <InfiniteScroll
            dataLength={tracks.length}
            next={fetchMoreData}
            hasMore={isMore}
            loader={<Loader />}
        >
            {tracks.map(track => {
                return <Track key={track._id} currentItems={tracks} currentTrack={track} forAlbum={true} album={newAlbum!}  />
            })}
        </InfiniteScroll>

    </div>
    )
}

export default ThirdCreateAlbum