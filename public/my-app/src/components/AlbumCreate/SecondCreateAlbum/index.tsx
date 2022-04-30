import React, { useEffect, useRef, useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useNavigate, Link } from "react-router-dom"
import { SERVER_API } from "../../../config"


const SecondCreateAlbum: React.FC = () => {
    const [urlImg, setUrlImg] = useState<any>("")
    const ref = useRef<HTMLInputElement>(null)
    const { actionAddImgToNewAlbum, actionCreateAlbum } = useActions()
    const { name, avatarURL, description, isShowInRecommendation, newAlbum } = useTypedSelector(state => state.createAlbum)
    const navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            navigate("/albums/create-album/first")
        }
    }, [])

    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            actionAddImgToNewAlbum(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setUrlImg(reader.result)
            }

            reader.readAsDataURL(file)

        }

    }

    const handlerCreateAlbum = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        await actionCreateAlbum(name, avatarURL!, description, isShowInRecommendation)
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
                {
                    !newAlbum ?

                        <>
                            <h3 className="second-step__title">Загрузите обложку трека</h3>
                            <div className="wrapper-second-button">

                                {
                                    !urlImg ?
                                        <button onClick={() => ref.current?.click()} className="second-step__button btn btn-success btn-lg">Загрузить
                                            <input type="file" ref={ref} onChange={(e) => loadFile(e)} accept="image/*" style={{ display: "none" }} />
                                        </button>
                                        :
                                        // <Link to="/albums/create-album/third" className="btn btn-primary">Далее</Link>
                                        <button className="btn btn-primary" onClick={e => handlerCreateAlbum(e)}>Создать альбом</button>
                                }



                            </div>
                        </>
                        :
                        <div className="wrapper-second-button">
                            
                                <Link to={`/albums/${newAlbum?._id}`} className="second-step__button btn btn-primary" >Перейти к данному альбому</Link>
                                <Link to={`/albums/`} className="second-step__button btn btn-primary">Перейти ко всем альбомам</Link>
                            
                        </div>

                }
            </div>
        </div>
    )
}

export default SecondCreateAlbum



