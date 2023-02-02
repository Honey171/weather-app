export interface CurrentWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface forecastWeatherData {
  city: {
    country: string;
    name: string;
    population: number;
  };
  list: Array<{
    dt_txt: string;
    main: {
      feels_like: number;
      humidity: number;
      temp: number;
    };
    weather: [
      {
        description: string;
        icon: string;
      },
    ];
  }>;
}
