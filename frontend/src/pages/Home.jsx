import { NavLink } from "react-router-dom";

import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="title">
        <h1>Bienvenue</h1>
      </div>
      <div className="description">
        <h3>
          Futur Développeur junior, je vous enmène sur mon portfolio à découvrir
          éffectué en 3jours ( à peine!!! ).
        </h3>
        <h2 className="come"> Suivez-moi !</h2>
        <NavLink to="/welcome">
          <button className="button-enter" type="button">
            Cliques-ici
          </button>
        </NavLink>
      </div>
    </div>
  );
}
