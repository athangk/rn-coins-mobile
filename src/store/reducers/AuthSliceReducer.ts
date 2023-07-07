import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { SECURE_STORAGE_KEY } from '../../constants';
import { AuthData, LoginData, TokenData } from '../../models/ModelsInterfaces';
import { getSecureValue, secureSave } from '../../utilities/utils';
import { RootState } from '../store';

type auth = AuthData;
const authAdapter = createEntityAdapter<auth>({
  selectId: (auth) => auth.id
});

export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser',
  async (
    { username, password, rememberMe }: LoginData,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });

      if (!response.ok) {
        throw new Error('error in thunk');
      }
      const result = await response.json();

      if (rememberMe) {
        secureSave(SECURE_STORAGE_KEY, result.token);
      }

      const tempResult: AuthData = {
        id: result.id,
        username: result.username,
        lastVisit: result.lastVisit
      };

      return tempResult;
    } catch (error) {
      return rejectWithValue({ message: 'error in thunk' });
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async ({ token }: TokenData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('error in thunk');
      }
      const result = await response.json();

      const tempResult: AuthData = {
        id: result.id,
        username: result.username,
        lastVisit: result.lastVisit
      };

      return tempResult;
    } catch (error) {
      return rejectWithValue({ message: 'error in thunk' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState({
    loading: false,
    success: false,
    error: <null | string>null
  }),
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
    resetAuthUser(state) {
      authAdapter.removeAll(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        authAdapter.setOne(state, action.payload);
        getSecureValue(SECURE_STORAGE_KEY);
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        authAdapter.setOne(state, action.payload);
        getSecureValue(SECURE_STORAGE_KEY);
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      });
  }
});

export const { resetSuccess, resetAuthUser } = authSlice.actions;

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectSuccess = (state: RootState) => state.auth.success;
export const selectError = (state: RootState) => state.auth.error;
export const selectFetchAuthUser = (state: RootState) => state.auth;

export const { selectAll: selectUsers } = authAdapter.getSelectors(
  (state: RootState) => state.auth
);

export const getAuthState = (state: RootState) => state;

const { selectById } = authAdapter.getSelectors();

export const selectCurrentUser = createSelector(getAuthState, (state) =>
  selectById(state.auth, state.auth.ids.length)
);

export default authSlice.reducer;
