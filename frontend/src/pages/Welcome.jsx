import { NavLink } from "react-router-dom";
import "../styles/Welcome.scss";

function Welcome() {
  return (
    <div className="welcome-box">
      <NavLink className="projets" to="/projects">
        <h2 className="project-real">Mes projets réalisés</h2>
      </NavLink>

      <NavLink className="About-me" to="/about-me">
        <h2 className="discover-me">Me découvrir</h2>
      </NavLink>
    </div>
  );
}

export default Welcome;
