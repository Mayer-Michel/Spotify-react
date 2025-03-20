import React, { useEffect, useState } from 'react'
import { USER_INFO } from '../../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import selectUserData from '../../store/user/userSelector';
import { fetchUserFavorites } from '../../store/user/userSlice';
import PageLoader from '../Loader/PageLoader';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import { fetchAddRemoveFavorites } from '../../services/userFavoritesService';
import PlayPause from '../Services/PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';

const ToolbarDetail = ({ dataAlbum }) => {
    //on redéclare des constantes
    const data = dataAlbum;
    const songs = dataAlbum?.songs;
    //on récupère l'id de l'album
    const albumId = dataAlbum?.id;
    //on récupère l'id de l'user en session
    const userId = localStorage.getItem(USER_INFO)
        ? JSON.parse(localStorage.getItem(USER_INFO)).userId
        : null;

    //on déclare nos states
    const [index, setIndex] = useState(0); // pour l'index des chanson
    const [isLoading, setIsLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false); // pour ouvrir ou fermer la collapse
    const [isInList, setIsInList] = useState(false); // pour savoir si l'album est dans la liste des favoris
    const [listArray, setListArray] = useState([]); // tableau d'uri des albums favoris (au format '/api/albums/id')

    //on récupère les hook
    const dispatch = useDispatch();

    //on va faire les courses (on récupère les info du store)
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    //on récupère la liste des favories de l'utilisateur
    const { loading, userFavorites } = useSelector(selectUserData);


    useEffect(() => {
        dispatch(fetchUserFavorites(userId));
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        checkFavorite();
    }, [loading])

    //méthode qui vérifie si l'album est dans la liste des favories
    const checkFavorite = () => {
        //si l'utilisateur a des favories
        if (userFavorites) {

            // on récupère les id des albums favoris reconstruit en uri 
            const idArray = userFavorites.map((item) => `/api/albums/${item.id}`);

            //on set la liste dans notre state en supprimant les doublons
            setListArray([...new Set(idArray)]);

            //on vérifie si l'album est dans la liste
            if (idArray.includes(`/api/albums/${albumId}`)) {
                // on set isInList à true
                setIsInList(true);
            }
        }
    }

    // Méthode lorsqu'on met pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
    }

    // Méthode lorsqu'on met play
    const handlePlayClick = (index) => {
        console.log('CCCC', songs, data, index)
        dispatch(setActiveSong({ songs, data, index }));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

    // Méthode pour gérer le favorie (pour ajouter ou supprimer un album des favories)
    const toggleFavorite = async () => {
        // on va créer une copie de listArray
        let updatedListArray = [...listArray];

        // on vérifie si l'album est dans la liste
        if (isInList) {
            // si oui doit le retirer
            updatedListArray = listArray.filter((item) => item !== `/api/albums/${albumId}`);
        } else {
            updatedListArray.push(`/api/albums/${albumId}`);
        }

        // on appelle le service pour mettre à jour les favoris dans la bdd
        await fetchAddRemoveFavorites(updatedListArray, userId);

        setListArray(updatedListArray);
        setIsInList(!isInList);
    }

    // Méthode pour ouvrir/fermer le collapse
    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        loading ? <PageLoader /> :
            <>
                <div className='flex items-center ml-5'>
                    <div className='cursor-pointer mr-3'>
                        {/* bouton play/pause */}
                        <PlayPause
                            songs={songs}
                            handlePause={handlePauseClick}
                            handlePlay={() => handlePlayClick(index)}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={index}
                            data={data}
                        />
                    </div>
                    {/* bouton favorie */}
                    <div className='cursor-pointer' onClick={() => toggleFavorite()}>
                        {isInList
                            ? <AiFillHeart size={30} className='text-green m-3' />
                            : <AiOutlineHeart size={30} className='text-green m-3' />
                        }
                    </div>
                    {/* bouton collapse */}
                    <div className='cursor-pointer' onClick={handleCollapseClick}>
                        {isCollapsed
                            ? <AiFillInfoCircle size={30} className='text-green m-3' />
                            : <AiOutlineInfoCircle size={30} className='text-green m-3' />
                        }
                    </div>
                </div>
                <div>
                    <Collapse isOpened={isCollapsed}>
                        {/* recuperer le renndu du collapse */}
                        <InfoCollapse dataAlbum={dataAlbum} />
                    </Collapse>
                </div>
            </>
    )
}

export default ToolbarDetail