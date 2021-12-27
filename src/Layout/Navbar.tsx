import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isAuth} = useAuth()

  const onLogOut = () => {
    dispatch(removeUser());
    navigate('/', {replace: true})
  }

  return (
    <div className="container">
      <nav className="navbar">
        
        <Link to="/" className="App-logo">
          Photo Api
        </Link>

        { isAuth ? ( 
        
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
