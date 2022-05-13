export const getWheatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2101b37789c549c2f44f8f9ed29c0e63&lang=ru&units=metric`,
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
