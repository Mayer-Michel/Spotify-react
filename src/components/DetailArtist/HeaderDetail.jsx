import React from 'react'
import { ARTIST_URL, IMAGE_URL } from '../../constants/apiConstant';

const HeaderDetail = ({dataArtist}) => {
    // On récupère l'image de l'artiste s'il existe sinon on récupère une image par défaut
    const imgArtiste = dataArtist?.imagePath
    ? `${ARTIST_URL}/${dataArtist.imagePath}`
    : `${IMAGE_URL}/artist.png`;

    const artistName = dataArtist?.name ?? 'Artiste inconnu';
    
  return (
    <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
        <img src={imgArtiste} alt={`Image de l'artist ${artistName}`} className='w-48 h-48 m-1 rounded-full object-cover'/>
        <div className='ml-10 fex flex-col justify-end'>
            <h1 className='text-5xl font-vold text-white my-7'>{artistName}</h1>
        </div>
    </div>
  )
}

export default HeaderDetail