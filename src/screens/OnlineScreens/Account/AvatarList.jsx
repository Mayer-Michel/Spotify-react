import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../../contexts/Authcontext';
import { useNavigate } from 'react-router-dom';
import { fetchAvatars } from '../../../store/user/userSlice';
import selectUserData from '../../../store/user/userSelector';
import PageLoader from '../../../components/Loader/PageLoader';
import { API_URL, AVATAR_URL } from '../../../constants/apiConstant';
import axios from 'axios';

const AvatarList = () => {
    // On récupère le hook useDispatch
    const dispatch = useDispatch();
    // on récupère l'id de l'user depuis le context d'authentification
    const { userId } = useAuthContext();
    // on récupère le hook de navigation
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAvatars());
    }, [dispatch]);

    const { loading, avatars } = useSelector(selectUserData);

    // méthode pour changer l'avatar avec then et catch
    // const handleClick = (avatarId) => {
    //     console.log(avatarId);
    //     const data = {
    //         avatar: `/api/avatars/${avatarId}`
    //     }
    //     // On va effectuer une requete en patch sur user pour changer l'avatar
    //     // on doit renseigner a axios la méthode patch
    //     axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';

    //     axios.patch(`${API_URL}/users/${userId}`, data)
    //     .then((response)=>{
    //         if(response.status === 200){
    //             navigate(`/account/${userId}`);
    //         }
    //     })
    //     .catch((error)=>{
    //         console.log(`erreur lors du changement d'avatar : ${error}`);
    //     })
    // }

    // méthode pour changer mettre à jour l'avatar avec async et await
    const handleClick = async (avatarId) => {
        try {
            const data = {
                avatar: `/api/avatars/${avatarId}`
            }
            // on va effectuer une requete en patch sur user pour changer l'avatar
            // on doit renseigner a axios la méthode patch
            axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
            const response = await axios.patch(`${API_URL}/users/${userId}`, data);
            if (response.status === 200) {
                navigate(`/account/${userId}`);
            }
        } catch (error) {
            console.log(`erreur lors du changement d'avatar : ${error}`);
        }
    }

    return (
        loading ? <PageLoader /> :
            <>
                <h2 className='text-white text-3xl font-bold text-center pt-6'>Choisir un nouvel avatar</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-5 m-10'>
                    {avatars && avatars.map((avatar) => (
                        <div className='w-30 h-30 cursor-pointer' 
                        key={avatar.id}
                        onClick={() => handleClick(avatar.id)}>
                            <img 
                            src={`${AVATAR_URL}/${avatar.imagePath}`} 
                            alt="image avatar" 
                            className='w-full h-full rounded-4xl object-contain' 
                            />
                        </div>
                    ))}
                </div>
            </>
    )
}

export default AvatarList