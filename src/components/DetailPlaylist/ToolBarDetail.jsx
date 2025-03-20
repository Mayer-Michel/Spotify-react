import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import PlayPause from '../Services/PlayPause';

const ToolBarDetail = ({ dataPlaylist }) => {
    
    const dispatch = useDispatch();
    
    //on déclare nos states
    const [index, setIndex] = useState(null); // pour l'index des chanson
    //on récupère l'id de l'album
    const albumId = dataPlaylist?.id;
    //on va faire les courses (on récupère les info du store)
    const { isPlaying, activeSong, currentIndex } = useSelector((state) => state.player);
    
    useEffect(() => {
        setIndex(currentIndex);
    }, [currentIndex])

    const songs = dataPlaylist?.songs;
    //on redéclare des constantes
    const data = index != null ? dataPlaylist?.songs[index]?.album : {} ;

    // Méthode lorsqu'on met pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    // Méthode lorsqu'on met play
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({ songs, data, index }));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

    return (
        <>
            <div className='flex items-center ml-5'>
                <div className='cursor-pointer mr-3'>
                    {/* bouton play/pause */}
                    <PlayPause
                        songs={songs}
                        handlePause={handlePauseClick}
                        handlePlay={() => handlePlayClick(index)}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={index}
                        data={data}
                    />
                </div>
            </div>
        </>
    )
}

export default ToolBarDetail