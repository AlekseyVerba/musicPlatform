import React from "react"
import "./index.scss"

interface IpropsProgressive {
    width: string,
    min: number,
    max: number,
    value: number,
    changeProgress: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Progressive: React.FC<IpropsProgressive> = ({width, max, min, value, changeProgress}) => {
    return (
        <input type="range" onChange={(e) => changeProgress(e)} style={{width}} className="form-range progressive" min={min} value={value} max={max} ></input>
    )
}

export default Progressive