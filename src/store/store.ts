import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authSliceReducer from './reducers/AuthSliceReducer';
import coinsSliceReducer from './reducers/CoinSliceReducer';
import tracksSliceReducer from './reducers/TrackSliceReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';

const reducers = combineReducers({
  coins: persistReducer(
    {
      key: 'coins',
      storage: AsyncStorage
    },
    coinsSliceReducer
  ),
  tracks: persistReducer(
    {
      key: 'tracks',
      storage: AsyncStorage
    },
    tracksSliceReducer
  ),
  auth: authSliceReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
