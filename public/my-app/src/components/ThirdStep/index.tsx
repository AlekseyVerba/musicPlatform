import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import "./index.scss"

const ThirdStep: React.FC = () => {

    const ref = useRef<HTMLInputElement>(null)
    const { actionAddAudioFile, createTrack } = useActions()
    const [nameAudio, setNameAudio] = useState<string>("")
    const {artist, name, audio, imgAudio, text} = useTypedSelector(state => state.createTrack)
    const navigate = useNavigate()

    

    useEffect(() => {
        if (!artist && !name) {
            navigate("/create-track/first")
        }
    }, [])

    const addAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            const audioFile = event.target.files[0]
            setNameAudio(audioFile.name)
            actionAddAudioFile(audioFile)
        }
    }

    const handlerCreateTrack = async () => {
        const result = await createTrack(name, artist, text, audio, imgAudio)
        navigate("/create-track/first")
    }

    return (
        <div className="third-step">
            <h3 className="third-step__title">
                {
                    nameAudio ?
                    <span>{nameAudio}</span>
                    :
                    <span>Загрузите  сам трек</span>
                }
                
                
            </h3>
            <div>
                {
                    nameAudio ?
                    <button onClick={handlerCreateTrack}  className="btn btn-success btn-lg">Сохранить</button>
                    :
                    <button onClick={() => ref.current?.click()}  className="btn btn-success btn-lg">Загрузить</button>
                }
                
            </div>
            <input ref={ref} onChange={addAudio} type="file" accept="audio/*" style={{display:"none"}} />
        </div>
    )
}

export default ThirdStep