import "../styles/navbar.css";
import "../styles/keyframes.css";
import imagesJSON from "../json/navbar.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

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

  /* Check if the URL contains a keyword, if it does, set it to active */
  useEffect(() => {
    setInterval(() => {
      if (window.location.href.includes("about")) {
        setActive("about");
      } else if (window.location.href.includes("projects")) {
        setActive("projects");
      } else if (window.location.href.includes("contact")) {
        setActive("contact");
      } else {
        setActive("");
      }
    }, 50);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div
            className="navbar-home-elements-container"
            onClick={() => {
              navigate("/");
            }}
          >
            <p>{"</home>"}</p>
          </div>
          <ul>
            <li>
              <p
                className={active === "about" ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/about/");
                }}
              >
                About
              </p>
            </li>
            <li>
              <p
                className={active === "projects" ? "active" : ""}
                onClick={() => {
                  navigate("/projects/");
                }}
              >
                Projects
              </p>
            </li>
            <li>
              <p
                className={active === "contact" ? "active" : ""}
                onClick={() => {
                  navigate("/contact/");
                }}
              >
                Contact
              </p>
            </li>
          </ul>
          <div className="navbar-logo-container">
            {imagesLoaded &&
              imageDict["mainImagePaths"].map((logo, index) => {
                return (
                  <div className="logos" key={index}>
                    <a href={logo["redirect"]} target="_blank" rel="noreferrer">
                      {imagesLoaded && (
                        <img
                          src={logo["logo"]}
                          alt="Logo"
                          style={{
                            width: logo["width"],
                            height: logo["height"],
                          }}
                        ></img>
                      )}
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </nav>
    </>
  );
}
