import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCoordinates } from './getCoordinates';
import { getForecastWeatherData } from './getForecastWeatherData';
import { getCurrentWeather } from './getCurrentWeather';
import { CurrentWeatherData } from '../types';
import { forecastWeatherData } from '../types';

interface types {
  searchTerm: string;
  lat: number | null;
  lon: number | null;
  loading: any | null;
  error: any | null;
  forecastData: forecastWeatherData;
  currentWeatherData: CurrentWeatherData;
}

const initialState: types = {
  searchTerm: '',
  lat: null,
  lon: null,
  error: null,
  forecastData: {} as forecastWeatherData,
  currentWeatherData: {} as CurrentWeatherData,
  loading: null,
};

export const citySlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    searchedCity: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoordinates.fulfilled, (state, action) => {
      state.lat = action.payload[0]?.lat;
      state.lon = action.payload[0]?.lon;
    });
    builder.addCase(getForecastWeatherData.fulfilled, (state, action) => {
      state.forecastData = action.payload;
      state.loading = false;
    });
    builder.addCase(getForecastWeatherData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.currentWeatherData = action.payload;
    });
  },
});

export const { reducer, actions } = citySlice;
