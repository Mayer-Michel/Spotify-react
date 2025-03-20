import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPlaylistDetail } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import HeaderDetail from '../../components/DetailPlaylist/HeaderDetail';
import ToolBarDetail from '../../components/DetailPlaylist/ToolBarDetail';

const PlaylistDetail = () => {
    // on récupère le hook useDispatch
    const dispatch = useDispatch();
    // on récupère le hook useParams pour récupèrer les paramètres de l'url
    const params = useParams();

    // on récupère l'id de la playlist dans l'url
    const { id } = params;
    useEffect(() => {      
        dispatch(fetchPlaylistDetail(id));
    }, [dispatch, id])
    
    const {loading, playlistDetail} = useSelector(selectUserData);
    console.log(playlistDetail);

    
  return (
    loading ? <PageLoader /> :
    <>
    <HeaderDetail dataPlaylist={playlistDetail}/>
    <ToolBarDetail dataPlaylist={playlistDetail}/>
    </>
  )
}

export default PlaylistDetail