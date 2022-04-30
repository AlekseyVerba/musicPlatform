import React from "react"

interface IButtonRemoveProp {
    removeHandler: () => {}
}

const ButtonRemove: React.FC<IButtonRemoveProp> = ({removeHandler}) => {
    return (
        <button style={{marginBottom: "10px"}} onClick={removeHandler} type="button" className="btn btn-danger">Удалить</button> 
    )
}

export default ButtonRemove