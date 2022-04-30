import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import Loader from "../../components/Loader"
import TrackAndUserComponent from "../../components/TrackAndUser"
import SmallUser from "../../components/SmallUser"
import InfiniteScroll from "react-infinite-scroll-component"

const MyFriendTracks: React.FC = () => {

    const { tracks, isMoreTracksFromFollowing } = useTypedSelector(state => state.tracksFromFollowing)
    const { actionClearTracksFromFollowing, actionGetTrackFromFollowing } = useActions()
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(15)

    useEffect(() => {
        actionClearTracksFromFollowing()
        const get = async () => {
            setLoading(true)
            await actionGetTrackFromFollowing()
            setLoading(false)
        }

        get()

        return function () {
            actionClearTracksFromFollowing()
            setOffset(15)
        }
    }, [])

    const fetchMoreData = () => {
        actionGetTrackFromFollowing(offset)
        setOffset(offset + 15)
    };


    if (loading) return <Loader />

    if (tracks.length === 0) {
        return <h1>Треков не найдено</h1>
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={tracks.length}
                next={fetchMoreData}
                hasMore={isMoreTracksFromFollowing}
                loader={<Loader />}
            >


                {
                    tracks.map((track, i) => {

                        return (
                            <div key={`${i} + ${track[0].user._id}`}>
                                <SmallUser tracks={track} _id={track[0].user._id!} email={track[0].user.email!} imageURL={track[0].user.imageURL!} username={track[0].user.username!} />
                                {
                                    track.map(el => {

                                        return <TrackAndUserComponent key={el._id} info={el} items={track} />
                                    })
                                }
                            </div>
                        )
                    })
                }
            </InfiniteScroll>
        </div>
    )
}

export default MyFriendTracks