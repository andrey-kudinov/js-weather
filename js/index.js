import { getWheatherData } from './api.js';
import { createContent } from './appContent.js';
import { createHeader } from './appHeader.js';

const app = async () => {
  const weather = await getWheatherData(
    JSON.parse(localStorage.getItem('city')) || 'Москва',
  );
  const header = createHeader(weather.name);
  const content = createContent(weather);
  document.body.append(header, content);
};

app();
