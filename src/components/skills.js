import "../styles/skills.css";
import { useState, useEffect } from "react";

export default function Skills() {
  const [skillsData, setSkillsData] = useState([]);
  const [type, setType] = useState("languages");

  useEffect(() => {
    if (type === "languages") {
      setSkillsData([
        {
          image: "python-icon",
          text: "Python",
        },
        {
          image: "cplusplus-icon",
          text: "C++",
        },
        {
          image: "js-icon",
          text: "Javascript",
        },
        {
          image: "html-icon",
          text: "HTML",
        },
        {
          image: "css-icon",
          text: "CSS",
        },
      ]);
    } else if (type === "tools") {
      setSkillsData([
        {
          image: "react-icon",
          text: "React",
        },
        {
          image: "django-icon",
          text: "Django",
        },
        {
          image: "rest-icon",
          text: "REST",
        },
        {
          image: "github-icon",
          text: "Github",
        },
      ]);
    }
  }, [type]);

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
        {skillsData.map((data) => {
          return (
            <div className="skills-card-container">
              <div className="skills-image">
                <img
                  src={require("../pictures/skills/" + data.image + ".png")}
                ></img>
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
