import { createSlice } from "@reduxjs/toolkit"

// On va initialiser nos states dans une constante
const initialState = {
    activeSong: {}, // Infos de la chanson en cours de lecture 
    currentAlbum: [], // Infos de l'ablum en cours de lecture 
    currentIndex: 0, // Index de la chanson en cours de lecture 
    currentSongs: [], // Tableau de chansons de l'ablum en cours de lecture
    isActive: false, // L'état du player
    isPlaying: false, // L'état si on est en lecture ou en pause 
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        // Mettre a jour les states tout ce qu'on stock lorsqu'on active un chanson
        setActiveSong: (state, action) => {
            console.log("action", action.payload);
            
            // Stockage de la chanson en lecture dans activeSong
            state.activeSong = action.payload?.songs[action.payload.index];
            // Stockage du tableau de chanson de l'album en cours de lecture
            state.currentSongs = action.payload?.songs;
            // Stockage de l'index de la chanson en cours de lecture
            state.currentIndex = action.payload?.index;
            // Stockage de l'état du player
            state.isActive = true;
        },

        // Recuperer les infos de l'album en cours de lecture
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data;
        },

        // Méthode pour avancer d'une piste
        nextSong: (state, action) => {
            // On doit mettre a jour activeSong avec la chanson suivante
            state.activeSong = state.currentSongs[action.payload];
            // On stock l'index de la chanson suivante
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        // Méthode pour reculer d'une piste
        prevSong: (state, action) => {
            // On doit mettre a jour activeSong avec la chanson suivante
            state.activeSong = state.currentSongs[action.payload];
            // On stock l'index de la chanson suivante
            state.currentIndex = action.payload;
            state.isActive = true;
        },

        // Méthode pour mettre en pause ou play
        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },
    }
})

// On export les reducers
export const { setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } = playerSlice.actions;
// On export le reducer
export default playerSlice.reducer;