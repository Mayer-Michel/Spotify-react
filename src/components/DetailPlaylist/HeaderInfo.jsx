import React from 'react'
import PageLoader from '../Loader/PageLoader';
import { totalDuration } from '../../services/toolsService';

const HeaderInfo = ({ dataPlaylist }) => {

    // On définit le nombre de tittre par album
    const nbTitle = dataPlaylist?.songs
        ? dataPlaylist?.songs?.length > 1
            ? `${dataPlaylist?.songs?.length} titres`
            : `${dataPlaylist?.songs?.length} titre`
        : '0 titre';

    // On se créer un petit element graphique pour faire un point
    const Dot = () => (
        <p>&#8226;</p>
    )
    return (
        <div className='flex items-center'>
            <p className='font-bold text-base p-1'>{nbTitle}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{dataPlaylist?.songs?.length > 0 ? totalDuration(dataPlaylist) : 'Pas de titre'}</p>
        </div>
    )
}

export default HeaderInfo