import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MojaAplikacja
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Przełącz nawigację"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Strona główna
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Produkty
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Rejestracja
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Logowanie
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Koszyk
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Zamówienia
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
