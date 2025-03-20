import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserPlaylists } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';

const Playlist = () => {
  // on récupère le hook dispatch pour envoyer une action
  const dispatch = useDispatch();
  // on récupère l'id de l'user depuis le context d'authentification
  const { userId} = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch, userId]);

  const {loading, userPlaylists} = useSelector(selectUserData);
  console.log(userPlaylists);
  
  return (
    loading ? <PageLoader />
    :
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestion des Playlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userPlaylists && userPlaylists.map((playlist) => (
            <div className='text-white'>
              {playlist.title}
            </div>
          ))}
        </div>
      </div>
  );
  
}

export default Playlist