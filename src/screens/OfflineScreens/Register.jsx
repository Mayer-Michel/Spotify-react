import React, { useState } from 'react'
import CustomInput from '../../components/Ui/CustomInput';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Authcontext';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';
import ButtonLoader from '../../components/Loader/ButtonLoader';

const Register = () => {
  // on définit nos states
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // on empêche le formulaire d'être envoyé 
    setLoading(true); // On passe loading à true pour afficher le loader
    setErrorMessage(''); // On vide le message d'erreur

    try {
      const response = await axios.post(`${API_ROOT}/register`, {
        email,
        password,
        nickname
      });

      if (response.data.success === false) {
        setErrorMessage(response.data.message);
      } else {
        const loggedInUser = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        };
        signIn(loggedInUser);
        navigate('/subscription');
      }
    } catch (error) {
      console.log(`Erreur lors de la création du compte : ${error}`);
    } finally {
      setLoading(false); // On 
    }

  }
  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-10'>
      <h1 className='title-h1'>Inscrivez vous !</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg space-y-5'>

        <CustomInput
          state={nickname}
          label={'nickname'}
          type={'name'}
          callable={(e) => setNickname(e.target.value)}
        />
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

export default Register