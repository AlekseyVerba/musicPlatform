import React, { useEffect, useState, useCallback } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Track from "../Track"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../Loader"
import Filter from "../Filter"
import "./index.scss"
import { TypeFilter } from "../../types/filter"

interface IPropsTrackList {
    getTracks(filterInput: string, filterSelect: string, offset?: number, count?: number): void
    clearTracks(): void
}

const TracksList: React.FC<IPropsTrackList> = ({ getTracks, clearTracks }) => {

    const { tracks: { tracks, isMore }, filter: { filterSelectValue, searchValue } } = useTypedSelector(state => state)
    const [offset, setOffset] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        clearTracks()
        setLoading(true)
        const get = async () => {
            await getTracks(searchValue, filterSelectValue)
            setLoading(false)
        }
        get()
        return function clearItems() {
            clearTracks()
            setOffset(10)
        }
    }, [filterSelectValue])

    const fetchMoreData = () => {
        getTracks(searchValue, filterSelectValue, offset)
        setOffset(offset + 10)
    };

    const getFilter = async (searchValue: string) => {
        setLoading(true)
        clearTracks()
        await getTracks(searchValue, filterSelectValue)
        setLoading(false)
        setOffset(10)
    }



    return (
        <div className="tracks-list">
            <Filter getInfo={getFilter} options={
                [
                    { value: TypeFilter.NAME, text: "По названию" },
                    { value: TypeFilter.CREATE, text: "По созданию" },
                    { value: TypeFilter.CREATOR, text: "По пользователю" },
                    { value: TypeFilter.LIKE, text: "По лайкам" },
                    { value: TypeFilter.LISTEN, text: "По прослушиваниям" }
                ]
            } />
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            tracks.length !== 0 ?

                                <InfiniteScroll
                                    dataLength={tracks.length}
                                    next={fetchMoreData}
                                    hasMore={isMore}
                                    loader={<Loader />}
                                >
                                    {tracks.map(track => {
                                        return <Track key={track._id} currentItems={tracks} currentTrack={track} />
                                    })}
                                </InfiniteScroll>
                                :
                                <h1>Треков не найдено</h1>
                        }
                    </>

            }


        </div>
    )

}

export default TracksList