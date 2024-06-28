import "../styles/about.css";
import imagesJSON from "../json/about.json";
import Skills from "../components/skills";
import { useState, useEffect, useRef } from "react";
import Timeline from "../components/timeline";

export default function About() {
  const [imageDict, setImageDict] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const containerRef = useRef(null);

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
    <>
      <div className="about-container" ref={containerRef}>
        <div className="about-title-container">
          <div className="about-image-container">
            {imagesLoaded && (
              <img
                src={imageDict["mainImagePaths"]["headshot"]}
                alt="headshot"
              ></img>
            )}
            <div></div>
          </div>
          <div className="about-text-container">
            <p>About Me</p>
            <br></br>
            <p>
              &emsp;Hello! I'm James Gaboriault-Whitcomb, a sophmore at
              Youngstown State University. I'm pursuing a major in computer
              science, which is a subject I'm truly passionate about. My journey
              into coding began during high school, and since then, I've been
              continuously working on exciting projects to broaden my expertise.
              I love tackling challenges and finding solutions to problems.
              Currently, I enjoy working with Python, C++, and Javascript.
            </p>
            <br></br>
            <p>
              &emsp;When I'm not coding, you can find me soaring through the
              skies with FPV drones or building intricate LEGO sets.
            </p>
          </div>
        </div>
        <Skills></Skills>
        <Timeline scrollRef={containerRef}></Timeline>
      </div>
    </>
  );
}
