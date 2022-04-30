import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "../Loader"
import User from "../User"
import Filter from "../Filter"
import { TypeFilter } from "../../types/filter"

const UsersList: React.FC = () => {

    const { actionGetUserList, actionClearUserList } = useActions()
    const { userList: { users, isMoreUserList }, filter: { filterSelectValue, searchValue } } = useTypedSelector(state => state)
    const [currentOffset, setCurrentOffset] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        actionClearUserList()
        setLoading(true)
        const get = async () => {
            await actionGetUserList(searchValue, filterSelectValue)
            setLoading(false)
        }

        get()

        return function () {
            actionClearUserList()
            setCurrentOffset(10)

        }
    }, [filterSelectValue])

    const getNextUsers = () => {
        actionGetUserList(searchValue, filterSelectValue, currentOffset)
        setCurrentOffset(currentOffset + 10)
    }

    const getFilter = async (searchValue: string) => {
        setLoading(true)
        actionClearUserList()
        await actionGetUserList(searchValue, filterSelectValue)
        setCurrentOffset(10)
        setLoading(false)
    }

    return (
        <div>
            <Filter getInfo={getFilter} options={
                [
                    { value: TypeFilter.CREATE, text: "По созданию" },
                    { value: TypeFilter.CREATOR, text: "По пользователю" },
                    { value: TypeFilter.FOLLOWERS, text: "По подписчикам" },
                    { value: TypeFilter.FOLLOWINGS, text: "По подпискам" }
                ]
            } />

            {
                loading ?
                    <Loader />
                    :
                    <>
                        {
                            users.length !== 0 ?
                                <InfiniteScroll
                                    dataLength={users.length}
                                    hasMore={isMoreUserList}
                                    loader={<Loader />}
                                    next={getNextUsers}

                                >

                                    {
                                        users.map(item => {
                                            return <User item={item} key={item._id} />
                                        })
                                    }

                                </InfiniteScroll>
                                :
                                <h1>Пользователи не существуют</h1>
                        }
                    </>
            }


        </div>
    )
}

export default UsersList