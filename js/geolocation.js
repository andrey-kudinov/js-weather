import { getWheatherData } from './api.js';
import { resetWeatherContent } from './helper.js';

export const handleWeatherByGeolocation = () => {
  const option = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = async (pos) => {
    const crd = pos.coords;

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=bb8c135175cd4059b4262fe2e07cbff2`,
    );

    const result = await response.json();
    const weather = await getWheatherData(result.features[0].properties.city);
    resetWeatherContent(result.features[0].properties.city, weather);
  };

  const error = (err) => {
    console.log(`${err.code} ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(success, error, option);
};
