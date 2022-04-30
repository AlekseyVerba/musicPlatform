import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import Comment from "../../Comment"
import CommentInput from "../../CommentInput"
import Loader from "../../Loader"

const Comments: React.FC = () => {

    const { pathname } = useLocation()
    const { actionGetCommentsInAlbum, actionClearCommentsInAlbum, actionAddCommentToAlbum, actionRemoveCommentFromAlbum } = useActions()
    const { currentAlbum: { album, comments, isMoreCommentsInAlbum }, user: {isAuth} } = useTypedSelector(state => state)
    const [offset, setOffset] = useState<number>(10)

    useEffect(() => {
        actionGetCommentsInAlbum(album?._id!)

        return function () {
            actionClearCommentsInAlbum()
        }
    }, [pathname])

    const fetchMoreData = () => {
        actionGetCommentsInAlbum(album?._id!, offset)
        setOffset(offset + 10)
    };

    const createComment = async (text: string) => {
        actionAddCommentToAlbum(album?._id!, text)
    }

    // 

    return (
        <div style={{ "margin": "30px 0" }}>
            <div className="comments-list">
                {
                    comments.length !== 0 ?
                    <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchMoreData}
                    hasMore={isMoreCommentsInAlbum}
                    loader={<Loader />}
                >
                    {
                        comments.map(comment => {
                            return <Comment commentInfo={comment} removeComment={() => actionRemoveCommentFromAlbum(comment._id)} key={comment._id} />
                        })

                    }
                </InfiniteScroll >
                :
                <h2>Комментариев ещё нету</h2>
                }

                <div>
                    {
                        isAuth ?
                            <CommentInput submitInput={createComment} trackID={album?._id!} />
                            :
                            <h3 style={{ marginTop: "30px", marginBottom: "30px" }}>Что бы оставить комментарий, нужно авторизоваться</h3>
                    }
                </div>

            </div>
        </div>
    )
}

export default Comments