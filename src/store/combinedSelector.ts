import { createSelector } from '@reduxjs/toolkit';
import { CoinData } from '../models/ModelsInterfaces';
import { selectCoins } from './reducers/CoinSliceReducer';
import { selectTracks } from './reducers/TrackSliceReducer';

export const selectNonTracks = createSelector(
  [selectCoins, selectTracks],
  (coins, tracks) => {
    const currentCoins: CoinData[] = coins;
    const currentTracks: CoinData[] = tracks;
    const filteredTracks = currentCoins.filter(
      ({ id: a }) => !currentTracks.some(({ id: b }) => b === a)
    );

    return filteredTracks;
  }
);
