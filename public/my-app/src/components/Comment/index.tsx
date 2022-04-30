import React from "react"
import { ICommentTrack, ICommentAlbum } from "../../types/comment"
import { SERVER_API } from "../../config"
import { Link } from "react-router-dom"
import "./index.scss"
import ProfilePNG from "../../assets/profile.png"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { actionRemoveComment } from "../../actions/actionRemoveComment"

interface ICommentTrackProps {
    commentInfo: ICommentTrack | ICommentAlbum
    removeComment: (commentID: string) => void
}

const Comment: React.FC<ICommentTrackProps> = ({ commentInfo: { _id, user, text }, removeComment }) => {

    const { user: currentUser } = useTypedSelector(state => state.user)



    console.log(user)

    return (
        <div className="comment" style={{overflow: "hidden"}}>
            <div className="comment__profile col-3">
            {
                user.imageURL
            
                ?
                <img src={
                    `${SERVER_API}/${user.imageURL}`
                } alt="avatar" />
                :          
                <img src={ProfilePNG} alt="avatar" />
            }
              
            </div>
            <div className="comment__main col-6">
                <div className="comment__info col-8">
                    <Link className="comment__user" to={`/user/${user._id}`}>{user.username}</Link>
                    <div className="comment__text">{text}</div>
                </div>
                <div className="comment__controller col-3">
                    {
                        user._id === currentUser._id ?
                        <>
                            <button type="button" className="btn btn-danger" onClick={() => removeComment(_id)}>Удалить</button>
                        </>
                        :
                        null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Comment