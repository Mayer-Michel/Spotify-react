import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/Authcontext";
import { USER_INFO } from "../constants/appConstant";
import useSubscriptionCheck from "../hooks/useSubscriptionCheck";
import PageLoader from "../components/Loader/PageLoader";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";

// Création d'un mini context pour la session
const SessionContext = createContext({inSession: false});

// Hook pour l'utiliser le contexte de session 
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
    // On crée un state pour gere la session 
    const [inSession, setInSession] = useState(null);
    // On récupère grace au hook les données de notre contexte d'authentification
    const { userId, setUserId, setEmail, setNickname } = useAuthContext();
    // On récupère les données de l'utilisateur dans le localStorage
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
    // On vérifie si l'utilisateur a un abonnement actif
    const {isSubscribed, loading: loadingSubscription} = useSubscriptionCheck(userInfo);

    useEffect(() => {
      const checkUserSession = async () => {
        if(userInfo){
            setUserId(userInfo.userId);
            setEmail(userInfo.email);
            setNickname(userInfo.nickname);
            setInSession(true);
        }else{
            setInSession(false);
        }
      }

      checkUserSession();

    }, [userId])
    
    // On affiche le loader le temps du chargement
    if(inSession === null || loadingSubscription){
        return <PageLoader />
    }

    return (
        <SessionContext.Provider value = {{inSession}}>
            <RouterProvider router={inSession && isSubscribed ? OnlineRouter : OfflineRouter} />
        </SessionContext.Provider>
    )

}

export default AppRouter;