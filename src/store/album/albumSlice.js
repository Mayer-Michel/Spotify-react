import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
  name: "albums",
  initialState:{
    loading: false,
    albums: [],
    albumDetail: {}
  },
  reducers:{
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload;
    }
  }
})

export const { setLoading, setAlbums, setAlbumDetail } = albumSlice.actions;

//méthode qui recupère tous les albums en bdd
export const fetchAlbums = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response =  await axios.get(`${API_URL}/albums?page=1&isActive=true`);
    dispatch(setAlbums(response.data));
   
  } catch (error) {
    console.log(`erreur lors de la récupération des albums: ${error}`);
  }finally{
    dispatch(setLoading(false));
  }
}

// méthode qui récupère les infos d'un album avec son id
export const fetchAlbumDetail = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/albums/${id}`);
    dispatch(setAlbumDetail(response.data));
  } catch (error) {
    console.log(`erreur lors de la récupèration du détail l'album: ${error}`);
  }finally{
    dispatch(setLoading(false))
  }
}

export default albumSlice.reducer;