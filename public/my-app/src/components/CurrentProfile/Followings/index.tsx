import React, { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { IUser } from "../../../types/user/"
import { actionGetFollowersOrFollowings } from "../../../actions/actionGetFollowersOrFollowings"
import ShortUser from "../../ShortUser"
import Loader from "../../Loader"
import InfiniteScroll from "react-infinite-scroll-component"


const Followers: React.FC = () => {

    const { profile } = useTypedSelector(state => state.currentProfile)
    const [loading, setLoading] = useState<boolean>(true)
    const [followingList, setfollowingsList] = useState<IUser[]>([])
    const [error, serError] = useState<string>("")
    const [offset, setOffset] = useState<number>(10)
    const [isMore, setIsMore] = useState<boolean>(true)

    useEffect(() => {

        const get = async () => {
            setLoading(true)
            serError("")
            const result = await actionGetFollowersOrFollowings("followings", profile?._id!)
            if (result.status) {
                setfollowingsList(result.data)
            } else {
                serError(result.data)
            }
            setLoading(false)
        }

        get()

        return function clearItems() {
            setfollowingsList([])
            setOffset(10)
        }
    }, [profile])


    const fetchMoreData = async () => {
        const result = await actionGetFollowersOrFollowings("followings",profile?._id!, offset)
        console.log(result)
        if (result.status) {
            if (result.data && result.data.length) {
                setfollowingsList([...followingList, ...result.data])
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
        <div style={{marginTop: "30px"}} className="following">
            {
                followingList.length ?
                <InfiniteScroll
                        dataLength={followingList.length}
                        next={fetchMoreData}
                        hasMore={isMore}
                        loader={<Loader />}
                    >
                    {
                        followingList.map(following => <ShortUser key={following._id} user={following} typeComponents="followings" />)
                    }
                </InfiniteScroll>
                :
                <h2>Подписок нету</h2>
            }
            
        </div>
    )
}

export default Followers