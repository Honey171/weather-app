import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

function ForecastWeatherCard() {
  const ref = React.createRef<HTMLDivElement>();
  const [one, setOne] = useState<string>('');
  const [two, setTwo] = useState<string>('');
  const [three, setThree] = useState<string>('');
  const [four, setFour] = useState<string>('');
  const forecastWeather = useAppSelector((state) => state.forecastData);
  const [currentPos, setCurrentPos] = useState<number>(0);
  const [carouselWrapper, setCarouselWrapper] = useState<any>();
  const [carouselEnd, setCarouselEnd] = useState<boolean>(false);
  const [carouselStart, setCarouselStart] = useState<boolean>(false);
  const loading = useAppSelector((state) => state.loading);

  useEffect(() => {
    const carousel = ref.current;
    setCarouselWrapper(carousel);
    if (carousel) {
      carousel.scrollLeft = currentPos * carousel.clientWidth;
      if (
        Math.trunc(carousel.scrollWidth / carousel.clientWidth) === currentPos
      ) {
        setCarouselEnd(true);
      } else {
        setCarouselEnd(false);
      }
    }
    if (currentPos === 0) {
      setCarouselStart(true);
    } else {
      setCarouselStart(false);
    }
  }, [currentPos, ref]);

  const nextItem = () => {
    setCurrentPos(
      (currentPos) => (currentPos + 1) % carouselWrapper.childNodes.length,
    );
  };

  const prevItem = () => {
    setCurrentPos(
      (currentPos) =>
        (currentPos - 1 + carouselWrapper.childNodes.length) %
        carouselWrapper.childNodes.length,
    );
  };

  useEffect(() => {
    if (forecastWeather.list !== undefined) {
      const oneDayLater = new Date(
        forecastWeather.list[4].dt_txt.replace(/-/g, '/'),
      ).toLocaleString('default', { weekday: 'long' });
      const twoDayLater = new Date(
        forecastWeather.list[12].dt_txt.replace(/-/g, '/'),
      ).toLocaleString('default', { weekday: 'long' });
      const threeDayLater = new Date(
        forecastWeather.list[20].dt_txt.replace(/-/g, '/'),
      ).toLocaleString('default', { weekday: 'long' });
      const fourDayLater = new Date(
        forecastWeather.list[28].dt_txt.replace(/-/g, '/'),
      ).toLocaleString('default', { weekday: 'long' });
      setOne(oneDayLater);
      setTwo(twoDayLater);
      setThree(threeDayLater);
      setFour(fourDayLater);
    }
  }, [forecastWeather.list]);

  return (
    <CSSTransition
      in={!loading && forecastWeather.list !== undefined}
      timeout={900}
      classNames="my-node"
      nodeRef={ref}
    >
      <>
        {!loading && forecastWeather.list !== undefined && (
          <div className={`relative`}>
            <div className="flex items-center space-x-7 absolute right-0 text-lg text-white lg:hidden">
              {!carouselStart && (
                <div
                  className="cursor-pointer absolute"
                  onClick={prevItem}
                >
                  <AiOutlineLeft />
                </div>
              )}
              {!carouselEnd && (
                <div
                  className="cursor-pointer absolute"
                  onClick={nextItem}
                >
                  <AiOutlineRight />
                </div>
              )}
            </div>
            <div
              className="flex flex-row gap-10 pb-2 px-2 md:w-[470px] w-[230px] overflow-auto lg:w-auto scrollbar-hide scroll-smooth"
              ref={ref}
            >
              <div
                className="flex flex-col font-bold w-[195px] px-2 py-2 rounded-md shadow-md shadow-[#7EC8E3] lg:hover:scale-105 lg:focus:scale-105 transition-all duration-300 outline-none"
                tabIndex={2}
              >
                <div className="flex items-center justify-between w-[180px] text-white">
                  <p>{one}</p> <p className="text-sm">Feels like</p>
                </div>
                <div className="text-[13px] flex flex-row items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[5].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[5].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(forecastWeather.list[5].main.temp - 273.15)}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[6].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[6].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(forecastWeather.list[6].main.temp - 273.15)}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[7].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[7].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(forecastWeather.list[7].main.temp - 273.15)}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[8].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[8].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(forecastWeather.list[8].main.temp - 273.15)}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[9].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[9].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(forecastWeather.list[9].main.temp - 273.15)}
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <div className="text-[13px] flex flex-col space-y-[0.65rem] items-center text-[#7EC8E3]">
                      <span>
                        {Math.round(
                          forecastWeather.list[5].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[6].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[7].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[8].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[9].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col font-bold w-[195px] px-2 py-2 rounded-md shadow-md shadow-[#7EC8E3] lg:hover:scale-105 lg:focus:scale-105 transition-all duration-300 outline-none"
                tabIndex={2}
              >
                <div className="flex items-center justify-between w-[180px] text-white">
                  <p>{two}</p> <p className="text-sm">Feels like</p>
                </div>
                <div className="text-[13px] flex flex-row items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[13].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[13].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[13].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[14].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[14].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[14].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[15].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[15].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[15].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[16].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[16].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[16].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[17].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[17].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[17].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <div className="text-[13px] flex flex-col space-y-[0.65rem] items-center text-[#7EC8E3]">
                      <span>
                        {Math.round(
                          forecastWeather.list[13].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[14].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[15].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[16].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[17].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col font-bold w-[195px] px-2 py-2 rounded-md shadow-md shadow-[#7EC8E3] lg:hover:scale-105 lg:focus:scale-105 transition-all duration-300 outline-none"
                tabIndex={2}
              >
                <div className="flex items-center justify-between w-[180px] text-white">
                  <p>{three}</p> <p className="text-sm">Feels like</p>
                </div>
                <div className="text-[13px] flex flex-row items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[21].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[21].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[21].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[22].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[22].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[22].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[23].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[23].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[23].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[24].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[24].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[24].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[25].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[25].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[25].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <div className="text-[13px] flex flex-col space-y-[0.65rem] items-center text-[#7EC8E3]">
                      <span>
                        {Math.round(
                          forecastWeather.list[21].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[22].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[23].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[24].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[25].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col font-bold w-[195px] px-2 py-2 rounded-md shadow-md shadow-[#7EC8E3] lg:hover:scale-105 lg:focus:scale-105 transition-all duration-300 outline-none"
                tabIndex={2}
              >
                <div className="flex items-center justify-between w-[180px] text-white">
                  <p>{four}</p> <p className="text-sm">Feels like</p>
                </div>
                <div className="text-[13px] flex flex-row items-center gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[29].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[29].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[29].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[30].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[30].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[30].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[31].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[31].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[31].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[32].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[32].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[32].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#7EC8E3]">
                        {forecastWeather.list[33].dt_txt.slice(11, 16)}
                      </span>
                      <span className="flex items-center text-white">
                        <img
                          src={`https://openweathermap.org/img/wn/${forecastWeather.list[33].weather[0].icon}@2x.png`}
                          alt=""
                          className="w-[30px] h-[30px]"
                          loading="lazy"
                        />
                        {Math.round(
                          forecastWeather.list[33].main.temp - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="font-semibold">
                    <div className="text-[13px] flex flex-col space-y-[0.65rem] items-center text-[#7EC8E3]">
                      <span>
                        {Math.round(
                          forecastWeather.list[29].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[30].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[31].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[32].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                      <span>
                        {Math.round(
                          forecastWeather.list[33].main.feels_like - 273.15,
                        )}
                        °C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </CSSTransition>
  );
}

export default ForecastWeatherCard;
