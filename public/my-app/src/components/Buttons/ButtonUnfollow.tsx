import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonUnfollowProp {
    functionUnfollow(): void
    loading: boolean
}

const ButtonUnfollow: React.FC<IButtonUnfollowProp> = ({functionUnfollow, loading}) => {
    return (
        <>
            <div style={{position: "relative"}}>
                <button type="button" onClick={functionUnfollow} disabled={loading} className="btn btn-danger">Отписаться</button>
                { loading &&  <SmallLoader /> }
            </div>

            
        </>
        
    )
}

export default ButtonUnfollow