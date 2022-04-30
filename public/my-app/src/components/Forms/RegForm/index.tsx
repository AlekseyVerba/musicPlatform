import React from "react"
import useInput from "../../../hooks/useInput"
import { useState } from "react"
import "./index.scss"
import { Link } from "react-router-dom"
import { useActions } from "../../../hooks/useActions"
import { userInfo } from "os"
import { useTypedSelector } from "../../../hooks/useTypedSelector"

const RegForm: React.FC = () => {

    const { actionRegister } = useActions()
    const { errorRegister, successRegister } = useTypedSelector(state => state.user)

    const usernameInput = useInput("", {
        lengthMax: { value: 15, message: "Имя должно быть меньше 15 символов" },
        lengthMin: { value: 2, message: "Имя должно быть больше 2 символов" },
    })

    const mailInput = useInput("", {
        isEmail: { message: "Введите корректный email" }
    })

    const passwordInput = useInput("", {
        lengthMax: { value: 15, message: "Пароль должен быть меньше 15 символов" },
        lengthMin: { value: 3, message: "Пароль должен быть больше 3 символов" }
    })



    const submitForm = (event: React.FormEvent) => {
        event.preventDefault()
        actionRegister({email: mailInput.value, password: passwordInput.value, username: usernameInput.value})
        usernameInput.clearValue()
        mailInput.clearValue()
        passwordInput.clearValue()
    }


    return (
        <form className="form" onSubmit={e => submitForm(e)}>

       
            <div className="form-group">
                <label className="col-form-label mt-4">
                    <span>Введите свой ник</span>
                    <input type="text" onBlur={usernameInput.handlerChangeBlur} value={usernameInput.value} onChange={(event) => usernameInput.changeHadnlerInput(event)} className={usernameInput.isClearBlur ? `form-control ${usernameInput.errors !== undefined ? "is-invalid" : "is-valid"} ` : "form-control"} placeholder="Ник" />
                    <div className="invalid-feedback">{usernameInput.errors}</div>
                    <div className="valid-feedback">Успешно!</div>
                </label>

            </div>

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
                {errorRegister && errorRegister.length ?
                    <h5 className="mention mention--error">{errorRegister}</h5>
                    :
                    null
                }

                {successRegister && successRegister.length ?
                    <h5 className="mention mention--success">{successRegister}</h5> :
                    null
                }



                <div className="wrapper-button d-grid gap-2">
                    <button className={!usernameInput.errors && !mailInput.errors && !passwordInput.errors ? "btn btn-lg btn-primary" : "btn btn-lg btn-primary disabled"} disabled={!usernameInput.errors && !mailInput.errors && !passwordInput.errors ? false : true} type="submit">Зарегистрироваться</button>
                </div>
            </div>
            <div className="link-wrapper">
                <Link to={"/auth/login"}>Войти</Link>
            </div>

        </form>
    )
}

export default RegForm
