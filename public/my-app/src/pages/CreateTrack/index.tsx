import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import "./index.scss"

const CreateTrack: React.FC = () => {

    const {pathname} = useLocation()
    
    const isStepFirst = pathname.indexOf("first") !== -1
    const isStepSecond = pathname.indexOf("second") !== -1
    const isStepThird = pathname.indexOf("third") !== -1

    return (
        <div className="create-track">
            <div className="create-track__header">
                <h1 className="create-track__title">Загрузка нового трека</h1>
                <div className="create-track__circles">
                    <div className={isStepFirst ?  "create-track__circle create-track__circle--active" : "create-track__circle"}><span className="create-track__circle-number">1</span></div>
                    <div className={isStepSecond ?  "create-track__circle create-track__circle--active" : "create-track__circle"}><span className="create-track__circle-number">2</span></div>
                    <div className={ isStepThird ?  "create-track__circle create-track__circle--active" : "create-track__circle"}><span className="create-track__circle-number">3</span></div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default CreateTrack