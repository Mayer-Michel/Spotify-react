import React from 'react'
import { ALBUM_URL, IMAGE_URL } from '../../constants/apiConstant'
import HeaderInfo from './HeaderInfo';

const HeaderDetail = ({dataPlaylist}) => {
    // on récupère une image de la playlist (1ere u tableau de songs)
    const imgPlaylist = dataPlaylist?.songs?.length > 0 
    ? `${ALBUM_URL}/${dataPlaylist?.songs[0]?.album?.imagePath}`
    : `${IMAGE_URL}/playlistLogo.png`;

  return (
    <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
    <img src={imgPlaylist} alt={`image de l'album ${dataPlaylist?.title}`} className='w-48 h-48 m-1 rounded-full object-cover' />
    <div className='ml-10 flex flex-col justify-end'>
      <h1 className='text-5xl font-bold text-white my-7'>{dataPlaylist?.title}</h1>
      {/* ici on va afficher la barre d'info */}
      <HeaderInfo dataPlaylist={dataPlaylist} />
    </div>
  </div>
  )
}

export default HeaderDetail