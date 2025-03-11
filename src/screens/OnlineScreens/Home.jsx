import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../../store/album/albumSlice';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/Card/AlbumCard';
import selectAlbumData from '../../store/album/AlbumSelector';


const Home = () => {
  // On récupère le hook dispatch pour dispatch des actions de react-redux
  const dispatch = useDispatch();

  // Dans le useEffect on dispatch la méthode fetch pour récupèrer les albums en bdd
  useEffect(() => {
    dispatch(fetchAlbums());

  }, [dispatch])
  // On récupère les données des albums et le loading avec useSelector
  const { albums, loading } = useSelector(selectAlbumData);
  // On récupère les données du slice player
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dataAlbum = albums['hydra:member'];

  return (
    loading ? <PageLoader /> :
      <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Tous les albums</h2>
        <div className='flex flex-wrap justify-center sm:justify-start gap-8 mx-2'>
          {dataAlbum && dataAlbum.map((data, index) => (
            <AlbumCard
              key={index} // key: pour que chaque enfant de la boucle soit unique
              data={data} // data: les données de l'album
              songs={data.songs} // songs: le tableau de chansons de l'album
              isPlaying={isPlaying} // isPlaying: l'état si on est en lecture ou en pause
              activeSong={activeSong} // activeSong: les infos de la chanson en cours de lecture
              index={0} // index: l'index de la chanson dans son tableau
            />
          ))}
        </div>
      </div>

  )
}

export default Home