import React, {useEffect, useState} from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../../components/Loader";
import CurrentProfileComponent from "../../components/CurrentProfile";

const CurrentProfile: React.FC = () => {

    const {userID} = useParams()
    const { currentProfile: {profile} } = useTypedSelector(state => state)
    const { actionGetCurrentProfile, actionClearCurrentProfile } = useActions()
    const [loading, setLoading] = useState<boolean>(true)
    const { pathname } = useLocation()

    useEffect(() => {
        
        const getCurrentProfile = async () => {
            setLoading(true)
            await actionGetCurrentProfile(userID!)
            setLoading(false)
        }

        getCurrentProfile()

        return function() {
            actionClearCurrentProfile()
        }

    }, [userID])

    if (loading) return <Loader />

    if (!profile) return <h1>Пользователь не найден</h1>

    return (
        <div>
            <CurrentProfileComponent user={profile!} />

            <div style={{marginTop: "30px"}} className="current-profile-page__controller">
                <Link style={{marginRight: "10px"}} to={`/users/${profile._id}/tracks`} className={pathname.indexOf("/tracks") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Песни</Link>
                <Link to={`/users/${profile._id}/albums`} className={pathname.indexOf("/albums") !== -1 ? "btn btn-primary disabled" : "btn btn-primary"}>Альбомы</Link>
            </div>


            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default CurrentProfile