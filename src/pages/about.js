import "../styles/about.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-title-container">
        <div className="about-image-container">
          <img
            src={require("../pictures/headshot-about.png")}
            alt="headshot"
          ></img>
          <div></div>
        </div>
        <div className="about-text-container">
          <p>About Me</p>
          <br></br>
          <p>
            &emsp;Hello! I'm James Gaboriault-Whitcomb, a freshman at Youngstown
            State University. I'm pursuing a major in computer science, which is
            a subject I'm truly passionate about. My journey into coding began
            during high school, and since then, I've been continuously working
            on exciting projects to broaden my expertise. I love tackling
            challenges and finding solutions to problems. Currently, I enjoy
            working with Python, C++, and Javascript.
          </p>
          <br></br>
          <p>
            &emsp;When I'm not coding, you can find me soaring through the skies
            with FPV drones or building intricate LEGO sets.
          </p>
        </div>
      </div>
    </div>
  );
}
