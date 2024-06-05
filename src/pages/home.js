import "../styles/home.css";
import "../styles/keyframes.css";
import imagesJSON from "../json/home.json";
import { useState, useEffect } from "react";
import typingLetters from "../functions/typingLetters";
import randomQuote from "../functions/randomQuote";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
import imageCarousel from "../functions/imageCarousel";

export default function Home() {
  // The length of the current dynamic text
  const [introTypeCount, setIntroTypeCount] = useState(0);
  // The current dynamic text string (ie. "I'm a soft" )
  const [introText, setIntroText] = useState(" ");
  // The current quote (ie. Dict containing 'Quote' and 'Author' keys)
  const [quote, setQuote] = useState({});
  // Boolean flag whether the confetti animation is playing
  const [isExploding, setIsExploding] = useState(false);

  const [imageDict, setImageDict] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navigate = useNavigate();

  //Random quotes
  useEffect(() => {
    randomQuote(100, 140, setQuote);
  }, []);

  // Determine whether the image paths have been loaded into the image dict
  useEffect(() => {
    if (Object.keys(imageDict).length > 0) {
      setImagesLoaded(true);
    }
  }, [imageDict]);

  // Load an image map from the JSON file
  useEffect(() => {
    setImageDict(imagesJSON);
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

  // Carousel image effect
  useEffect(() => {
    if (imagesLoaded) {
      const imageClassNameOne = ".home-image-one";
      const imageClassNameTwo = ".home-image-two";
      const outClassName = "home-image-carousel-left-out";
      const inClassName = "home-image-carousel-left-in";
      const imageList = [
        imageDict["mainImagePaths"]["goldenGateBridge"],
        imageDict["mainImagePaths"]["lake"],
        imageDict["mainImagePaths"]["hiking"],
      ];
      const imageDisplayTime = 5000;
      const imageSwapDelay = 500;
      var intervalID = imageCarousel(
        imageClassNameOne,
        imageClassNameTwo,
        outClassName,
        inClassName,
        imageList,
        imageDisplayTime,
        imageSwapDelay
      );
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [imagesLoaded, imageDict]);

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
          {imagesLoaded && (
            <>
              <img
                src={imageDict["mainImagePaths"]["goldenGateBridge"]}
                alt="Icon"
                className="home-image-one"
              ></img>
              <img
                src={imageDict["mainImagePaths"]["lake"]}
                alt="Icon"
                className="home-image-two"
              ></img>
            </>
          )}
          <div className="home-image-background"></div>
          <div className="home-image-text-container">
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
    </>
  );
}
