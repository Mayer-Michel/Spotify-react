import React, { useState } from 'react'
import { useAuthContext } from '../../../contexts/Authcontext'
import { useNavigate} from 'react-router-dom';
import CustomInput from '../../../components/Ui/CustomInput';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { USER_INFO } from '../../../constants/appConstant';
import { checkUser } from '../../../services/userService';
import axios from 'axios';
import { API_ROOT, API_URL } from '../../../constants/apiConstant';

const EditInfo = () => {
    // on récupère les infos de notre contexte d'autentification
    const { userId, nickname, email, signIn, signOut } = useAuthContext();
    // on récupère le hook de navigation
    const  navigate  = useNavigate();
    // on déclare nos states
    const [nicknameValue, setNicknameValue] = useState(nickname);
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); //on empêche le compoertement par defaut du formulaire        
        try {
            // on passe notre loader à true
            setIsLoading(true);
            // on vérifie que l'utilisateur en session est le bon
            const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
            // on vérifie que c'est le bon user 
            const userValid = await checkUser(userInfo);
            if (userValid) {
                // on vérifie que les champs sont remplis
                if (emailValue.length > 0 && passwordValue.length > 0 && nicknameValue.length > 0) {
                    // on continue et on va construire plusieurs petits tableaux de données
                    // on crée un tableau pour vérifier le mdp
                    const dataCheck = {
                        id: userId,
                        password: passwordValue
                    }
                    // on crée un tableau pour le patch (pour modifier les infos de l'user) on ne prend pas le mdp
                    const data = {
                        email: emailValue,
                        nickname: nicknameValue
                    }

                    // on crée un tableau pour les en-tet de la requete
                    const headers = {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }

                    try {
                        // requete qui vérifie si le mdp est correct
                        const responsePassword = await axios.post(`${API_ROOT}/check-password`, dataCheck, { headers });
                        if (responsePassword.data.response) {
                            // on vérifie que l'email n'est pas utiliser par un autre utilisateur
                            const responseEmail = await axios.get(`${API_URL}/users?email=${emailValue}`);
                            if (emailValue != email && responseEmail.data['hydra:member'].length > 0) {
                                // si l'email de l'input est different de l'email en session et que la response de la requete sort un resultat c'est que l'email est déjà utilisé
                                setError('Cet email est déjà utilisé');
                            } else {
                                // on peut modifier les infos de l'utilisateur en patch
                                axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                                const response = await axios.patch(`${API_URL}/users/${userId}`, data);
                                // on reconstruit un tableau pour mettre à jour la session
                                const user = {
                                    userId: response.data.id,
                                    email: response.data.email,
                                    nickname: response.data.nickname
                                }
                                // mise à jour du contexte d'authentification
                                signIn(user);
                                // on redirige vers la page de profil
                                navigate(`/account/${userId}`);
                            }
                        } else {
                            setError('Mot de passe incorrect');
                        }
                    } catch (error) {
                        console.log(`Erreur lors la vérification du mpd : ${error}`);
                    }

                }else{
                    setError('Veuillez remplir tous les champs');
                }
            } else {
                // on déconnecte l'utilisateur
                signOut();
                // on redirige vers la page de connexion
                navigate('/');
            }
        } catch (error) {
            console.log(`Erreur lors de la modification des infos : ${error}`);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
            <h2 className='text-white font-bold text-xl py-5'>Modifier mes infos</h2>
            <div className='text-red-500 font-bold mb-4'>{error}</div>
            <form onSubmit={handleSubmit} className='w-[350px] mx-auto'>
                <CustomInput
                    state={nicknameValue}
                    label={'Votre pseudo'}
                    type={'text'}
                    callable={(e) => setNicknameValue(e.target.value)}
                />
                <CustomInput
                    state={emailValue}
                    label={'Votre email'}
                    type={'email'}
                    callable={(e) => setEmailValue(e.target.value)}
                />
                <CustomInput
                    state={passwordValue}
                    label={'Votre mot de passe'}
                    type={'password'}
                    callable={(e) => setPasswordValue(e.target.value)}
                />

                <div className='flex items-center justify-center pt-5'>
                    {isLoading ? <ButtonLoader /> :
                        <button type='sybmit' className='bg-green-500 hover:bg-green_top text-white font-bold py-2 px-4 rounded-lg'>
                            Modifier mes infos
                        </button>
                    }
                </div>
            </form>
        </div>
    )
}

export default EditInfo