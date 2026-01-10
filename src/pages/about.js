import "../styles/about.css";
import aboutJSON from "../json/about.json";
import Skills from "../components/skills";
import Timeline from "../components/timeline";
import DownloadButton from "../components/downloadButton";
import { useState, useEffect, useRef } from "react";

export default function About() {
  // About page JSON info
  const [aboutDict, setAboutDict] = useState({});
  // Whether the JSON has loaded into the dict
  const [aboutDictLoaded, setAboutDictLoaded] = useState(false);
  // Ref to the page container (used by the timeline)
  const containerRef = useRef(null);

  // Determine whether the image paths have been loaded into the image dict
  useEffect(() => {
    if (Object.keys(aboutDict).length > 0) {
      setAboutDictLoaded(true);
    }
  }, [aboutDict]);

  // Load about info from the JSON file
  useEffect(() => {
    setAboutDict(aboutJSON);
  }, []);

  return (
    <>
      <div className="about-container" ref={containerRef}>
        <div className="about-title-background-container">
          <div className="about-title-container">
            <div className="about-image-container">
              {aboutDictLoaded && (
                <img
                  src={aboutDict["mainImagePaths"]["headshot"]}
                  alt="headshot"
                ></img>
              )}
            </div>
            <div className="about-text-container">
              <p>About Me</p>
              <br></br>
              <p>
                &emsp;Hello! I’m James Gaboriault-Whitcomb, a junior at
                Youngstown State University majoring in computer science with a
                minor in mathematics. Through my internships and personal
                projects, I’ve developed strong experience designing and
                building scalable applications from start to finish. I currently
                enjoy working with C#, .NET, and Python.
              </p>
              <br></br>
              <div className="about-resume-container">
                <DownloadButton
                  fileName="resume.pdf"
                  filePath={aboutDict["resumePath"]}
                  fileSize={aboutDict["resumeFileSize"]}
                  buttonTitle="Download Resume"
                ></DownloadButton>
              </div>
            </div>
          </div>
        </div>
        <Skills></Skills>
        <Timeline scrollRef={containerRef}></Timeline>
      </div>
    </>
  );
}
