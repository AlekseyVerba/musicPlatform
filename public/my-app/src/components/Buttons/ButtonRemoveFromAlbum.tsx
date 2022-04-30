import React from "react"
import SmallLoader from "../SmallLoader"

interface IButtonRemoveProp {
    removeHandler(): void
    loading: boolean
}

const ButtonRemoveFromAlbum: React.FC<IButtonRemoveProp> = ({removeHandler, loading}) => {
    return (
        
        <div style={{ position: "relative" }}>
            <button onClick={removeHandler} type="button"  disabled={loading} className="btn btn-danger">Удалить из альбома</button> 
            {loading && <SmallLoader />}
        </div>
    )
}

export default ButtonRemoveFromAlbum