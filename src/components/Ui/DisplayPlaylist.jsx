import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../../constants/apiConstant';
import ButtonLoader from '../Loader/ButtonLoader';

const DisplayPlaylist = ({ userPlaylists, songId, callable }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handlePlaylistSong = async (playlistId, songId, arraySongs) => {
    
    // on reconstruit un tableau pour les songs
    try {
        setIsLoading(true);
        // on reconstruit un tableau pour les songs au format ['/api/songs/1', '/api/songs/2']
        let songs = [];
        arraySongs && arraySongs.map((song) => {
            songs.push(`/api/songs/${song.id}`);
        });
        // on ajout la nouvelle chanson si elle existe pas déja dans la playlist
        if (!songs.includes(`/api/songs/${songId}`)) {
            songs.push(`/api/songs/${songId}`);
        }else{
            setError('La chanson est dèja dans la playlist');
            setIsLoading(false);
            return;
        }
        const data = {
            songs: songs
        }
        // ajout la méthode patch a axios
        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
        const response = await axios.patch(`${API_URL}/playlists/${playlistId}`, data)
        if(response.status === 200){
            // TODO on fermera la popup
            callable();
        }else{
            setError('erreur lors de l\'ajout de la chanson dans la playlist');
        }
    } catch (error) {
        console.log(`erreur lors de l'ajout de la chanson dans la playlist: ${error}`);
        
    }finally{
        setIsLoading(false);
    }
    }

  return (
    <div className='flex flex-col m-3'>
        {error && <div className='text-red-500'>{error}</div>}
        {userPlaylists && userPlaylists.map((playlist, index) => {
            const playlistId = playlist?.id ?? 0;
            const title = (playlist?.title).toUpperCase() ?? '';
            const nbSongs = playlist?.songs?.length?? 0;
            const arraySongs = playlist?.songs ?? [];
            return (
                <div key={index} className='flex justify-between items-center p-2 rounded-lg m-2'>
                   <div> <span className='font-bold'>{title}</span> - {nbSongs} chansons</div>
                   {isLoading 
                   ? <ButtonLoader />
                   : <button onClick={() => handlePlaylistSong(playlistId, songId, arraySongs)} className='bg-green text-white p-1 rounded-lg cursor-pointer hover:bg-green-600'>Ajouter</button>}
                </div>
            )
        })}
    </div>
  )
}

export default DisplayPlaylist