const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResults = document.getElementById('weather-results');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    weatherResults.innerHTML = `<p>都市名を入力してください。</p>`;
    return;
  }
  await getWeather(city);
});

const getWeather = async (city) => {
  weatherResults.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=60c62f63799746b9b42113237251503&q=${city}&aqi=no`
    );
    if (!response.ok) {
      throw new Error('ネットワークエラー');
    }
    const data = await response.json();
    weatherResults.innerHTML = `
      <div class="results-country">${data.location.country}</div>
      <div class="results-city">${data.location.name}</div>
      <div class="results-temp">${data.current.temp_c}<span>°C</span></div>
      <div class="results-condition">
        <img src="${'https:' + data.current.condition.icon}" alt="icon">
        <span>${data.current.condition.text}</span>
      </div>
    `;
  } catch (error) {
    weatherResults.innerHTML = `<p class="error-message">天気情報の取得に失敗しました。リロードしてもう一度お試しください。</p>`;
    console.error('Error fetching weather data:', error);
  }
};
