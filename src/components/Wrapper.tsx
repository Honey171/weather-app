import CitySearch from './CitySearch';
import CurrentWeatherCard from './CurrentWeatherCard';
import ForecastWeatherCard from './ForecastWeatherCard';
import Spinner from './Spinner';
import { useAppSelector } from '../redux/hooks';

function Wrapper() {
  const loading = useAppSelector((state) => state.loading);

  return (
    <section className="bg-[#050A30]/70 lg:w-[62rem] mx-auto flex space-y-8 flex-col items-center justify-center lg:h-[45rem] rounded-xl py-5 px-5 md:px-10 lg:py-0 lg:px-0">
      {loading ? (
        <div className="text-white">
          <Spinner /> Loading city data...
        </div>
      ) : (
        ''
      )}
      <div
        className={`${
          loading === true ? 'hidden' : 'block'
        } flex flex-col items-center justify-center space-y-8 `}
      >
        <CitySearch />
        <CurrentWeatherCard />
        <ForecastWeatherCard />
      </div>
    </section>
  );
}

export default Wrapper;
