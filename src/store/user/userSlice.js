import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/apiConstant";
import axios from "axios";


const userSlice = createSlice({
    name: "users",
    initialState:{
        loading:false,
        userFavorites: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserFavorites: (state, action) => {
            state.userFavorites = action.payload;
        }
    }
})

export const { setLoading, setUserFavorites } = userSlice.actions;

// Méthode qui récupère les favoris d'un utilisateur
export const fetchUserFavorites = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/users/${userId}`)
        dispatch(setUserFavorites(response.data.albums));
    } catch (error) {
        console.log(`erreur lors du fetchUserFavorites : ${error}`);
    }finally{
        dispatch(setLoading(false));
    }
} 

export default userSlice.reducer;