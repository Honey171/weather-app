import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { actions } from '../redux/slice';
import { getCoordinates } from '../redux/getCoordinates';
import { getForecastWeatherData } from '../redux/getForecastWeatherData';
import { getCurrentWeather } from '../redux/getCurrentWeather';

function CitySearch() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const lat = useAppSelector((state) => state.lat);
  const lon = useAppSelector((state) => state.lon);
  const searchedValue = useAppSelector((state) => state.searchTerm);

  useEffect(() => {
    if (/\d/.test(searchedValue) === true) {
      setError(true);
    } else {
      setError(false);
    }
  }, [searchedValue]);

  useEffect(() => {
    if (searched && lat && lon !== null) {
      dispatch(getCurrentWeather({ lat, lon }));
      dispatch(getForecastWeatherData({ lat, lon })).then(() =>
        setSearched(false),
      );
    }
  }, [searched, lat, lon, dispatch]);

  return (
    <form>
      <input
        type="text"
        value={searchedValue}
        placeholder="Search a city"
        onChange={(e) => {
          dispatch(actions.searchedCity(e.target.value));
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && /\d/.test(searchedValue) === false) {
            e.preventDefault();
            dispatch(getCoordinates(searchedValue));
            dispatch(actions.searchedCity(''));
            setSearched(true);
          }
          if (e.key === 'Enter' && /\d/.test(searchedValue) === true) {
            e.preventDefault();
          }
        }}
        className="bg-[#0000FF] py-2 w-[21rem] rounded-md outline-none pl-2 focus:bg-[#7EC8E3] transition-colors duration-500 font-bold text-white placeholder:text-white focus:placeholder:text-black focus:text-black"
        tabIndex={1}
      />
      <div
        className={`absolute bg-red-900 text-white rounded-md px-1 translate-y-1 ${
          error ? 'opacity-100' : 'opacity-0'
        } transition-all duration-500`}
      >
        Please search with letter!
      </div>
    </form>
  );
}

export default CitySearch;
