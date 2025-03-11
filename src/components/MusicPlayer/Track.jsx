import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'

const Track = ({ isPlaying, isActive, activeSong, currentAlbum }) => {

    // On récupère l'image de l'album
    const imgAlbum = `${ALBUM_URL}/${currentAlbum?.imagePath}`;
    const title = activeSong?.title ?? 'musique inconnue';
    const artistName = currentAlbum?.artist?.name ?? 'artiste inconnu';
    const album = currentAlbum?.title ?? 'album inconnu';

    return (
        <div className='flex flex-1 items-center justify-start'>
            {/* On affiche l'image de l'album */}
            <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block w-16 h-16 mr-4 `}>
                <img src={imgAlbum} alt={`image album ${album}`} className='rounded-full' />
            </div>
            <div className='w-[50%]'>
                <p className='truncate text-white font-bold text-lg'>{title}</p>
                <p className='truncate text-gray-500'>{artistName}</p>
            </div>
        </div>
    )
}

export default Track