import React from "react"
import TracksList from "../../components/TrackList"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Link } from "react-router-dom"
import "./index.scss"
import { useActions } from "../../hooks/useActions"

const TracksPage: React.FC = () => {

    const { isAuth } = useTypedSelector(state => state.user)
    const { getTracks, actionCleartracks } = useActions()

    return (
        <div className="tracks">
            <h2 className="tracks__title">Все треки</h2>
            {
                isAuth ?
                    <div className="btn-load__wrapper">
                        <Link to="/create-track/first" className="btn btn-primary btn-lg btn-load">Загрузить песню</Link>
                    </div>
                    : null
            }

            <TracksList clearTracks={actionCleartracks} getTracks={getTracks} />
        </div>
    )
}
export default TracksPage