import React from "react"
import "./index.scss"

const SmallLoader: React.FC = () => {
    return (
        <div className="small-loader_wrapper">
            <div className="lds-hourglass"></div>
        </div>
    )
}

export default SmallLoader