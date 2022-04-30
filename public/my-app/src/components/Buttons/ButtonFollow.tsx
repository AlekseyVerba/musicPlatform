import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonFollowProp {
    functionFollow(): void
    loading: boolean
}

const ButtonFollow: React.FC<IButtonFollowProp> = ({functionFollow, loading}) => {
    return (
        <>
            <div style={{position: "relative"}}>
                <button type="button" onClick={functionFollow} disabled={loading} className="btn btn-primary">Подписаться</button>
                {loading && <SmallLoader />}
            </div>
        </>
        
    )
}

export default ButtonFollow