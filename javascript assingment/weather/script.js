
async function fetchWeatherData(city) {
  try {
    const apiKey = 'ca3bbdc0b3198b7a258904b2fb3ef9e8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Weather data not available.');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
function displayWeatherData(weatherData) {
  const weatherContainer = document.querySelector('.weather-data');

  weatherContainer.innerHTML = `
    <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Weather: ${weatherData.weather[0].description}</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  const city = 'Bangalore';

  try {
    const weatherData = await fetchWeatherData(city);
    displayWeatherData(weatherData);
  } catch (error) {
    const weatherContainer = document.querySelector('.weather-data');
    weatherContainer.innerHTML = '<p>Failed to fetch weather data.</p>';
    console.error(error);
  }
});
