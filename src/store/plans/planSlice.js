import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

// Le slice correspond à un rayon de magasin
const planSlice = createSlice({
    name: "plans", // On lui donne un nom unique
    initialState: {
        plans: [], // On initialise le state avec un tableau vide
        loading: false, // On initialise le state avec loading à false
    },
    reducers: {
        setPlans: (state, action) => {
            state.plans = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setPlans, setLoading } = planSlice.actions;

export const fetchPlans = () => async (dispatch) => {
    try {
        // On passe loading à true pour afficher le loader
        dispatch(setLoading(true));
        // On fait la request pour récupurer les abonnements de la bdd
        const response = await axios.get(`${API_URL}/subscription_plans?page=1`);
        // On met à jour le state plans avec les données reçues
        dispatch(setPlans(response.data));
        // On repasse loading à false pour cacher le loader 
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchPlans: ${error}`);
        // On repasse loading à false pour cacher le loader
        dispatch(setLoading(false));
    }
}


export default planSlice.reducer;