import React, { useEffect, useRef, useState } from "react"
import { useActions } from "../../hooks/useActions"
import "./index.scss"
import { Link, useNavigate } from "react-router-dom"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const SecondStep = () => {

    const [urlImg, setUrlImg] = useState<any>("")
    const ref = useRef<HTMLInputElement>(null)
    const { actionAddImgFile } = useActions()
    const {artist, name} = useTypedSelector(state => state.createTrack)
    const navigate = useNavigate()

    useEffect(() => {
        if (!artist && !name) {
            navigate("/create-track/first")
        }
    }, []) 

    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            actionAddImgFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setUrlImg(reader.result)
            }

            reader.readAsDataURL(file)

        }
        
    }

    return (
        <div className="second-step">
            <div className="second-step__left">
                {
                    !urlImg ?
                    <div className="second-step__block second-step__block--grey"></div>
                    :
                    <img src={urlImg} className="second-step__block" alt="avatar" />
                }
            </div>
            <div className="second-step__right">
                <h3 className="second-step__title">Загрузите обложку трека</h3>
               <div className="wrapper-second-button">

                {
                    !urlImg ?
                    <button onClick={() => ref.current?.click()} className="second-step__button btn btn-success btn-lg">Загрузить
                    <input type="file" ref={ref} onChange={(e) => loadFile(e)} accept="image/*" style={{display:"none"}} />
                    </button>
                    :
                    <Link to="/create-track/third" className="btn btn-primary">Далее</Link>
                }


                
               </div>
            </div>
        </div>
    )
}

export default SecondStep