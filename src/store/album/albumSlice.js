import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
  name: "albums",
  initialState:{
    loading: false,
    albums: [],
    albumDetail: {},
    searchAlbum: [],
    searchTitle: [],
    searchArtist: []
  },
  reducers:{
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload['hydra:member'][0];
    },
    setSearchAlbum: (state, action) => {
    state.searchAlbum = action.payload
    },
    setSearchTitle: (state, action) => {
    state.searchTitle = action.payload
    },
    setSearchArtist: (state, action) => {
      state.searchArtist = action.payload
    }
  }
})

export const { setLoading, setAlbums, setAlbumDetail, setSearchAlbum, setSearchTitle, setSearchArtist } = albumSlice.actions;

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
    const response = await axios.get(`${API_URL}/albums?id=${id}&isActive=true`);
    dispatch(setAlbumDetail(response.data));
  } catch (error) {
    console.log(`erreur lors du fetchAlbumDetail: ${error}`);
  }finally{
    dispatch(setLoading(false))
  }
}

// méthode pour faire une recherche
export const fetchSearch = (search) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const responseAlbum = await axios.get(`${API_URL}/albums?page=1&title=${search}&isActive=true`);
    const responseSong = await axios.get(`${API_URL}/albums?page=1&songs.title=${search}&isActive=true`);
    const responseArtist = await axios.get(`${API_URL}/artists?page=1&name=${search}&albums.isActive=true`);

    dispatch(setSearchAlbum(responseAlbum.data));
    dispatch(setSearchTitle(responseSong.data));
    dispatch(setSearchArtist(responseArtist.data));
  } catch (error) {
    console.log(`erreur lors du fetchSearch: ${error}`)
  }finally{
    dispatch(setLoading(false));
  }
}

// méthode qui reset la recherche 
export const fetchResetSearch = () => async (dispatch) => {
  dispatch(setSearchAlbum([]));
  dispatch(setSearchTitle([]));
  dispatch(setSearchArtist([]));
}


export default albumSlice.reducer;