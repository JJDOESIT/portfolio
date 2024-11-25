import "../styles/home.css";
import "../styles/keyframes.css";
import imagesJSON from "../json/home.json";
import { useState, useEffect } from "react";
import typingLetters from "../functions/typingLetters";
import randomQuote from "../functions/randomQuote";
import randomQuoteLocal from "../functions/randomQuoteLocal";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
import { MapPinIcon as MapPinIconOutline } from "@heroicons/react/24/outline";
import { MapPinIcon as MapPinIconSolid } from "@heroicons/react/24/solid";
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
  // Whether the user is hovering over the map pin icon
  const [isHoveringOverMapPinIcon, setIsHoveringOverMapPinIcon] =
    useState(false);
  // Whether the map is visible or not
  const [mapVisible, setMapVisible] = useState(false);

  const [imageDict, setImageDict] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const navigate = useNavigate();

  //Random quotes
  useEffect(() => {
    //randomQuote(100, 140, setQuote);
    setQuote(randomQuoteLocal(100, 140));
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

  // Trigger animations to load the map
  function openMapAnimation() {
    // Fade the image container out to the right
    document
      .querySelector(".home-image-container")
      .classList.remove("home-fade-out-right-reverse");
    document
      .querySelector(".home-image-container")
      .classList.add("home-fade-out-right");
    // Fade the text container out to the left
    document
      .querySelector(".home-text-container")
      .classList.remove("home-fade-out-left-reverse");
    document
      .querySelector(".home-text-container")
      .classList.add("home-fade-out-left");
    // Fade the map in from above
    document
      .querySelector(".home-map")
      .classList.remove("home-map-fade-in-down-reverse");
    document.querySelector(".home-map").classList.add("home-map-fade-in-down");
    // Fade the map exit button in from below
    document
      .querySelector(".home-exit-map-button")
      .classList.remove("home-map-fade-in-up-reverse");
    document
      .querySelector(".home-exit-map-button")
      .classList.add("home-map-fade-in-up");
    // Set the map visibility to true
    setMapVisible(true);
  }

  // Trigger animations to close the map
  function closeMapAnimation() {
    // Fade the map out from below
    document
      .querySelector(".home-map")
      .classList.remove("home-map-fade-in-down");
    document
      .querySelector(".home-map")
      .classList.add("home-map-fade-in-down-reverse");
    // Fade the map exit button out from above
    document
      .querySelector(".home-exit-map-button")
      .classList.remove("home-map-fade-in-up");
    document
      .querySelector(".home-exit-map-button")
      .classList.add("home-map-fade-in-up-reverse");
    // Fade the home image container in from the right
    document
      .querySelector(".home-image-container")
      .classList.remove("home-fade-out-right");
    document
      .querySelector(".home-image-container")
      .classList.add("home-fade-out-right-reverse");
    // Fade the home text container in from the left
    document
      .querySelector(".home-text-container")
      .classList.remove("home-fade-out-left");
    document
      .querySelector(".home-text-container")
      .classList.add("home-fade-out-left-reverse");
    // Set the map visibility to true once the ending animation has finished
    setTimeout(() => {
      setMapVisible(false);
    }, 950);
  }

  // Carousel image effect
  /* useEffect(() => {
    if (imagesLoaded) {
      const imageClassNameOne = ".home-image-one";
      const imageClassNameTwo = ".home-image-two";
      const outClassName = "home-image-carousel-left-out";
      const inClassName = "home-image-carousel-left-in";
      const imageList = [
        imageDict["mainImagePaths"]["goldenGateBridge"],
        imageDict["mainImagePaths"]["hiking"], // Input list must match the src originally set in the HTML
        imageDict["mainImagePaths"]["lake"],
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
  }, [imagesLoaded, imageDict]); */

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
          <div
            className="home-location-container"
            onClick={(event) => {
              event.preventDefault();
              openMapAnimation();
            }}
            onTouchStart={(event) => {
              event.preventDefault();
              openMapAnimation();
            }}
          >
            {isHoveringOverMapPinIcon ? (
              <MapPinIconSolid
                className="home-map-pin-icon"
                onMouseLeave={() => setIsHoveringOverMapPinIcon(false)}
              ></MapPinIconSolid>
            ) : (
              <MapPinIconOutline
                className="home-map-pin-icon"
                onMouseEnter={() => setIsHoveringOverMapPinIcon(true)}
              ></MapPinIconOutline>
            )}
            <p>Youngstown, OH</p>
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
                    //randomQuote(100, 140, setQuote);
                    setQuote(randomQuoteLocal(100, 140));
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
                src={imageDict["mainImagePaths"]["hiking"]}
                alt="Icon"
                className="home-image-one"
              ></img>
              <img
                src={imageDict["mainImagePaths"]["goldenGateBridge"]}
                alt="Icon"
                className="home-image-two"
              ></img>
            </>
          )}
          <div className="home-image-background"></div>
          <div className="home-image-text-container">
            <p>"{quote.content}"</p>
            <p>- {quote.author}</p>
            {isExploding ? (
              <ConfettiExplosion className="explosion-container"></ConfettiExplosion>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          className="home-map-container"
          style={{ visibility: mapVisible ? "visible" : "hidden" }}
        >
          <iframe
            title="Location"
            className="home-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48109.34312813243!2d-80.68074651216703!3d41.09447466241374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8833e1d16893bc9f%3A0x5d2c726a0cccf044!2sYoungstown%2C%20OH!5e0!3m2!1sen!2sus!4v1732224859341!5m2!1sen!2sus"
            style={{ border: "0" }}
          ></iframe>
          <button
            className="home-exit-map-button"
            role="button"
            onClick={() => {
              setIsHoveringOverMapPinIcon(false);
              closeMapAnimation();
            }}
          >
            <span className="text">Go back</span>
          </button>
        </div>
      </div>
    </>
  );
}
