import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoFineksi from '../assets/logo fineksi.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand" href="/">
          <img
            src={logoFineksi}
            alt="Fineksi Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </a>

        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle text-dark text-decoration-none"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle me-2"></i>
            User Name
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><a className="dropdown-item" href="/profile">Profile</a></li>
            <li><a className="dropdown-item" href="/settings">Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


