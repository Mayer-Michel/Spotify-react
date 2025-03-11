import React, { useEffect, useRef } from 'react'
import { MP3_URL } from '../../constants/apiConstant';

const Player = ({ activeSong, volume, isPlaying, seekTime, repeat, currentIndex, onEnded, onTimeUpdate, onLoadedData }) => {

    const ref = useRef(null);

    if (ref.current) {
        if (isPlaying) {
            ref.current.play(); //on lance la musique
        } else {
            ref.current.pause(); //on met en pause la musique 
        }
    }

    // Permet d'affilier le volume au player 
    useEffect(() => {
      ref.current.volume = volume; //on donne le volume au player

    }, [volume])

    // Permet d'affilier la position de la musique au player
    useEffect(() => {
      ref.current.currentTime= seekTime; //on donne la position de la barre de lecture au player

    }, [seekTime])
    
    

    return (
        <audio 
        src={`${MP3_URL}/${activeSong?.filePath}`}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        />
    )
}

export default Player