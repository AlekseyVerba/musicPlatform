import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { ITrack } from "../../../types/track"
import Loader from "../../Loader"
import Track from "../../Track"
import { actionGetTracksFromUser } from "../../../actions/actionGetTracksFromUser"

const TracksInProfile: React.FC = () => {

    const { pathname } = useLocation()
    const [offset, setOffset] = useState<number>(10)
    const { profile } = useTypedSelector(state => state.currentProfile)
    const [loading, setLoading] = useState<boolean>(true)
    const [tracksList, setTracksList] = useState<ITrack[]>([])
    const [error, serError] = useState<string>("")
    const [isMore, setIsMore] = useState<boolean>(true)

    useEffect(() => {

        const get = async () => {
            setLoading(true)
            serError("")
            const result = await actionGetTracksFromUser(profile?._id!)
            if (result.status) {
                setTracksList(result.data)
            } else {
                serError(result.data)
            }
            setLoading(false)
        }

        get()

        return function clearItems() {
            setTracksList([])
            setOffset(10)
        }
    }, [pathname])


    const addLike = (trackID: string, idUser: string) => {
        setTracksList([...tracksList.map(track => {
            if (track._id === trackID) {
                track.likes?.push(idUser)
            }
            return track
        })])
    }

    const removeLike = (trackID: string, idUser: string) => {
        setTracksList([...tracksList.map(track => {
            if (track._id === trackID) {
                track.likes = track.likes?.filter(like => like !== idUser)
            }
            return track
        })])
    }

    const fetchMoreData = async () => {
        const result = await actionGetTracksFromUser(profile?._id!, offset)
        if (result.status) {
            if (result.data && result.data.length) {
                setTracksList([...tracksList, ...result.data])
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
        <div style={{ "margin": "30px 0" }}>
            {
                tracksList.length ?
                    <InfiniteScroll
                        dataLength={tracksList.length}
                        next={fetchMoreData}
                        hasMore={isMore}
                        loader={<Loader />}
                    >
                        {tracksList.map(track => {
                            return <Track key={track._id} currentItems={tracksList} currentTrack={track} forAlbum={false} addLike={addLike} removeLike={removeLike} />
                        })}
                    </InfiniteScroll>
                    :
                    <h2>Данный пользователь не имеет песен</h2>
            }
        </div>
    )
}


export default TracksInProfile