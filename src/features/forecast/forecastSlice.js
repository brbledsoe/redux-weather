import { current } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFiveDayForecast } from './forecastAPI';//this is some 
import axios from "axios";
const ROOT_URL =  `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = "948ee37ea38c7bc204af5017eb8a2c87";

const initialState = {
  defaultCity: "Houston",
  forecasts: [],
  loading: false,
  error: null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCityForecast = createAsyncThunk(
  'fetchCityForecast',
  async (city) => {
      try{
        const response = await getFiveDayForecast(city);
        // debugger;
        return response.data;
      }catch(error){
        throw Error(error);
      }
  }
);


export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
      
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
      builder
        .addCase(fetchCityForecast.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchCityForecast.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false;
        })
        .addCase(fetchCityForecast.fulfilled, (state, action) => {
          state.loading = false;
          state.error = false;
          state.forecasts.push(action.payload);
        })
    },
});


export default forecastSlice.reducer;

export const selectForecasts = (state) => state.weather.forecasts;
export const selectLoading = (state) => state.weather.loading;
export const selectError = (state) => state.weather.error;
export const selectDefaultCity = (state) => state.weather.defaultCity;

