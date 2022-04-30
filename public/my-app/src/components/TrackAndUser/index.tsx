import React from "react"
import { TrackAndUser } from "../../types/TrackAndUser"
import Track from "../Track"
import {ITrack} from "../../types/track"
import { useActions } from "../../hooks/useActions"

interface IProp {
    info: TrackAndUser
    items: TrackAndUser[]
}

const TrackAndUserComponent: React.FC<IProp> = ({ info: {_id, createdAt, track, updatedAt, user}, items }) => {

    const { actionAddLikeFromFollowing, actionRemoveLikeFromFollowing } = useActions()



    const tracksInItems: ITrack[] = []
    items.forEach(item => {
        tracksInItems.push(item.track)
    })

    return (
        <div style={{marginBottom: "15px"}}>
           <Track currentTrack={track} currentItems={tracksInItems} addLike={actionAddLikeFromFollowing} removeLike={actionRemoveLikeFromFollowing}  />
        </div>
    )
}

export default TrackAndUserComponent