import "../styles/projectExplorer.css";
import "../styles/keyframes.css";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { XCircleIcon as XIconOutline } from "@heroicons/react/24/outline";

export default function ProjectExplorer(props) {
  // Current open projects in the explorer
  const [openProjects, setOpenProjects] = useState([]);
  // The current selected project
  const [selectedProject, setSelectedProject] = useState("");
  // Navigation tool
  const navigate = useNavigate();
  // URL parameters tool
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoaded, setPageLoaded] = useState(false);

  // On load
  useEffect(() => {
    // Set the open projects to the base
    setOpenProjects((prev) => {
      return [...prev, props.projectsDict["base"]];
    });
    // Set the selected project to the base
    setSelectedProject(props.projectsDict["base"]["title"]);
  }, []);

  // Fetch the open project based on the URL parameter
  // Note: This runs whenever a URL change is detected or on the first render
  useEffect(() => {
    // Fetch the project name from the URL parameter
    const project = searchParams.get("project");

    // If no URL parameter is found
    if (!project) {
      setSelectedProject(props.projectsDict["base"]["title"]);
      setPageLoaded(true);
      return;
    }

    // Determine if the selected project is already open in the project explorer
    let projectAlreadyOpen = false;
    for (let index = 0; index < openProjects.length; index++) {
      if (
        openProjects[index]["title"].toLowerCase() === project.toLowerCase()
      ) {
        projectAlreadyOpen = true;
      }
    }

    // If the project is already open in the project explorer
    if (projectAlreadyOpen) {
      // Set the selected project based on URL parameter
      setSelectedProject(project.toLowerCase());
      setPageLoaded(true);
      return;
    }

    // Determine if the selected project actually exists
    let projectExists = false;
    let selectedProjectIndex;
    for (
      let index = 0;
      index < props.projectsDict["projects"].length;
      index++
    ) {
      // If the project is found in the dict
      if (
        props.projectsDict["projects"][index]["title"].toLowerCase() ===
        project.toLowerCase()
      ) {
        projectExists = true;
        selectedProjectIndex = index;
      }
    }

    // If the project doesn't exist (URL paramteter is invalid)
    if (!projectExists) {
      window.location.href = "#" + props.projectsDict["base"]["redirect"];
      return;
    }

    // Add the project title + redirect link to the openProjects
    setOpenProjects((prev) => {
      return [
        ...prev,
        {
          title: props.projectsDict["projects"][selectedProjectIndex]["title"],
          redirect:
            props.projectsDict["redirect"] +
            props.projectsDict["projects"][selectedProjectIndex][
              "title"
            ].toLowerCase(),
        },
      ];
    });
    setSelectedProject(
      props.projectsDict["projects"][selectedProjectIndex]["title"]
    );
    setPageLoaded(true);
  }, [window.location.href]);

  return (
    <div
      className={
        !props.hasPageRefreshed
          ? "project-explorer project-explorer-animation"
          : "project-explorer"
      }
      style={{ opacity: !props.hasPageRefreshed ? "0" : "1" }}
    >
      {pageLoaded &&
        openProjects.map((project, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(project["redirect"]);
              }}
              className={
                // If the project is selected
                project["title"].toLowerCase() === selectedProject.toLowerCase()
                  ? // If the project is selected but is not the base
                    "project-explorer-nav project-explorer-selected"
                  : // If the project isn't selected
                    "project-explorer-nav"
              }
            >
              <p>{project["title"]}</p>
              {project["title"].toLowerCase() !=
                props.projectsDict["base"]["title"].toLowerCase() && (
                <div
                  // Close the project
                  onClick={(event) => {
                    event.stopPropagation();
                    let newProjectIndex = 0;
                    // Loop through the open projects
                    for (let index = 0; index < openProjects.length; index++) {
                      // Once we found the project we want to close
                      if (
                        project["title"].toLowerCase() ===
                        openProjects[index]["title"].toLowerCase()
                      ) {
                        // If the project we want to close is the last in the list,
                        // redirect to the previous project
                        if (index === openProjects.length - 1) {
                          newProjectIndex = index - 1;
                        }
                        // Else redirect to the next project
                        else {
                          newProjectIndex = index + 1;
                        }
                      }
                    }
                    setOpenProjects(
                      openProjects.filter(
                        (openProject) =>
                          openProject["title"].toLowerCase() !=
                          project["title"].toLowerCase()
                      )
                    );

                    // Only navigate away if we have the current project open
                    if (
                      selectedProject.toLowerCase() ===
                      project["title"].toLowerCase()
                    ) {
                      navigate(openProjects[newProjectIndex]["redirect"]);
                    }
                  }}
                >
                  <XIconOutline className="project-explorer-nav-x-outline"></XIconOutline>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
