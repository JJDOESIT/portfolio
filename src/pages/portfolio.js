import "../styles/portfolio.css";
import "../styles/keyframes.css";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState([]);

  /* Add project data */
  useEffect(() => {
    setPortfolioData([
      {
        image: "chess1",
        title: "Chess Engine",
        description:
          "Mailbox style chess engine incorporated with a playable AI, special moves, and a GUI.",
        link: "https://github.com/JJDOESIT/chess",
        id: 0,
      },
      {
        image: "btsea1",
        title: "BTSea",
        description:
          "Fully functional Bitcoin wallet equipped with many features operating on the Testnet network.",
        link: "https://github.com/JJDOESIT/btsea",
        id: 1,
      },
      {
        image: "maze1",
        title: "Maze Visualization",
        description:
          "Pathfinding benchmarking tool that encompasses four different algorithms and a functional GUI.",
        link: "https://github.com/JJDOESIT/mazev2",
        id: 2,
      },
    ]);
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-title">
        <div className="wave-text">
          <p>Projects</p>
          <p>Projects</p>
        </div>
        <p>Explore My Previous Projects</p>
      </div>
      <div className="portfolio-grid">
        {portfolioData.map((card) => {
          return (
            <div className="card-container" key={card.id}>
              <div className="card-image">
                <img
                  src={require("../pictures/" + card.image + ".png")}
                  alt="img"
                ></img>
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
                    src={require("../pictures/link-icon.png")}
                    alt="img"
                  ></img>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
