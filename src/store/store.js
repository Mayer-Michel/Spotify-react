import { configureStore } from '@reduxjs/toolkit';
import planReducer from './plans/planSlice';

const store = configureStore({
    reducer: {
        // TODO: ajouter les reducers ici
        plans: planReducer
    }
});

export default store;