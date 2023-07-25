import { configureStore } from '@reduxjs/toolkit';

import { shazamApi } from './services/shazamCore';
import playerReducer from './features/musicPlayerSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    player: playerReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([shazamApi.middleware]),
});
