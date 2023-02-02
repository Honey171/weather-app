import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getCoordinates = createAsyncThunk(
  'coordinates',
  async (searchedValue: string): Promise<any> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchedValue}&limit=5&appid=${API_KEY}`,
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return err;
    }
  },
);
