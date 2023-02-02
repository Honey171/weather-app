import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../redux/hooks';

function CurrentWeatherCard() {
  const nodeRef = React.createRef<HTMLDivElement>();
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<string>('');
  const [direction, setDirection] = useState<string>('');
  const currentWeather = useAppSelector((state) => state.currentWeatherData);
  const forecastWeather = useAppSelector((state) => state.forecastData);
  const loading = useAppSelector((state) => state.loading);

  const degreeToDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    setDirection(directions[Math.floor((deg + 22.5) / 45) % 8]);
  };

  useEffect(() => {
    if (
      currentWeather.sys !== undefined &&
      forecastWeather.list !== undefined
    ) {
      const sunriseTime = new Date(
        (currentWeather.sys.sunrise + currentWeather.timezone) * 1000,
      );
      const sunriseHours = `${sunriseTime
        .getUTCHours()
        .toString()
        .padStart(2, '0')}:${sunriseTime
        .getUTCMinutes()
        .toString()
        .padStart(2, '0')}`;
      const sunsetTime = new Date(
        (currentWeather.sys.sunset + currentWeather.timezone) * 1000,
      );
      const sunsetHours = `${sunsetTime
        .getUTCHours()
        .toString()
        .padStart(2, '0')}:${sunsetTime
        .getUTCMinutes()
        .toString()
        .padStart(2, '0')}`;
      const current = new Date(
        forecastWeather.list[0].dt_txt.replace(/-/g, '/'),
      ).toLocaleString('default', { weekday: 'long' });
      setCurrentDay(current);
      setSunrise(sunriseHours);
      setSunset(sunsetHours);
      degreeToDirection(currentWeather.wind.deg);
    }
  }, [
    currentWeather.sys,
    currentWeather.dt,
    currentWeather.timezone,
    forecastWeather.list,
  ]);

  return (
    <CSSTransition
      in={!loading && currentWeather.weather !== undefined}
      timeout={700}
      classNames="my-comp"
      nodeRef={nodeRef}
    >
      <>
        {!loading && currentWeather.weather !== undefined && (
          <div
            className="bg-transparent w-[100%] md:w-[80%] space-y-10"
            ref={nodeRef}
          >
            <div className="flex justify-center items-center">
              <div className="flex flex-col space-y-2 font-bold justify-center">
                <div className="flex items-center justify-center space-x-4 max-w-sm">
                  <p className="text-[#7EC8E3] text-2xl">
                    {currentWeather.name}
                  </p>
                  <p className="text-white text-lg">
                    {currentWeather.sys.country}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 items-center justify-center">
                  <div className="flex items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                      alt=""
                      className="w-[7rem] h-[7rem] brightness-150"
                      loading="lazy"
                    />
                    <p className="text-[#7EC8E3]">
                      {currentWeather.weather[0].description
                        .charAt(0)
                        .toUpperCase() +
                        currentWeather.weather[0].description.slice(1)}
                    </p>
                  </div>
                  <p className="text-[#7EC8E3] text-lg">
                    Current day:{' '}
                    <span className="text-white">{currentDay}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-around">
              <div className="flex flex-col">
                <p className="text-[#7EC8E3] font-bold">
                  Wind speed:
                  <span className="text-white pl-1 font-medium">
                    {currentWeather.wind.speed}m/s
                  </span>
                </p>
                <p className="text-[#7EC8E3] font-bold">
                  Wind direction:
                  <span className="text-white pl-1 font-medium">
                    {direction}
                  </span>
                </p>
                <p className="text-[#7EC8E3] font-bold">
                  Sunrise:
                  <span className="text-white pl-1 font-medium">{sunrise}</span>
                </p>
                <p className="text-[#7EC8E3] font-bold">
                  Sunset:
                  <span className="text-white pl-1 font-medium">{sunset}</span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-white font-bold">
                  Temperature:
                  <span className="text-[#7EC8E3] pl-1 font-medium">
                    {Math.round(currentWeather.main.temp - 273.15)}°C
                  </span>
                </p>
                <p className="text-white font-bold">
                  Feels like:
                  <span className="text-[#7EC8E3] pl-1 font-medium">
                    {Math.round(currentWeather.main.feels_like - 273.15)}°C
                  </span>
                </p>
                <p className="text-white font-bold">
                  Humidity:
                  <span className="text-[#7EC8E3] pl-1 font-medium">
                    {currentWeather.main.humidity}%
                  </span>
                </p>
                <p className="text-white font-bold">
                  Pressure:
                  <span className="text-[#7EC8E3] pl-1 font-medium">
                    {currentWeather.main.pressure}hPa
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    </CSSTransition>
  );
}

export default CurrentWeatherCard;
