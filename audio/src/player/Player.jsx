import React, { useRef } from 'react';
import {
    BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill,
    BsFillSkipEndCircleFill, BsDownload
} from 'react-icons/bs';
import './Player.scss';

const BASE_URL = 'http://localhost:3001'; // replace with your actual base URL
const Player = ({ audioElem, isplaying, setisplaying, currentSong, setCurrentSong, songs }) => {
    const downloadLink = `${BASE_URL}${currentSong.url}`;

    const clickRef = useRef();

    const PlayPause = () => {
        setisplaying(!isplaying);

    }


    const checkWidth = (e) => {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;

        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress / 100 * currentSong.length;

    }

    const skipBack = () => {
        const index = songs.findIndex(x => x.title == currentSong.title);
        if (index == 0) {
            setCurrentSong(songs[songs.length - 1])
        }
        else {
            setCurrentSong(songs[index - 1])
        }
        audioElem.current.currentTime = 0;

    }


    const skiptoNext = () => {
        const index = songs.findIndex(x => x.title == currentSong.title);

        if (index == songs.length - 1) {
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[index + 1])
        }
        audioElem.current.currentTime = 0;

    }

    return (
        <div className='player_container'>
            <div className="title">
                <p>{currentSong.title}</p>
            </div>
            <div className="navigation">
                <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                    <div className="seek_bar" style={{ width: `${currentSong.progress + "%"}` }}></div>
                </div>
            </div>
            <div className="controls">
                <div>
                    <BsFillSkipStartCircleFill className='btn_action' onClick={skipBack} />
                    {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause} /> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause} />}
                    <BsFillSkipEndCircleFill className='btn_action' onClick={skiptoNext} />
                </div>
                <a href={downloadLink} download>
                    <BsDownload className='btn_action' />
                </a>
            </div>
        </div>
    )
}

export default Player