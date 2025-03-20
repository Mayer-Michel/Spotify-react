import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const fetchAddRemoveFavorites = async (arrayIds, userId) => {

    const dataFavorite = {
        albums: arrayIds
    }

    try {
        // on doit ajouter la méthode patch a axios
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json";
        const response = await axios.patch(`${API_URL}/users/${userId}`, dataFavorite);
        if(response.status === 200){
        }else{
            console.log('erreur')
        }
    } catch (error) {
        console.log(`erreur lors du fetchAddRemoveFavorites: ${error}`);
        
    }
}