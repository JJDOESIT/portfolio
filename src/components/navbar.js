import "../styles/navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [changed, setChanged] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (changed) {
      if (window.location.href.includes("about")) {
        setActive("about");
      } else if (window.location.href.includes("portfolio")) {
        setActive("portfolio");
      } else if (window.location.href.includes("contact")) {
        setActive("contact");
      } else {
        setActive("");
      }
      setChanged(false);
    }
  }, [changed]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div>
            <p
              onClick={() => {
                setChanged(true);
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
                className={active === "portfolio" ? "active" : ""}
                onClick={() => {
                  setChanged(true);
                  navigate("/portfolio/");
                }}
              >
                Portfolio
              </p>
            </li>
            <li>
              <p
                className={active === "contact" ? "active" : ""}
                onClick={() => {
                  setChanged(true);
                  navigate("/contact/");
                }}
              >
                Contact
              </p>
            </li>
          </ul>
          <div className="github-logo">
            <a href="https://github.com/JJDOESIT/">
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
