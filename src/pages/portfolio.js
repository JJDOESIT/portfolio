import ProjectExplorer from "../components/projectExplorer";
import ProjectCards from "../components/projectCards";
import projectsJSON from "../json/projects.json";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Portfolio() {
  // JSON data of the projects
  const [projectsDict, setProjectsDict] = useState({});
  // Whether the project data has been fetched or not
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  // Whether the page has refreshed ( has the URL changed? )
  const [hasPageRefreshed, setHasPageRefreshed] = useState(false);
  // A count of how many times the page has refreshed
  const [pageRefreshCount, setPageRefreshCount] = useState(0);
  // Get the current location (URL)
  const location = useLocation();

  // Load the projects from the JSON file
  useEffect(() => {
    setProjectsDict(projectsJSON);
  }, []);

  // Determine whether the projects have been loaded into the dict
  useEffect(() => {
    if (Object.keys(projectsDict).length > 0) {
      setProjectsLoaded(true);
    }
  }, [projectsDict]);

  // If the URL changes away from the base page, toggle the flag
  // Note: Hacky solution
  useEffect(() => {
    if (pageRefreshCount !== 0) {
      setHasPageRefreshed(true);
    }
    setPageRefreshCount((prev) => {
      return prev + 1;
    });
  }, [location.pathname]);

  return (
    <>
      {projectsLoaded && (
        <>
          <ProjectExplorer
            projectsDict={projectsDict}
            hasPageRefreshed={hasPageRefreshed}
          ></ProjectExplorer>
          <ProjectCards
            projectsDict={projectsDict}
            hasPageRefreshed={hasPageRefreshed}
          ></ProjectCards>
        </>
      )}
    </>
  );
}
