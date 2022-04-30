import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonRemoveFromMeProps {
    functionRemove(): void
    loading: boolean
    text: string
}

const ButtonRemoveFromMe: React.FC<IButtonRemoveFromMeProps> = ({functionRemove, loading, text}) => {
    return (
        <div style={{position: "relative"}}>
            <button type="button" onClick={functionRemove} disabled={loading} className="btn btn-danger">{text}</button>
            {loading && <SmallLoader />}
        </div>
    )
}

export default ButtonRemoveFromMe