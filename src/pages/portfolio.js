import "../styles/portfolio.css";
import "../styles/keyframes.css";
import imagesJSON from "../json/projects.json";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [imageDict, setImageDict] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  return (
    <div className="portfolio-container">
      <div className="portfolio-title">
        <div className="wave-text">
          <p>Projects</p>
          <p>Projects</p>
        </div>
        <p>Explore My Previous Projects</p>
      </div>
      <div className="portfolio-grid">
        {imagesLoaded &&
          imageDict["projects"].map((card) => {
            return (
              <div className="card-container" key={card.id}>
                <div className="card-image">
                  <img src={card["image"]} alt="img"></img>
                </div>
                <div className="card-title">
                  <p>{card.title}</p>
                </div>
                <div className="card-description">
                  <p>{card.description}</p>
                </div>
                <div className="link-container">
                  <a href={card.link} target="_blank" rel="noreferrer">
                    <img src={imageDict["link-icon"]} alt="img"></img>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
