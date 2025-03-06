import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchPlans } from '../../store/plans/planSlice';
import planSelector from '../../store/plans/planSelector';
import useAuthCheck from '../../hooks/useAuthCheck';
import { USER_INFO } from '../../constants/appConstant';
import PageLoader from '../../components/Loader/PageLoader';
import OfferCard from '../../components/Card/OfferCard';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

function Subscription() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)

  // On récupère les infos de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO));

  //  On appelle notre hook de verification de l'utilisateur
  useAuthCheck(userInfo);

  useEffect(() => {
    // On appelle la méthode fetchPlan depuis notre slice en utilisant dispatch
    dispatch(fetchPlans());

  }, [dispatch])

  // On recupère les infos du slice plans 
  const { plans, loading } = useSelector(planSelector);
  const dataPlans = plans['hydra:member'];
  // Méthode qui récupère le choix de l'abonnement
  const handleSubscription = async (stripePriceId) => {
    try {
      // On récuperer l'email de l'utilisateur en localstorage
      const email = userInfo.email
      setIsLoading(true);

      const response = await axios.post(`${API_ROOT}/create-checkout-session`, { email, stripePriceId });
      const data = response.data;

      if (data.checkoutUrl) {
        window.location.href =data.checkoutUrl; // redirection vers la page de paiement de stripe
      } else {
        console.log(`erreur stripe: ${data.error}`);
      }
    } catch (error) {
      console.log(`erreur lors de la création de la session de paiement: ${error}`);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full py-10 px-6 bg-black rounded-lg'>
      <h2 className='text-white font-extrabold text-3xl py-6 text-center'>
        Choisissez votre abonnement
      </h2>
      {loading ? (
        <PageLoader />
      ) : (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
          {dataPlans && dataPlans.map((plan) => (
            <OfferCard
              key={plan?.id}
              plan={plan}
              onSubscribe={() => handleSubscription(plan.stripePriceId)}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Subscription