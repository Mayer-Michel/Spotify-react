import React, { useEffect, useState } from 'react'
import { ALBUM_URL, ARTIST_URL } from '../../constants/apiConstant';
import PageLoader from '../Loader/PageLoader';
import { Link } from 'react-router-dom';

const HeaderInfo = ({ dataAlbum }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    // On récupère la photo d'artiste si elle existe sinon on retourne la photo d'album
    const imgPath = dataAlbum?.artist?.imagePath // si j'ai une image d'artiste
        ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}` // je prends l'image d'artiste
        : `${ALBUM_URL}/${dataAlbum?.imagePath}`; // sinon je prends l'image d'album

    // On format la date de sortie (on ne récupère l'année)
    const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear() ?? 'Date inconnue';

    // On définit le nombre de tittre par album
    const nbTitle = dataAlbum?.songs
        ? dataAlbum?.songs?.length > 1
            ? `${dataAlbum?.songs?.length} titres`
            : `${dataAlbum?.songs?.length} titre`
        : '0 titre';

    // On se créer un petit element graphique pour faire un point
    const Dot = () => (
        <p>&#8226;</p>
    )

    // Traitement de la durée total de l'album
    const durationAlbum = () => {
        // on va calculer le nombre de seconde pour tous les titres
        const totalSeconds = dataAlbum?.songs && dataAlbum?.songs.map(function (titre) {
            return parseInt(titre.duration);
        }).reduce(function (a, b) {
            return a + b;
        });

        // on va formater les secondess en heure, minutes, secondes
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // on retourne une string formaté sous la forme 1h 15min 30s
        return hours > 0
            ? `${hours}h ${minutes}min ${seconds}s`
            : `${minutes}min ${seconds}s`
    }

    return (
        isLoading ? <PageLoader /> :
            <div className='flex items-center'>
                <Link to={`/artist-detail/${dataAlbum?.artist?.id}`}>
                    <img src={imgPath} alt={dataAlbum?.artist?.name ?? 'photo artiste'} className='w-10 h-10 rounded-full object-cover' />
                </Link>
                <p className='font-bold text-base p-1'>{dataAlbum?.artist?.name ?? 'artiste inconnu'}</p>
                <Dot />
                <p className='font-bold text-base p-1'>{releaseDate}</p>
                <Dot />
                <p className='font-bold text-base p-1'>{nbTitle}</p>
                <Dot />
                <p className='font-bold text-base p-1'>{dataAlbum?.songs?.length > 0 ? durationAlbum() : 'Pas de titre'}</p>
            </div>
    )
}

export default HeaderInfo