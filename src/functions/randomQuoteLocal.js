export default function randomQuoteLocal(minLength, maxLength) {
  // Fetch all quotes from the JSON file
  const quotes = require("../json/quotes.json");
  // Filter them down based on min and max length
  const filteredQuotes = quotes.filter((data) => {
    const length = data.content.length;
    return length > minLength && length < maxLength;
  });
  // Return a random quote from the filtered array
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
}
