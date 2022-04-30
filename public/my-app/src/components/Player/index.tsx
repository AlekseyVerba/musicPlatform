import React, { useEffect, useRef, useState } from "react"
import PauseImage from "../../assets/pause.png"
import SoundImage from "../../assets/sound.png"
import NextImage from "../../assets/next.png"
import PlayImage from "../../assets/play.png"
import RepeateImage from "../../assets/repeat.png"
import SpreadImage from "../../assets/spread.png"
import Progressive from "./Progressive"
import "./index.scss"
import { SERVER_API } from "../../config"
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { fmtMSS } from "../../helpFunctions"
import { listenAudio } from "../../actions/listenAudio"
import { findNextTrack } from "../../helpFunctions/findNextTrack"
import { findPrevTrack } from "../../helpFunctions/findPrevTrack"
import { shuffle } from "../../helpFunctions/sortRandomArray"

const audio = new Audio()
const Player: React.FC = () => {


    const { actionAddDurationTime, actionChangeCurrentTime, actionChangeVolume, actionPause, actionStart, actionChangeListens, actionAddActiveTrack, actionChangeStatusTrackRepeat, actionChangeStatusTracksSpread, actionClearSpreadArray } = useActions()
    const { player: { activeTrack, currentTimeTrack, durationTimeTrack, isPause, volume, currentPlaylist, isTrackRepeat, isTracksSpread } } = useTypedSelector(state => state)
    const nRef = useRef(isTrackRepeat); // define mutable ref
    

    useEffect(() => { nRef.current = isTrackRepeat }) // nRef is updated after each render

    useEffect(() => {
        if (activeTrack) {
            audio.pause()
            audio.src = `${SERVER_API}/${activeTrack?.audio}`
            audio.onloadedmetadata = () => {
                actionAddDurationTime(audio.duration)
            }

            audio.ontimeupdate = () => {
                actionChangeCurrentTime(audio.currentTime)
            }

            audio.onended = () => {

                listenAudio(activeTrack._id)
                actionChangeListens(activeTrack._id)

                if (nRef.current) {
                    actionAddActiveTrack(null)
                    actionAddActiveTrack(activeTrack, true)
                } else {
                    let result = findNextTrack(activeTrack._id, currentPlaylist )
                    actionAddActiveTrack(result)
                }



            }

 

            // debugger
            if (!isPause) {

                audio.play()
            }

        } else {
            audio.pause()
        }


    }, [activeTrack])




    const playAudio = () => {
        actionStart()
        console.log(audio.src)
        audio.play()
    }

    const pauseAudio = () => {
        actionPause()
        audio.pause()
    }

    const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
        actionChangeVolume(+event.target.value)
        audio.volume = +event.target.value / 100
    }

    const changeCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        actionChangeCurrentTime(+event.target.value)
        audio.currentTime = +event.target.value
    }

    if (!activeTrack) {
        return null
    }


    const playNextTrack = () => {
        const result = findNextTrack(activeTrack._id, currentPlaylist)
        
        actionAddActiveTrack(result)
    }

    const playPrevTrack = () => {
        const result = findPrevTrack(activeTrack._id, currentPlaylist)
        actionAddActiveTrack(result)
    }

    const changeStatusTrackRepeat = () => {
        actionChangeStatusTrackRepeat(!isTrackRepeat)
    }

    const changeStatusTracksSpread = () => {
        if (isTracksSpread) {
            actionChangeStatusTracksSpread(!isTracksSpread)
            actionClearSpreadArray()
        } else {
            actionChangeStatusTracksSpread(!isTracksSpread)
        }
        
    }

    return (
        <div className="player">
            <div className="player__controller">
                <button onClick={playPrevTrack} className="player__button-controller" style={{transform: "rotate(180deg)"}}>
                    <img src={NextImage} alt="prev" />
                </button>

                {
                    isPause
                        ?
                        <button onClick={playAudio} className="player__button-controller">
                            <img src={PlayImage} alt="pause" />
                        </button>
                        :


                        <button onClick={pauseAudio} className="player__button-controller">
                            <img src={PauseImage} alt="pause" />
                        </button>
                }

                <button onClick={playNextTrack} className="player__button-controller">
                    <img src={NextImage} alt="next" />
                </button>

                <button onClick={changeStatusTrackRepeat} className={isTrackRepeat ? "player__button-controller player__button-controller--active" : "player__button-controller"}>
                    <img src={RepeateImage} alt="repeat" />
                </button>

                <button onClick={changeStatusTracksSpread} className={isTracksSpread ? "player__button-controller player__button-controller--active" : "player__button-controller"}>
                    <img src={SpreadImage} alt="repeat" />
                </button>

            </div>

            <div className="player__info-track col-2">
                <h6 className="player__name-track">{activeTrack?.name}</h6>
                <p className="player__name-artist">{activeTrack?.artist}</p>
            </div>

            <div className="player__track-range col-5">
                <Progressive min={0} max={durationTimeTrack} value={currentTimeTrack} changeProgress={changeCurrentTime} width="300px" />
                <div className="player__track-time">
                    <span>{fmtMSS(Math.ceil(currentTimeTrack))}</span>
                    /
                    <span>{fmtMSS(Math.ceil(durationTimeTrack))}</span>
                </div>
            </div>

            <div className="player__track-volume col-2">
                <img src={SoundImage} className="player__sound-image" alt="sound" />
                <Progressive min={0} max={100} value={volume} width="100px" changeProgress={changeVolume} />
            </div>

        </div>
    )
}

export default Player