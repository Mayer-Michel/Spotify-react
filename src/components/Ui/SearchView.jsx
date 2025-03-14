import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import selectAlbumData from '../../store/album/AlbumSelector';
import AlbumCard from '../Card/AlbumCard';
import ArtistCard from '../Card/ArtistCard';

const SearchView = ({word}) => {

    const [searchWord, stateSearchWord] = useState(word)
    // on récupère les infos du slice album
    const { searchAlbum, searchTitle, searchArtist } = useSelector(selectAlbumData);
    // on récupère les infos du slice player
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    // on déclare une const pour les données de l'album
    const dataAlbum = searchAlbum['hydra:member'];
    const dataTitle = searchTitle['hydra:member'];
    const dataArtist = searchArtist['hydra:member'];


    return (
        <>
            {dataAlbum && dataAlbum.length === 0 
            && dataTitle && dataTitle.length === 0
            && dataArtist && dataArtist.length === 0 &&
                (<h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>{`Aucun Résultat trouvé pour : ${searchWord}`}</h2>)}

            {/* partie album */}
            {dataAlbum && dataAlbum.length > 0
                ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>{`${dataAlbum.length} albums(s) trouvés(s) pour le mot: ${searchWord}`}</h2>
                : null}
            <div className='flex flex-wrap'>
                {dataAlbum && dataAlbum.map((data, index) => (
                    <div key={`album_${index}`} className='m-3 p-3'>
                        <AlbumCard
                            data={data}
                            songs={data?.songs}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={0}
                        />
                    </div>
                ))}
            </div>
            {/* partie title */}
            {dataTitle && dataTitle.length > 0
                ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>{`${dataTitle.length} titre(s) de chanson trouvés(s) pour le mot: ${searchWord}`}</h2>
                : null}
            <div className='flex flex-wrap'>
                {dataTitle && dataTitle.map((data, index) => (
                    <div key={`title_${index}`} className='m-3 p-3'>
                        <AlbumCard
                            data={data}
                            songs={data?.songs}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={0}
                        />
                    </div>
                ))}
            </div>
            {/* partie artist */}
            {dataArtist && dataArtist.length > 0
                ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>{`${dataArtist.length} artiste(s) trouvés(s) pour le mot: ${searchWord}`}</h2>
                : null}
            <div className='flex flex-wrap'>
                {dataArtist && dataArtist.map((data, index) => (
                    <div key={`artist_${index}`} className='m-3 p-3'>
                       <ArtistCard dataArtist={data} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchView;