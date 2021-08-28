import React from 'react';
import Image from "next/dist/client/image";
import YouTubeLogo from "../public/YouTube_icon.png";
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import {SAVE_VIDEO} from '../store/actions/playerTypes';
import ReactPlayer from 'react-player/youtube'

import Styles from '../styles/YouTubePlayer.module.css';

export const YouTubePlayer = ({mode}) => {
    const {videoId, timestamp, videoTime} = useSelector((state) => state.playerReducer);
    const dispatch = useDispatch();

    const router = useRouter()
    let playerRef = React.useRef()

    function YouTubeVidId(url) {
        const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }

    const saveVidId = (videoId, timestamp, videoTime, mode) => {
        if (videoId) {
            const allVideos = localStorage.getItem('videoIds')
            if (allVideos) {// update if exists
                const parsed = JSON.parse(allVideos)
                let vidIndex = parsed.findIndex(v => v.videoId === videoId);
                if (vidIndex !== -1) {
                    //update time value of existing video
                    parsed[vidIndex] = {videoId, timestamp, videoTime}
                    localStorage.setItem('videoIds', JSON.stringify([...parsed]))
                } else {
                    //append new video to storage
                    localStorage.setItem('videoIds', JSON.stringify([...parsed, {videoId, timestamp, videoTime}]))
                }

            } else {// add new if storage does not exist
                localStorage.setItem('videoIds', JSON.stringify([{videoId, timestamp, videoTime}]))
            }
        }

        router.replace('/video')
    }

    React.useEffect(()=> {
        // localStorage.setItem('videoIds', JSON.stringify([]))

        if (mode === 'player'){//get last video
            const allVideos = localStorage.getItem('videoIds')
            if(allVideos) {
                const parsed = JSON.parse(allVideos)
                if(parsed && parsed.length > 0) {
                    const latest = parsed.sort(function (x, y) {
                        return x.timestamp - y.timestamp;
                    }).reverse()

                    const timeDiff = new Date(new Date().getTime() - latest[0].timestamp).getSeconds()
                    dispatch({type: SAVE_VIDEO, payload: {...latest[0], videoTime: latest[0].videoTime + timeDiff}});
                }
            }else{//Play a dummy video
                dispatch({type: SAVE_VIDEO, payload: {videoId: 'ScMzIvxBSi4', videoTime: 0}});
            }
        }

    }, [])

    const submit = async (event) => {
        const videoId = YouTubeVidId(event.target.url.value)
        if(videoId){
            await saveVidId(videoId, new Date().getTime(), 0)
        }else{
            alert('Please enter a valid YouTube video URL')
        }
        event.preventDefault()
    }
    function editVideo() {
        router.replace('/')
    }

    function onProgress(event) {
        event.playedSeconds !== 0 &&
        saveVidId(videoId, new Date().getTime(), event.playedSeconds)
    }
    return (
        <div className={Styles.container}>
            {mode === 'player' ?
                <div>
                    <ReactPlayer
                        url={'https://www.youtube.com/watch?v='+videoId+'#t='+videoTime}
                        onProgress={onProgress}
                        ref={playerRef}
                        playing
                        loop
                        muted
                        controls
                        config={{
                            youtube: {
                                playerVars: {
                                    autoplay: 1,
                                    // start: videoTime,
                                }
                            },
                        }}
                    />

                    <button onClick={editVideo}>
                        Edit Video
                    </button>
                </div>
                :
                <form onSubmit={submit}>
                    <label htmlFor="url">
                        <Image
                            src={YouTubeLogo}
                            alt="YouTube Logo"
                            width={120}
                            height={80}
                        />
                        <p>YouTube URL</p>
                    </label>
                    <input
                        id="url"
                        type="url"
                        autoComplete="url"
                        name='url'
                        placeholder="https://"
                        required
                    />
                    <button type="submit">Save</button>
                </form>
             }
        </div>
    )
};
