import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonAddToMeProps {
    functionAdd(): void
    loading: boolean
    text: string
}

const ButtonAddToMe: React.FC<IButtonAddToMeProps> = ({functionAdd, loading, text}) => {
    return (
        <div style={{position: "relative"}}>
            <button type="button" onClick={functionAdd} disabled={loading} className="btn btn-primary">{text}</button>
            {loading && <SmallLoader />}
        </div>
    )
}

export default ButtonAddToMe