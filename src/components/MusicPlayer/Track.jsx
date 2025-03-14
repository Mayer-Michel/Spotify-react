import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import selectArtistData from '../../store/artist/artistSelector';

const Track = ({ isPlaying, isActive, activeSong, currentAlbum, artist = 'artiste inconnu' }) => {
  //on recupère les infos de l'artiste depuis le store
  const { artistDetail } = useSelector(selectArtistData);
  //on récupère l'image de l'album
  const imgAlbum = `${ALBUM_URL}/${currentAlbum?.imagePath}`;
  const title = activeSong?.title ?? 'musique inconnue';
  const artistName = currentAlbum?.artist?.name
    ? currentAlbum?.artist?.name
    : artistDetail?.name
      ? artistDetail?.name
      : artist

  const album = currentAlbum?.title ?? 'album inconnnu';

  return (
    <div className='flex flex-1 items-center justify-start'>
      {/* on affiche l'image de l'album */}
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