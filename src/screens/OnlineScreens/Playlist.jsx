import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserPlaylists } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import { ALBUM_URL, IMAGE_URL } from '../../constants/apiConstant';
import { totalDuration } from '../../services/toolsService';
import { Link } from 'react-router-dom';

const Playlist = () => {
  // on récupère le hook dispatch pour envoyer une action
  const dispatch = useDispatch();
  // on récupère l'id de l'user depuis le context d'authentification
  const { userId } = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch, userId]);

  const { loading, userPlaylists } = useSelector(selectUserData);
  console.log(userPlaylists);

  return (
    loading ? <PageLoader />
      :
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestion des Playlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userPlaylists && userPlaylists.map((playlist, index) => {
            // on crée une const pour récupèrer la première image d'album aléatoire dans le tableau de songs, si tableau vide on récupèrel'image par defaut
            const imgPath = playlist.songs.length > 0
              ? `${ALBUM_URL}/${playlist.songs[0].album.imagePath}`
              : `${IMAGE_URL}/playlistLogo.png`;

            const title = playlist?.title ?? 'Playlist sans titre';
            // on récupère le nombre de chanson de la playlist
            const nbSongs = playlist?.songs?.length > 0
              ? playlist?.songs?.length == 1
                ? `${playlist?.songs?.length} chanson`
                : `${playlist?.songs?.length} chansons`
              : "Pas de titre";

            // on récupère la durée total de la playlist (1h 15m 30s)
            // const durationPlaylist = () => {
            //   // on va calculer le nombre de seconde pour tous les titres
            //   const totalSeconds = playlist?.songs && playlist?.songs.map(function (titre) {
            //     return parseInt(titre.duration);
            //   }).reduce(function (a, b) {
            //     return a + b;
            //   }, 0)

            //   // on va formater les secondess en heure, minutes, secondes
            //   const hours = Math.floor(totalSeconds / 3600);
            //   const minutes = Math.floor((totalSeconds % 3600) / 60);
            //   const seconds = totalSeconds % 60;

            //   // on retourne une string formaté sous la forme 1h 15min 30s
            //   return hours > 0
            //     ? `${hours}h ${minutes}min ${seconds}s`
            //     : `${minutes}min ${seconds}s`;
            // }

            return (
              <Link to={`/playlist-detail/${playlist?.id}`} key={index} className='text-white p-3 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] rounded-lg flex flex-col items-center justify-between'>
                <img src={imgPath} alt={`image de la playlists ${title}`} className='w-15 h-15 object-contain' />
                <h2 className='text-xl truncate font-bold py-3'>{title}</h2>
                <p className='text-base'>{nbSongs}</p>
                { playlist?.songs.length > 0 && <p className='text-base'>{totalDuration(playlist)}</p>}
              </Link>
            )
          })}
        </div>
      </div>
  );

}

export default Playlist