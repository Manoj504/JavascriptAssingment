const quoteContainer = document.querySelector('.quote');
const newQuoteButton = document.getElementById('new-quote-btn');

async function fetchRandomQuote() {
  try {
    const response = await fetch('https://type.fit/api/quotes');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data[Math.floor(Math.random() * data.length)];
  } catch (error) {
    console.error('Error fetching random quote:', error);
    throw error;
  }
}

function displayQuote(quote) {
  quoteContainer.innerHTML = `
    <p>${quote.text}</p>
    <p>- ${quote.author || 'Unknown'}</p>
  `;
}

async function handleNewQuoteButtonClick() {
  try {
    const randomQuote = await fetchRandomQuote();
    displayQuote(randomQuote);
  } catch (error) {
    quoteContainer.innerHTML = '<p>Failed to fetch a random quote. Please try again later.</p>';
  }
}

newQuoteButton.addEventListener('click', handleNewQuoteButtonClick);

fetchRandomQuote().then((quote) => displayQuote(quote));
