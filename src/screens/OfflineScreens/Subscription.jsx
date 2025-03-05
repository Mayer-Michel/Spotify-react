import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchPlans } from '../../store/plans/planSlice';
import planSelector from '../../store/plans/planSelector';
import useAuthCheck from '../../hooks/useAuthCheck';
import { USER_INFO } from '../../constants/appConstant';
import PageLoader from '../../components/Loader/PageLoader';
import OfferCard from '../../components/Card/OfferCard';

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
    console.log(stripePriceId)
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
              onSubscribe={()=> handleSubscription(plan.stripePriceId)}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Subscription