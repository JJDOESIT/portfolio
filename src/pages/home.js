import "../styles/home.css";
import "../styles/keyframes.css";
import React from "react";
import { useState, useEffect } from "react";
import typingLetters from "../functions/typingLetters";
import randomQuote from "../functions/randomQuote";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [introTypeCount, setIntroTypeCount] = useState(0);
  const [introText, setIntroText] = useState(" ");
  const [quote, setQuote] = useState({});
  const [isExploding, setIsExploding] = React.useState(false);
  const navigate = useNavigate();

  //Random quotes
  useEffect(() => {
    randomQuote(100, 140, setQuote);
  }, []);

  //Explosion effect
  useEffect(() => {
    switch (isExploding) {
      case true:
        setTimeout(() => {
          setIsExploding(false);
        }, 1000);

        break;

      default:
        break;
    }
  }, [isExploding]);

  //Typing effect
  useEffect(() => {
    const typeList = ["Software Developer", "CSIS Student", "Designer"];
    const delay = 100;
    const pauseDelayTime = 1500;
    var totalDelay = 0;

    typingLetters(
      typeList,
      delay,
      pauseDelayTime,
      totalDelay,
      setIntroText,
      setIntroTypeCount
    );
  }, [introTypeCount]);

  return (
    <>
      <div className="home-container">
        <div className="home-text-container">
          <p>James</p>
          <p>Gaboriault-Whitcomb</p>
          <div className="dynamic-text">
            <p>I'm a</p>
            <p>{introText}</p>
          </div>
          <div className="home-button-container">
            <div className="contact-button-container">
              <input
                type="button"
                value="Let's Chat!"
                onClick={() => {
                  navigate("/contact/");
                }}
              ></input>
            </div>
            <div className="quote-button-container">
              <input
                type="button"
                onClick={() => {
                  if (!isExploding) {
                    randomQuote(100, 140, setQuote);
                    setIsExploding(true);
                  }
                }}
                value="Random Quote"
              ></input>
            </div>
          </div>
        </div>
        <div className="home-image-container">
          <img src={require("../pictures/headshot.png")} alt="Icon"></img>
          <div></div>
          <div>
            <div>
              <p>"{quote.quote}"</p>
              <p>- {quote.author}</p>
              {isExploding ? (
                <ConfettiExplosion className="explosion-container"></ConfettiExplosion>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
