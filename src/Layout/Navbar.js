import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="container">
    <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      
      <Link to="/" className="App-logo">
        PHOTO SITE
      </Link>

      <form className="nav-btn d-flex">

        <Link to="/sign_up" className="btn btn-outline-primary me-2">
          Sign Up
        </Link>

        <Link to="/sign_in" className="btn btn-primary">
          Sign In
        </Link>

      </form>

    </nav>
  </div>
);

export default Navbar;
