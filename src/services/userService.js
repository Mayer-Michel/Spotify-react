import axios from "axios";
import { API_URL } from "../constants/apiConstant";

/**
 * Méthode qui vérifie si l'utilisateur a bien un abonnement actif
 * @param {string} email - email de l'utilisateur 
 * @returns {boolean} - true si l'utilisateur a un abonnement actif, false sinon
 */
export const checkSubscription = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/user_subscriptions?page=1&user.email=${email}`)
        const subscription = response.data['hydra:member'];
        // On vérifie si l'utilisateur a un abonnement actif
        if(subscription[0]?.status == 'active'){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(`Erreur sur le checkSubscription : ${error}`);
        return false;
    }
}