import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getForecastWeatherData = createAsyncThunk(
  'forecastWeather',
  async (args: { lat: number | null; lon: number | null }): Promise<any> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${args.lat}&lon=${args.lon}&appid=${API_KEY}`,
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return err;
    }
  },
);
