/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';

export const planesAdapter = createEntityAdapter();

const initialState = planesAdapter.getInitialState({ status: 'idle' });

export const fetchPlanes = createAsyncThunk('api/planes', async () => {
  const cookie = new Cookies();
  const { data } = await axios.get('https://air-taxi.herokuapp.com/api/v1/planes', {
    headers: {
      Authorization: `${cookie.get('MyToken')}`,
    },
  });
  return data;
});

export const createPlane = createAsyncThunk('api/planes', async ({
  model, registration, cruise_speed, description, tour_price, image,
}) => {
  const cookie = new Cookies();
  const { data } = await axios.post('https://air-taxi.herokuapp.com/api/v1/planes', {
    model, registration, cruise_speed, description, tour_price, image,
  }, {
    headers: {
      Authorization: `${cookie.get('MyToken')}`,
    },
  });
  return data;
});

const planesSlice = createSlice({
  name: 'planes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlanes.fulfilled, planesAdapter.upsertMany)
      .addCase(fetchPlanes.rejected, (state) => {
        state.status = 'idle';
      });
  },
});

export const {
  selectById: selectPlaneById,
  selectIds: selectPlaneId,
  selectEntities: selectPlaneEntitites,
  selectAll: selectAllPlanes,
  selectTotal: selectTotalPlane,
} = planesAdapter.getSelectors((state) => state.planes);

export default planesSlice.reducer;
