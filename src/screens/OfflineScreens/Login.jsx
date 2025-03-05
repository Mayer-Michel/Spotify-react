import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/Ui/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/Authcontext';
import useSubscriptionCheck from '../../hooks/useSubscriptionCheck';
import { API_ROOT } from '../../constants/apiConstant';
import axios from 'axios';

const Login = () => {

  // on définit nos states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // On récupère depuis la methode signIn
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  // On verifie si l'user a un abonnement (uniquement après le login)
  const { isSubscribed, loading: checkingSubscription } = useSubscriptionCheck();

  useEffect(() => {
    if (user && !checkingSubscription) {
      if (isSubscribed) {
        navigate('/');
      } else {
        navigate('/subscription')
      }
    }
  }, [user, isSubscribed, checkingSubscription, navigate])


  const handleSubmit = async (event) => {
    event.preventDefault(); // on empêche le formulaire d'être envoyé 
    setLoading(true); // On passe Loading à true pour afficher le loader
    setErrorMessage(''); // On vide le message d'erreur

    try {
      const response = await axios.post(`${API_ROOT}/login`, { email, password });
      console.log(response.data);



      if (response.data.success === false) {
        setErrorMessage(response.data.message);
      } else {
        const loggedInUser = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        };
        signIn(loggedInUser);
        loggedInUser.isSubscribed = response.data?.isSubscribed;
        setUser(loggedInUser);
      }

    } catch (error) {
      setErrorMessage('Email et/ou mot de passe incorrect');
      console.log(`Erreur lors de la connexion: ${error}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-10'>
      <h1 className='title-h1'>Connectez vous !</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg space-y-5'>

        <CustomInput
          state={email}
          label={'Email'}
          type={'email'}
          callable={(e) => setEmail(e.target.value)}
        />

        <CustomInput
          state={password}
          label={'Password'}
          type={'password'}
          callable={(e) => setPassword(e.target.value)}
        />

        {/* gestion des messages d'erreurs */}
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        <p className='text-gray-400'>
          Pas encore de compte ? <Link to='/register' className='text-green font-vold hover:text-green_top'>Créer un compte</Link>
        </p>
        {/* bouton de soumission */}
        <div className='flex justify-center'>
          {loading ? (
            <ButtonLoader />
          ) : (
            <button type='submit' className='w-fully bg-green hover:bg-green_top text-white font-bold py-3 rounded-lg transition'>
              Se connecter
            </button>
          )}
        </div>

      </form>
    </div>
  )
}

export default Login