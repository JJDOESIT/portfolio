import "../styles/skills.css";
import imagesJSON from "../json/skills.json";
import { useState, useEffect } from "react";

export default function Skills() {
  const [type, setType] = useState("languages");
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
    <div className="skills-container">
      <div>
        <p>Skills</p>
      </div>
      <div className="skills-button-container">
        <div>
          <button
            className={type === "languages" ? "type-active" : ""}
            onClick={() => {
              setType("languages");
            }}
          >
            Languages
          </button>
        </div>
        <div>
          <button
            className={type === "tools" ? "type-active" : ""}
            onClick={() => {
              setType("tools");
            }}
          >
            Tools
          </button>
        </div>
      </div>
      <div className="skills-grid-container">
        {imagesLoaded &&
          imageDict[type].map((data) => {
            return (
              <div className="skills-card-container" key={data.id}>
                <div className="skills-image">
                  <img src={data.url} alt="logo"></img>
                </div>
                <div className="skills-text">
                  <p>{data.text}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
