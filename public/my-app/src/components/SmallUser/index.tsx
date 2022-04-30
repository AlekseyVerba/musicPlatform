import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import profilePNG from "../../assets/profile.png"
import { SERVER_API } from "../../config"
import { num_word } from "../../helpFunctions/num_word"
import { countMilliSeconds } from "../../helpFunctions/countMilliSeconds"
import "./index.scss"

interface IPropSmallUser {
    _id: string
    username: string
    email: string
    imageURL: string,
    tracks: any
}

const SmallUser: React.FC<IPropSmallUser> = ({ _id, email, imageURL, username, tracks }) => {

    const word = useMemo(() => {
        return num_word(tracks.length, ['песню', 'песни', 'песен'])
    }, [tracks.length])

    const time = useMemo(() => {
        return countMilliSeconds(new Date().getTime() - new Date(tracks[0].createdAt).getTime())
    }, [])



    return (
        <Link style={{display: "inline-block"}}  to={`/users/${_id}`}>
            <div className="small-user">
                <div className="small-user__image">
                    {
                        imageURL ?
                            <img src={`${SERVER_API}/${imageURL}`} alt="avatar" />
                            :
                            <img src={profilePNG} alt="avatar" />
                    }
                </div>
                <div className="small-user__username">
                    {username} добавил(а) {tracks.length} {word} {time}
                </div>
            </div>
        </Link>
    )
}

export default SmallUser