import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// const api_url = `http://127.0.0.1:3001/api/v1/photos`

class Navbar extends Component {
	
	render() {

		return (
			<div className="container">
			  <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				  <a href={'/'} className="App-logo">PHOTO SITE</a>
				    {/*<a class="btn btn-danger" href="logout">Lo</a>	*/}

				    <form className="nav-btn d-flex">
				      <Link className="btn btn-outline-primary me-2" to='/sign_up'>Sign Up</Link>
				      <Link className="btn btn-primary"  to='/sign_in'>Sign In</Link>
				      {/*<a className="btn btn-outline-primary me-2" href="login">Sign in</a>
				      <a className="btn btn-primary" href="signup">Sign up</a>*/}
				    </form>

			  </nav>
			</div>
		)
	}
}

export default Navbar;