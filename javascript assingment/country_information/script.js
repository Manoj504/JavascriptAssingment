const countryInfoContainer = document.querySelector('.country-info');
const getCountryInfoButton = document.getElementById('get-country-info-btn');

async function fetchRandomCountry() {
  try {
    const response = await fetch('https://restcountries.com/v2/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data[Math.floor(Math.random() * data.length)];
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
}

function displayCountryInfo(country) {
  const {
    name,
    capital,
    population,
    region,
    subregion,
    languages,
    currencies,
    flag,
  } = country;

  const countryInfoHTML = `
    <p>Country: ${name}</p>
    <p>Capital: ${capital || 'N/A'}</p>
    <p>Population: ${population || 'N/A'}</p>
    <p>Region: ${region || 'N/A'}</p>
    <p>Subregion: ${subregion || 'N/A'}</p>
    <p>Language: ${languages.map((lang) => lang.name).join(', ') || 'N/A'}</p>
    <p>Currency: ${currencies
      .map((currency) => `${currency.name} (${currency.code})`)
      .join(', ') || 'N/A'}</p>
    <img src="${flag}" alt="Flag" style="max-width: 100px; max-height: 100px;">
  `;

  countryInfoContainer.innerHTML = countryInfoHTML;
}

async function fetchAndDisplayCountryData() {
  try {
    const randomCountry = await fetchRandomCountry();
    displayCountryInfo(randomCountry);
  } catch (error) {
    countryInfoContainer.innerHTML = '<p>Failed to fetch country data. Please try again later.</p>';
  }
}

function handleGetCountryInfoButtonClick() {
  fetchAndDisplayCountryData();
}

window.addEventListener('load', fetchAndDisplayCountryData);
getCountryInfoButton.addEventListener('click', handleGetCountryInfoButtonClick);
