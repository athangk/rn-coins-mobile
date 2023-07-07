import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { CoinData } from '../../models/ModelsInterfaces';
import { RootState } from '../store';

type coins = CoinData;

const coinsAdapter = createEntityAdapter<coins>({
  selectId: (coins) => coins.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
});

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async () => {
  const response = await fetch('/api/coins');

  const result = (await response.json()) as CoinData[];
  return result;
});

const coinsSlice = createSlice({
  name: 'coins',
  initialState: coinsAdapter.getInitialState({
    loading: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        coinsAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectLoading = (state: RootState) => state.coins.loading;

export const { selectAll: selectCoins } = coinsAdapter.getSelectors(
  (state: RootState) => state.coins
);

export default coinsSlice.reducer;
