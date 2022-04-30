import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actionGetCurrentTrack } from "../../actions/actionGetCurrentTrack"
import { ITrack } from "../../types/track/"
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import CurrentTrack from "../../components/CurrentTrack";
import CommentList from "../../components/CommentList";
import { ICommentTrack } from "../../types/comment/"
import { actionGetComments } from "../../actions/actionGetComments";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const CurrentTrackPage: React.FC = () => {

    const {trackID} = useParams()
    const [isLoading, isLoaingSet] = useState<boolean>(true)
    const [stateCurrentTrack, setStateCurrentTrack] = useState<null | ITrack>(null)
    const [comments, setComments] = useState<ICommentTrack[]>([])
    const [commentsError, setCommentsErrors] = useState<string>("")
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {


        if (trackID) {
            const start = async () => {
                isLoaingSet(true)
                const resultComments = await actionGetComments(trackID)
                
                if (resultComments.status) {
                    setComments(resultComments.comments)
                } else {

                    setCommentsErrors(resultComments.text!)
                }

                const result = await actionGetCurrentTrack(trackID)
                

                if (result.status && result.status === false) {
                    setError(result.message)
                } else {
                    setStateCurrentTrack(result)
                }

                isLoaingSet(false)
            }

            start()
        }



    }, [trackID])

    const changeComments = (comment: ICommentTrack): void => {
        const newComments: ICommentTrack[] = [...comments, comment]
        setComments(newComments)
    }

    const removeComment = (commentID: string): void => {
        const newComments = comments.filter(comment => comment._id !== commentID)
        setComments(newComments)
    }

    const addLike = (idUser: string) => {
        setStateCurrentTrack({
            ...stateCurrentTrack!,
            likes: [...stateCurrentTrack!.likes!, idUser]
        })
    }

    const removeLike = (idUser: string) => {
        setStateCurrentTrack({
            ...stateCurrentTrack!,
            likes: stateCurrentTrack?.likes?.filter(like => like !== idUser)
        })
    }

    return (
        <div>
            <Link to="/tracks">К списку</Link>
            <div style={{marginTop: "30px"}}>
                {
                    isLoading ? 
                    <Loader />
                    : null
                }

                {
                    error && !isLoading ?
                    <h1>{error}</h1> 
                    : null
                }

                {
                    !error && !isLoading && stateCurrentTrack ?
                    <div>
                        <CurrentTrack track={stateCurrentTrack} addLike={addLike} removeLike={removeLike} />
                        <CommentList removeComment={removeComment} trackID={trackID!} changeComments={changeComments} commentsArray={comments} />
                    </div>
                    
                    : null
                }

            </div>
        </div>
    )



}


export default CurrentTrackPage