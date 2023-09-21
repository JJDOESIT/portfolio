import "../styles/home.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [introTypeCount, setIntroTypeCount] = useState(0);
  const [introText, setIntroText] = useState(" ");

  useEffect(() => {
    const typeList = ["Software Developer", "CSIS Student", "Designer"];
    const delay = 100;
    var totalDelay = 0;
    var pauseDelayTime = 1500;

    for (let i = 0; i < typeList.length; i++) {
      for (let j = 0; j < typeList[i].length; j++) {
        setTimeout(() => {
          setIntroText((prev) => {
            return prev + typeList[i][j];
          });
        }, j * delay + totalDelay + pauseDelayTime / 2);
      }
      totalDelay += 2 * typeList[i].length * delay + pauseDelayTime;
      for (let k = typeList[i].length - 1; k >= 0; k--) {
        setTimeout(() => {
          setIntroText((prev) => {
            return prev.slice(0, k);
          });
          if (i === typeList.length - 1 && k === 0) {
            setIntroTypeCount((prev) => {
              return prev + 1;
            });
          }
        }, totalDelay - delay * k);
      }
    }
  }, [introTypeCount]);

  return (
    <>
      <div className="home-container">
        <div className="home-text-side">
          <div className="home-text-container">
            <p>James</p>
            <p>Gaboriault-Whitcomb</p>
            <div className="dynamic-text">
              <p>I'm a</p>
              <p>{introText}</p>
            </div>
          </div>
        </div>
        <div className="home-image-side">
          <div className="home-logo-container">
            <img src={require("../pictures/headshot.png")} alt="Icon"></img>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
