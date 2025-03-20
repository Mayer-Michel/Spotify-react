import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { IoCloseCircle } from 'react-icons/io5'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import CustomInput from './CustomInput';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';
import { useAuthContext } from '../../contexts/Authcontext';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPlaylist from './DisplayPlaylist';
import ButtonLoader from '../Loader/ButtonLoader';
import {fetchUserPlaylists} from '../../store/user/userSlice'
import selectUserData from '../../store/user/userSelector'
import PageLoader from '../Loader/PageLoader';

const PopupPlaylist = ({ callable, songId }) => {
    // on récupère le hook useDispatch
    const dispatch = useDispatch();
    // on décclare nos states
    const [isCollapse, setIsCollapse] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    // onrécupère l'id de l'utilisateur depuis le contexte d'authentification
    const {userId} = useAuthContext();

    useEffect(() => {
        dispatch(fetchUserPlaylists(userId));
    }, [dispatch, userId])

    // on récupère les playlists de l'utilisateur 
    const {loading, userPlaylists} = useSelector(selectUserData)
    

    // permet de faire apparaitre ou disparaitre le collapse
    const toggleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

    // méthode qui crée une nouvelle playlist
    const handleSubmit = async (e) => {
        e.preventDefault(); // empeche le comportement naturel du formulaire 
        try {
            setError('')
            const data = {
                title: name.trim(),
                user: `/api/users/${userId}`
            }
            setIsLoading(true);
            if (data.title === '') {
                setError('Le nom de la playlist ne peut pas être vide')
                return;
            }
            const response = await axios.post(`${API_URL}/playlists`, data)
            if(response.status === 201){
                setSuccess('La playlist a bien été ajoutée');
                setName('');
                setIsCollapse(false);
                displaySuccess();
                dispatch(fetchUserPlaylists(userId));
            }
        } catch (error) {
            setError("Erruer est survenue lors de l'ajot de la playlist");
            displaySuccess();
            console.log(`erreur lors de l'ajout de la playlist : ${error}`);
        }finally{
            setIsLoading(false)
        }
    }

    // permet d'effacer les messages success et error 
    const displaySuccess = () => {
        setTimeout(( ) => {
            setSuccess('')
            setError('')
        }, 3000)
    }

    return (
        <div className='z-30 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center backdrop-blur-lg'>
            <div className='relative w-full sm:w-2/3 lg:w-1/2 h-1/2 bg-black rounded-lg border border-green flex flex-col overflow-y-scroll'>
                <div className='absolute top-2 right-2 cursor-pointer hover:scale-110' onClick={callable}>
                    <IoCloseCircle size={20} color='red' />
                </div>
                <h2 className='text-white text-2xl py-4 text-center'>Ajouter à la playlist</h2>
                {success && <p className='text-green text-center'>{success}</p>}
                {error && <p className='text-red-500 text-center'>{error}</p>}
                {/* bouton pour créer une nouvelle playlist */}
                <div className={`flex items-center self-center py-2 px-4 rounded-lg cursor-pointer
                   ${isCollapse
                        ? ' bg-red-600 hover:bg-red-800'
                        : ' bg-green hover:bg-green_top'}`} onClick={() => toggleCollapse()}>
                    {isCollapse
                    ? <MdOutlineCancel size={20} color='white' />         
                    : <MdAdd size={20} color='white' />
                    }
                    <button className='cursor-pointer'>
                        {isCollapse
                            ? "Annuler"
                            : "Ajouter une playlist"}
                    </button>

                </div>
                {/* formulaire d'ajout de playlist */}
                <div className='flex justify-center py-4'>

                    <Collapse isOpened={isCollapse}>
                        <form onSubmit={handleSubmit}>
                            <CustomInput
                                state={name}
                                label='Nom de la playlist'
                                type='text'
                                callable={(e) => setName(e.target.value)}
                            />
                            {isLoading 
                            ? <ButtonLoader />
                            : 
                            <button
                                type='submit'
                                className='w-full bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded-lg cursor-pointer'>
                                Enregistrer
                            </button>}
                        </form>
                    </Collapse>
                </div>
                {/* affichage de playlists existantes */}
                {loading 
                ? <PageLoader/> 
                :<DisplayPlaylist userPlaylists={userPlaylists} songId={songId} callable={callable}/>}
            </div>
        </div >
    )
}

export default PopupPlaylist