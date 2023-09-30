export default function typingLetters(
  typeList,
  delay,
  pauseDelayTime,
  totalDelay,
  setText,
  setCount
) {
  for (let word = 0; word < typeList.length; word++) {
    for (let char = 0; char < typeList[word].length; char++) {
      setTimeout(() => {
        setText((prev) => {
          return prev + typeList[word][char];
        });
      }, char * delay + totalDelay + pauseDelayTime / 2);
    }
    totalDelay += 2 * typeList[word].length * delay + pauseDelayTime;
    for (let delChar = typeList[word].length - 1; delChar >= 0; delChar--) {
      setTimeout(() => {
        setText((prev) => {
          return prev.slice(0, delChar);
        });
        if (word === typeList.length - 1 && delChar === 0) {
          setCount((prev) => {
            return prev + 1;
          });
        }
      }, totalDelay - delay * delChar);
    }
  }
}
