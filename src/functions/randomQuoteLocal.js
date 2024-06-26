export default function randomQuoteLocal(minLength, maxLength) {
  const quotes = require("../json/quotes.json");
  const filteredQuotes = quotes.filter((data) => {
    const length = data.content.length;
    return length > minLength && length < maxLength;
  });

  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  return randomQuote;
}
