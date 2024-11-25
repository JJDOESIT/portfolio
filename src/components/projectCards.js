import "../styles/projectCards.css";
import "../styles/keyframes.css";
import ProjectPDF from "./projectPDF";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProjectCards(props) {
  // The current open project
  const [openProject, setOpenProject] = useState({
    title: "Projects",
    pdfPath: "",
    redirect: "/projects/",
  });
  // Navigation tool
  const navigate = useNavigate();
  // URL parameters tool
  const [searchParams] = useSearchParams();

  // When we detect a url change or when we first load the page
  useEffect(() => {
    const project = searchParams.get("project");
    // If no url parameter is given, redirect to the base
    if (!project) {
      setOpenProject({
        title: props.projectsDict["base"]["title"],
        redirect: props.projectsDict["base"]["redirect"],
      });
      return;
    }
    // Loop through each project
    for (
      let index = 0;
      index < props.projectsDict["projects"].length;
      index++
    ) {
      // If the url parameter is a valid project title
      if (
        props.projectsDict["projects"][index]["title"].toLowerCase() === project
      ) {
        // Set the open project
        setOpenProject({
          title: props.projectsDict["projects"][index]["title"],
          pdfPath: props.projectsDict["projects"][index]["pdfPath"],
          redirect:
            props.projectsDict["redirect"] +
            props.projectsDict["projects"][index]["title"].toLowerCase(),
        });
      }
    }
  }, [window.location.href]);

  return (
    <div className="portfolio-container">
      {openProject && openProject["title"] === "Projects" && (
        <>
          <div className="portfolio-title">
            <div className="wave-text">
              <p>Projects</p>
              <p>Projects</p>
            </div>
            <p>Explore My Previous Projects</p>
          </div>
          <div className="portfolio-grid">
            {props.projectsDict["projects"].map((card) => {
              return (
                <div
                  className="card-container"
                  style={{
                    animation: !props.hasPageRefreshed ? "" : "none",
                  }}
                  key={card.id}
                  onClick={() => {
                    navigate(
                      props.projectsDict["redirect"] +
                        card["title"].toLowerCase()
                    );
                  }}
                >
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
                      <img
                        src={props.projectsDict["link-icon"]}
                        alt="img"
                      ></img>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {openProject && openProject["pdfPath"] && (
        <ProjectPDF path={openProject["pdfPath"]}></ProjectPDF>
      )}
    </div>
  );
}
