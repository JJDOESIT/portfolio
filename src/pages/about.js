import "../styles/about.css";
import aboutJSON from "../json/about.json";
import Skills from "../components/skills";
import { useState, useEffect, useRef } from "react";
import Timeline from "../components/timeline";

export default function About() {
  const [aboutDict, setAboutDict] = useState({});
  const [aboutDictLoaded, setAboutDictLoaded] = useState(false);

  const containerRef = useRef(null);

  // Function to download a file given a path to a public URL
  async function downloadFile(title, path) {
    try {
      // Fetch the file
      const response = await fetch(path);

      // If the fetch failed
      if (!response.ok) {
        throw new Error("File not found or failed to fetch");
      }
      // Convert the file into a blob
      const fileBlob = await response.blob();

      // Create a new Blob with 'application/octet-stream' MIME type
      const octetStreamBlob = new Blob([fileBlob], {
        type: "application/octet-stream",
      });

      // Create an object URL for the Blob
      const url = URL.createObjectURL(octetStreamBlob);

      // Create a temporary <a> element
      const a = document.createElement("a");
      // Set the download URL
      a.href = url;
      // Specify the filename for the downloaded file
      a.download = title;
      // Trigger the download by clicking the link programmatically
      document.body.appendChild(a);
      a.click();
      // Remove the link after the download
      document.body.removeChild(a);
      // Revoke the object URL after the download is triggered
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }

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
        <div className="about-title-container">
          <div className="about-image-container">
            {aboutDictLoaded && (
              <img
                src={aboutDict["mainImagePaths"]["headshot"]}
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
              science and a minor in mathematics. My journey into coding began
              during high school, and since then, I've been continuously working
              on exciting projects to broaden my expertise. Currently, I enjoy
              working with C#, Python, and Javascript.
            </p>
            <br></br>
            <div className="about-resume-container">
              <div className="about-resume-button">
                <input
                  type="button"
                  value="Download Resume"
                  onClick={() => {
                    downloadFile("resume.pdf", aboutDict["resumePath"]);
                  }}
                ></input>
                <p className="about-resume-button-top">Filename : resume.pdf</p>
                <p className="about-resume-button-bottom">Size: 201KB</p>
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
