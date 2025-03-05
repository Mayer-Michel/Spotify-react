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
        if (subscription[0]?.status == 'active') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Erreur sur le checkSubscription : ${error}`);
        return false;
    }
}

/**
 * Méthode qui vérifie que l'utilisateur du local storage est bien celui de la bdd
 * @param [object] userInfo - l'utilisateur du local storage
 * @return {boolean} -true si  l'utilisateur est bien celui de la bdd, false sinon
 */
export const checkUser = async (userInfo) => {
    try {
        // On récupère l'utilisateur dans le bdd avec l'id qui est en local storage
        const response = await axios.get(`${API_URL}/users/${userInfo.userId}`);
        const user = response.data;
        // maintenant on va comparer les données de la bdd avec celle du local storage
        if (user.email === userInfo.email && user.nickname === userInfo.nickname) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`Erreur sur le checkUser: ${error}`);
        return false;
    }
}