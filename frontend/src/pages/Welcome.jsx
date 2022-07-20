import { NavLink } from "react-router-dom";
import "../styles/Welcome.scss";

function Welcome() {
  return (
    <div className="welcome-box">
      <NavLink className="projets" to="/projects">
        <h1 className="project-real">Mes projets réalisés</h1>
      </NavLink>

      <NavLink className="About-me" to="/about-me">
        <h1 className="discover-me">Me découvrir</h1>
      </NavLink>
    </div>
  );
}

export default Welcome;
