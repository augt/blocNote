import React from "react";
import { Link } from "react-router-dom";


function Header(props) {

  function disconnect() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <header>
      <h1>blocNote</h1>
      <nav>
        <ul className="navigation__list">
          <li>
            <Link to="/">Connexion</Link>
          </li>

          <li>
            <Link to="/signup">Inscription</Link>
          </li>

          <li>
            <Link to="/home">Notes</Link>
          </li>

            <li onClick={disconnect} className="btn">
              Déconnexion
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
