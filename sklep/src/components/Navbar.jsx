import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Wylogowano pomyślnie.");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          style={{ fontFamily: "caveat", fontSize: "30px" }}
          to="/"
        >
          blob
          <img
            src={"src/images/home/blob (3).svg"}
            alt={"blob"}
            style={{ top: "10%", left: "60%", height: "50px", width: "50px" }}
          />
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
              <Link className="nav-link" to="/cart">
                Koszyk
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Zamówienia
              </Link>
            </li>
            <li className="nav-item ms-auto">
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
              <button className="nav-link btn" onClick={handleLogout}>
                Wyloguj
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
