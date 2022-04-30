import React from "react"
import "./index.scss"
import Comment from "../Comment"
import CommentInput from "../CommentInput"
import { ICommentTrack } from "../../types/comment"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { actionRemoveComment } from "../../actions/actionRemoveComment"
import { actionAddComment } from "../../actions/actionAddComment"

interface IPropCommentList {
    commentsArray: ICommentTrack[]
    changeComments: (comment: ICommentTrack) => void
    removeComment: (commentID: string) => void
    trackID: string
}

const CommentList: React.FC<IPropCommentList> = ({commentsArray, changeComments, trackID, removeComment}) => {

    const {user: {isAuth}} = useTypedSelector(state => state)


    const handlerRemoveComment = (_id: string) => {
        removeComment(_id)
        actionRemoveComment(_id)
    }

    const createComment = async (text: string) => {
        const result: ICommentTrack  = await actionAddComment(trackID, text )
        changeComments(result)
    }

    return (
        <div className="comments">
            <h3>Комментарии</h3>

            <div className="comments-list">
                 {
                 commentsArray.map(comment => {
                     return <Comment commentInfo={comment}  removeComment={() => handlerRemoveComment(comment._id)} key={comment._id} />
                 })
                 
                 }
            </div>

            {
                isAuth ?
                <CommentInput submitInput={createComment} trackID={trackID} />
                :
                <h3 style={{marginTop: "30px", marginBottom: "30px"}}>Что бы оставить комментарий, нужно авторизоваться</h3>
            }
           
            
        </div>
    )
}

export default CommentList