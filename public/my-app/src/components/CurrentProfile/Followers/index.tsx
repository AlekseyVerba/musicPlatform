import React, { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IUser } from "../../../types/user/"
import { actionGetFollowersOrFollowings } from "../../../actions/actionGetFollowersOrFollowings"
import ShortUser from "../../ShortUser"
import "./index.scss"
import Loader from "../../Loader"
import InfiniteScroll from "react-infinite-scroll-component"


const Followers: React.FC = () => {

    const { profile } = useTypedSelector(state => state.currentProfile)
    const [loading, setLoading] = useState<boolean>(true)
    const [followersList, setFollowersList] = useState<IUser[]>([])
    const [error, serError] = useState<string>("")
    const [offset, setOffset] = useState<number>(10)
    const [isMore, setIsMore] = useState<boolean>(true)

    useEffect(() => {

        const get = async () => {
            setLoading(true)
            serError("")
            const result = await actionGetFollowersOrFollowings("followers", profile?._id!)
            if (result.status) {
                setFollowersList(result.data)
            } else {
                serError(result.data)
            }
            setLoading(false)
        }

        get()

        return function clearItems() {
            setFollowersList([])
            setOffset(10)
        }

    }, [profile])

    const fetchMoreData = async () => {
        const result = await actionGetFollowersOrFollowings("followers",profile?._id!, offset)
        console.log(result)
        if (result.status) {
            if (result.data && result.data.length) {
                setFollowersList([...followersList, ...result.data])
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
        <div style={{marginTop: "30px"}} className="followers">
            {
                followersList.length ?
                <InfiniteScroll
                        dataLength={followersList.length}
                        next={fetchMoreData}
                        hasMore={isMore}
                        loader={<Loader />}
                    >
                    {
                        followersList.map(follower => <ShortUser key={follower._id} user={follower} />)
                    }
                </InfiniteScroll>
                :
                <h2>Подписчиков нету</h2>
            }
            
        </div>
    )
}

export default Followers