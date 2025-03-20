import React from 'react'
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs'

const PlayPause = ({
    size = '60px', // Permet de féfinir la taille du bouton (par default 60px)
    isPlaying, // Gère l'état si on est en lecture ou en pause
    songs, // Tableau de chansons
    activeSong, // Les infos de la chanson en cours de lecture
    handlePause, // Fonction pour mettre en pause
    handlePlay, // Fonction pour mettre en play
    index // Index de la chanson dans son tableau 
}) => {
    return (
        // On check si on est en mode play &&
        // si le titre de la chanson en cours de lecture == au titre de la chanson du tableau à l'index donné
        isPlaying && activeSong?.title === songs?.[index]?.title ?
            // Si vrai: on retourne l'icone pause avec la méthode handlePause
            <BsPauseCircleFill
                size={size}
                className='text-green shadow-md'
                onClick={handlePause}
            />
            :
            <BsPlayCircleFill
                size={size}
                className='text-green shadow-md'
                onClick={handlePlay}
            />
    )
}

export default PlayPause