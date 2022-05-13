import { getWheatherData } from './api.js';
import { handleWeatherByGeolocation } from './geolocation.js';
import { resetWeatherContent, fToC, cToF } from './helper.js';

export const createHeader = (city) => {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  const headerCity = document.createElement('div');
  const headerUnits = document.createElement('div');
  const cityChange = document.createElement('button');
  const cityLocation = document.createElement('button');
  const cityName = document.createElement('h1');
  const unitsC = document.createElement('button');
  const unitsF = document.createElement('button');
  const cityInner = document.createElement('div');
  const searchBlock = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchBtn = document.createElement('button');
  const errorBlock = document.createElement('p');

  header.classList.add('header');
  headerContainer.classList.add('container', 'header__container');
  headerCity.classList.add('header__city');
  headerUnits.classList.add('header__units');
  cityChange.classList.add('city__change', 'btn-reset');
  cityLocation.classList.add('city__location', 'btn-reset');
  cityName.classList.add('city__name');
  cityInner.classList.add('city__inner');
  unitsC.classList.add('units__c', 'btn-reset', 'unit-current');
  unitsF.classList.add('units__f', 'btn-reset');
  searchBlock.classList.add('search', 'fade-in');
  searchInput.classList.add('search_input');
  searchInput.setAttribute('maxlength', 30);
  searchBtn.classList.add('search_btn');
  errorBlock.classList.add('search__error');

  searchBtn.textContent = 'ok';
  cityName.textContent = city;
  cityChange.textContent = 'Сменить город';
  cityLocation.textContent = 'Мое местоположение';
  unitsC.textContent = 'C';
  unitsF.textContent = 'F';

  cityChange.addEventListener('click', () => {
    headerCity.innerHTML = '';
    searchBlock.classList.remove('fade-out');
    searchBlock.append(searchInput, searchBtn, errorBlock);
    headerCity.append(searchBlock);
    searchInput.focus();
  });

  searchBtn.addEventListener('click', async () => {
    if (!searchInput.value) return;

    try {
      const weather = await getWheatherData(searchInput.value);

      if (weather.message) {
        showError(weather.message);
        return;
      }

      resetWeatherContent(weather.name, weather);
    } catch (error) {
      console.log(error);
    }
  });

  const showError = (message) => {
    errorBlock.classList.add('show-error');
    errorBlock.textContent = 'Город не найден';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
  });

  window.addEventListener('click', (e) => {
    if (
      e.target === searchInput ||
      e.target === searchBtn ||
      e.target === cityChange
    )
      return;

    closeInput();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInput();
  });

  const closeInput = () => {
    errorBlock.classList.remove('show-error');
    searchInput.value = '';

    searchBlock.classList.add('fade-out');
    setTimeout(() => {
      searchBlock.remove();
      headerCity.append(cityName, cityInner);
    }, 500);
  };

  unitsC.addEventListener('click', () => {
    if (unitsC.classList.contains('unit-current')) return;

    unitsC.classList.add('unit-current');
    unitsF.classList.remove('unit-current');
    document.querySelector('.weather__units').textContent = 'o';

    const temperature = document.querySelector('.weather__temperature');
    const convertedTemperature = fToC(+temperature.textContent);
    temperature.textContent = Math.round(convertedTemperature);
  });

  unitsF.addEventListener('click', () => {
    if (unitsF.classList.contains('unit-current')) return;

    unitsF.classList.add('unit-current');
    unitsC.classList.remove('unit-current');
    document.querySelector('.weather__units').textContent = 'f';

    const temperature = document.querySelector('.weather__temperature');
    const convertedTemperature = cToF(+temperature.textContent);
    temperature.textContent = Math.round(convertedTemperature);
  });

  cityLocation.addEventListener('click', handleWeatherByGeolocation);

  header.append(headerContainer);
  headerContainer.append(headerCity, headerUnits);
  cityInner.append(cityChange, cityLocation);
  headerCity.append(cityName, cityInner);
  headerUnits.append(unitsC, unitsF);

  return header;
};
