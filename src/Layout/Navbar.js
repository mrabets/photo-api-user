import Button from '@restart/ui/esm/Button';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token'));

  const onLogOut = () => {
    localStorage.removeItem('token')
    navigate('/', {replace: true})
  }

  return (
    <div className="container">
      <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        
        <Link to="/" className="App-logo">
          PHOTO SITE
        </Link>

        { token ? ( 
        
          <div className="nav-btn d-flex">

            <button onClick={onLogOut} className="btn btn-outline-primary me-2">
              Log Out
            </button>

          </div>
    
         
          ) : (

            <div className="nav-btn d-flex">

              <Link to="/sign_up" className="btn btn-outline-primary me-2">
                Sign Up
              </Link>
    
              <Link to="/sign_in" className="btn btn-primary">
                Sign In
            </Link>

            </div>
          )
        }
        
      </nav>
    </div>
  )
};

export default Navbar;
