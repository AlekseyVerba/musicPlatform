import React from "react"
import useInput from "../../../hooks/useInput"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./index.scss"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"


const LogForm: React.FC = () => {

    const { errorLogin } = useTypedSelector(state => state.user)
    const { actonLogin } = useActions()

    const mailInput = useInput("", {
        isEmail: { message: "Введите корректный email" }
    })

    const passwordInput = useInput("", {
        lengthMax: { value: 15, message: "Пароль должен быть меньше 15 символов" },
        lengthMin: { value: 3, message: "Пароль должен быть больше 3 символов" }
    })


    const submitForm = (event: React.FormEvent) => {
        event.preventDefault()
        actonLogin({email: mailInput.value, password: passwordInput.value})
        mailInput.clearValue()
        passwordInput.clearValue()
    }


    return (
        <form className="form" onSubmit={(e) => submitForm(e)}>

            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите свой email</span>
                    <input type="text" onBlur={mailInput.handlerChangeBlur} value={mailInput.value} onChange={(event) => mailInput.changeHadnlerInput(event)} className={mailInput.isClearBlur ? `form-control ${mailInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Email" />
                    <div className="invalid-feedback">{mailInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите свой пароль</span>
                    <input type="password" onBlur={passwordInput.handlerChangeBlur} value={passwordInput.value} onChange={(event) => passwordInput.changeHadnlerInput(event)} className={passwordInput.isClearBlur ? `form-control ${passwordInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Пароль" />
                    <div className="invalid-feedback">{passwordInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

            <div>
                {errorLogin && errorLogin.length ?
                    <h5 className="mention mention--error">{errorLogin}</h5>
                    :
                    null
                }




                <div className="wrapper-button d-grid gap-2">
                    <button className={!mailInput.errors && !passwordInput.errors ? "btn btn-lg btn-primary" : "btn btn-lg btn-primary disabled"} disabled={!mailInput.errors && !passwordInput.errors ? false : true} type="submit">Войти</button>
                </div>
            </div>
            <div className="link-wrapper">
                <Link to={"/auth/registr"}>Регистрация</Link>
            </div>

        </form>


    )
}

export default LogForm
