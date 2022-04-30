import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../Loader"
import Album from "../Album"
import Filter from "../Filter"
import { TypeFilter } from "../../types/filter"

interface IAlbumListProp {
    getAlbums(filterInput: string, filterSelect: string, offset?: number, count?: number): void
}

const AlbumsList: React.FC<IAlbumListProp> = ({ getAlbums }) => {

    const { clearAlbums } = useActions()
    const { albums: { items, isMore }, filter: { filterSelectValue, searchValue } } = useTypedSelector(state => state)
    const [currentOffset, setCurrentOffset] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        clearAlbums()
        setLoading(true)
        const getItems = async () => {
            await getAlbums(searchValue, filterSelectValue)
            setLoading(false)
        }

        getItems()
        return function clearItems() {
            clearAlbums()
            setCurrentOffset(10)
        }
    }, [filterSelectValue])

    const getNewAlbums = async () => {
        getAlbums(searchValue, filterSelectValue, currentOffset)
        setCurrentOffset(currentOffset + 10)
    }

    const getFilter = async (searchValue: string) => {
        setLoading(true)
        clearAlbums()
        await getAlbums(searchValue, filterSelectValue)
        setCurrentOffset(10)
        setLoading(false)
    }

    return (
        <div>
            <Filter getInfo={getFilter} options={
                [
                    { value: TypeFilter.NAME, text: "По названию" },
                    { value: TypeFilter.CREATE, text: "По созданию" },
                    { value: TypeFilter.CREATOR, text: "По пользователю" },
                    { value: TypeFilter.LIKE, text: "По лайкам" }
                ]
            } />
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            items.length !== 0 ?
                                <InfiniteScroll
                                    dataLength={items.length}
                                    hasMore={isMore}
                                    loader={<Loader />}
                                    next={getNewAlbums}
                                >
                                    {
                                        items.map(item => {
                                            return <Album key={item._id} album={item} />
                                        })
                                    }
                                </InfiniteScroll>
                                :
                                <h1>Альбомов не найдено</h1>
                        }
                    </>
            }

        </div>
    )
}

export default AlbumsList