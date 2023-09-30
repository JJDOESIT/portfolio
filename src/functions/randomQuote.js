import axios from "axios";

export default function randomQuote(minLength, maxLength, setState) {
  axios
    .get(
      "https://api.quotable.io/quotes/random?minLength=" +
        minLength +
        "&maxLength=" +
        maxLength
    )
    .then((result) => {
      setState((prev) => {
        return {
          ...prev,
          quote: result.data[0].content,
          author: result.data[0].author,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
