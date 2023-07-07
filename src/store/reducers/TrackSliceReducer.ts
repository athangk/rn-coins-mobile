import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { CoinData } from '../../models/ModelsInterfaces';
import { RootState } from '../store';

type tracks = CoinData;

const tracksAdapter = createEntityAdapter<tracks>({
  selectId: (tracks) => tracks.id
});

export const fetchTracks = createAsyncThunk(
  'coins/fetchTracks',
  async (tracks: CoinData[]) => {
    const previousTracks = tracks;
    console.log(' PREVIOUS ', previousTracks);
    const response = await fetch('/api/coins');

    const result = (await response.json()) as CoinData[];

    const currentTrackList = result.filter((coin) =>
      previousTracks.some((track) => coin.id === track.id)
    );

    return currentTrackList;
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState: tracksAdapter.getInitialState({ loading: false }),
  reducers: {
    addTrack(state, action) {
      tracksAdapter.addOne(state, action.payload);
    },
    removeTrack(state, action) {
      tracksAdapter.removeOne(state, action.payload.id);
    },
    setAllTracks(state, action) {
      tracksAdapter.removeAll(state);
      tracksAdapter.setAll(state, action.payload);
    },
    removeAllTracks(state) {
      tracksAdapter.removeAll(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        tracksAdapter.upsertMany(state, action.payload);
        // tracksAdapter.removeAll(state);
        // tracksAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { addTrack, removeTrack, setAllTracks, removeAllTracks } =
  tracksSlice.actions;

export const selectLoading = (state: RootState) => state.tracks.loading;

export const { selectAll: selectTracks, selectById: selectByTrackId } =
  tracksAdapter.getSelectors((state: RootState) => state.tracks);

export const selectedSortedTracks = createSelector([selectTracks], (tracks) => {
  const currentTracks: CoinData[] = tracks;
  return currentTracks;
});

export default tracksSlice.reducer;
