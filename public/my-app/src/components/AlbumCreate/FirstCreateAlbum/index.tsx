import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useActions } from "../../../hooks/useActions"
import useInput from "../../../hooks/useInput"

const FirstCreateAlbum: React.FC = () => {
    const nameAlbum = useInput("", { lengthMin: { value: 1, message: "Необходимо заполнить это поле" } })
    const descriptionAlbum = useInput("", {})
    const navigate = useNavigate()

    const [isShowInRecommendation, setIsShowInRecommendation] = useState<boolean>(true)

    const { actionAddInfoToNewAlbum, actionClearCreateAlbum } = useActions()

    useEffect(() => {
        actionClearCreateAlbum()
    }, [])

    const nextStep = () => {
        actionAddInfoToNewAlbum(nameAlbum.value, descriptionAlbum.value, isShowInRecommendation)
        navigate("/albums/create-album/second/")
    }

    const handlerChangeIsShowInRecommendation = () => {
        setIsShowInRecommendation(!isShowInRecommendation)
    }

    return (
        <div>
            <form className="form-create-track">
                <div className="form-group">
                    <label className="col-form-label mt-4">
                        <span>Введите название альбома*</span>
                        <input type="text" onBlur={nameAlbum.handlerChangeBlur} value={nameAlbum.value} onChange={(event) => nameAlbum.changeHadnlerInput(event)} className={nameAlbum.isClearBlur ? `form-control ${nameAlbum.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Название" />
                        <div className="invalid-feedback">{nameAlbum.errors}</div>
                        <div className="valid-feedback">Успешно!</div>
                    </label>

                </div>
                <div className="form-group">
                    <label className="col-form-label mt-4">
                        <span>Введите описание альбома</span>
                        <input type="text" onBlur={descriptionAlbum.handlerChangeBlur} value={descriptionAlbum.value} onChange={(event) => descriptionAlbum.changeHadnlerInput(event)} className={descriptionAlbum.isClearBlur ? `form-control ${descriptionAlbum.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Имя" />
                        <div className="invalid-feedback">{descriptionAlbum.errors}</div>
                        <div className="valid-feedback">Успешно!</div>
                    </label>

                </div>
                <div className="form-check">
                    <input onChange={handlerChangeIsShowInRecommendation} className="form-check-input" type="checkbox" id="flexCheckChecked" checked={isShowInRecommendation} />
                    <label className="form-check-label" htmlFor="flexCheckChecked">
                        Показывать во всех альбомах?
                    </label>
                </div>

                <div className="wrapper-btn-next">
                    <button type="button" disabled={!nameAlbum.errors && !descriptionAlbum.errors ? false : true} className="btn btn-primary" onClick={nextStep}>Далее</button>
                </div>

            </form>
        </div>
    )
}

export default FirstCreateAlbum

