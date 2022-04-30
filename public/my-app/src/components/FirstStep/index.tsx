import React from "react"
import useInput from "../../hooks/useInput"
import { useNavigate } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import "./index.scss"
import { info } from "console"

const FirstStep: React.FC = () => {

    const nameSong = useInput("", {lengthMin: {value: 1, message: "Необходимо заполнить это поле"}})
    const artistName = useInput("", {lengthMin: {value: 1, message: "Необходимо заполнить это поле"}})
    const text = useInput("", {})
    const navigate = useNavigate()
    
    const { actionAddTextInfoForAudio } = useActions()

    const nextStep = () => {
        actionAddTextInfoForAudio({artist: artistName.value, name: nameSong.value, text: text.value})
        navigate("/create-track/second/")
    }

    return (
        <div>
            <form className="form-create-track">
                <div className="form-group">
                    <label className="col-form-label mt-4">
                        <span>Введите название песни*</span>
                        <input type="text" onBlur={nameSong.handlerChangeBlur} value={nameSong.value} onChange={(event) => nameSong.changeHadnlerInput(event)} className={nameSong.isClearBlur ? `form-control ${nameSong.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Название" />
                        <div className="invalid-feedback">{nameSong.errors}</div>
                        <div className="valid-feedback">Успешно!</div>
                    </label>

                </div>
                <div className="form-group">
                    <label className="col-form-label mt-4">
                        <span>Введите название артиста*</span>
                        <input type="text" onBlur={artistName.handlerChangeBlur} value={artistName.value} onChange={(event) => artistName.changeHadnlerInput(event)} className={artistName.isClearBlur ? `form-control ${artistName.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Имя" />
                        <div className="invalid-feedback">{artistName.errors}</div>
                        <div className="valid-feedback">Успешно!</div>
                    </label>

                </div>
                <div className="form-group">
                    <label className="col-form-label mt-4">
                        <span>Введите текст </span>
                        <input type="text" onBlur={text.handlerChangeBlur} value={text.value} onChange={(event) => text.changeHadnlerInput(event)} className={text.isClearBlur ? `form-control ${text.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Текст" />
                        <div className="invalid-feedback">{text.errors}</div>
                        <div className="valid-feedback">Успешно!</div>
                    </label>

                </div>

                <div className="wrapper-btn-next">
                    <button type="button" disabled={!nameSong.errors && !artistName.errors ? false : true} className="btn btn-primary" onClick={nextStep}>Далее</button>
                </div>
                
            </form>
        </div>
    )
}

export default FirstStep