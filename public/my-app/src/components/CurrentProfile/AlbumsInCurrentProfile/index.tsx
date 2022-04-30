import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IAlbum } from "../../../types/album"
import Loader from "../../Loader"
import Album from "../../Album"
import { actionGetAlbumsFromUser } from "../../../actions/actionGetAlbumsFromUser"

const AlbumsInCurrentProfile: React.FC = () => {

    const {pathname} = useLocation()
    const [offset, setOffset] = useState<number>(10)
    const { profile } = useTypedSelector(state => state.currentProfile)
    const [loading, setLoading] = useState<boolean>(true)
    const [albumsList, setAlbumsList] = useState<IAlbum[]>([])
    const [error, serError] = useState<string>("")
    const [isMore, setIsMore] = useState<boolean>(true)

    useEffect(() => {

        const get = async () => {
            setLoading(true)
            serError("")
            const result = await actionGetAlbumsFromUser(profile?._id!)
            if (result.status) {
                setAlbumsList(result.data)
            } else {
                serError(result.data)
            }
            setLoading(false)
        }

        get()

    }, [pathname])

    const addLike = (albumID: string, idUser: string) => {
        setAlbumsList([...albumsList.map(album => {
            if (album._id === albumID) {
                album.likes?.push(idUser)
            }
            return album
        })])
    }

    const removeLike = (albumID: string, idUser: string) => {
        setAlbumsList([...albumsList.map(album => {
            if (album._id === albumID) {
                album.likes = album.likes?.filter(like => like !== idUser)
            }
            return album
        })])
    }

    
    const fetchMoreData = async () => {
        const result = await actionGetAlbumsFromUser(profile?._id!, offset)
        if (result.status) {
            if (result.data && result.data.length) {
                setAlbumsList([...albumsList, ...result.data])
                setOffset(offset + 10)
            } else {
                setIsMore(false)
            }
        } else {
            setIsMore(false)
        }
    }


    if (loading) return <Loader />

    if (error) return <h1>{error}</h1>

    return (
        <div style={{"margin": "30px 0"}}>
           {
               albumsList.length ?
               <InfiniteScroll
                        dataLength={albumsList.length}
                        next={fetchMoreData}
                        hasMore={isMore}
                        loader={<Loader />}
                    >
                {albumsList.map(album => {
                    return <Album key={album._id} album={album} addLike={addLike} removeLike={removeLike}  />
                })}
               </InfiniteScroll>
               :
               <h2>Данный пользователь не имеет альбомов</h2>
           }
        </div>
    )
}


export default AlbumsInCurrentProfile