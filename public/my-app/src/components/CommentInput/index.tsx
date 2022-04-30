import React from "react"
import useInput from "../../hooks/useInput"
import { ICommentTrack } from "../../types/comment"
import { actionAddComment } from "../../actions/actionAddComment"

interface ICommentTrackInput {
    // changeComments: (comment: ICommentTrack) => void,
    trackID: string,
    submitInput(text: string): void 
}

const CommentInput: React.FC<ICommentTrackInput> = ({ trackID , submitInput}) => {

    const commentInput = useInput("", {})

    const changeCommentsHandler = async () => {
        submitInput(commentInput.value)
        commentInput.clearValue()
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleTextarea" className="form-label mt-4">Добавить комментарий</label>
                <textarea className="form-control" value={commentInput.value} onChange={(e) => commentInput.changeHadnlerInput(e)} placeholder="Комментарий" id="exampleTextarea" rows={3}></textarea>
            </div>
            <div className="comment__submit-wrapper">
                <button type="button" className="btn btn-primary" onClick={changeCommentsHandler}>Отправить</button>
            </div>
        </div>
    )
}

export default CommentInput