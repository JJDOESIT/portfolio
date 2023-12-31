import "../styles/navbar.css";
import "../styles/keyframes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

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
    }, 100);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div>
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              home()
            </p>
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
                Portfolio
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
          <div className="github-logo">
            <a
              href="https://github.com/JJDOESIT/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={require("../pictures/github-mark-white.png")}
                alt="Github"
              ></img>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
