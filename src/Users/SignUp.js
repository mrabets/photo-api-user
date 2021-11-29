import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const api_url = `http://localhost:3001/users`

class SignUp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			password: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	handleSubmit(event) {
    event.preventDefault();

    fetch(api_url, {
    	headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
    	method: "POST",
    	 body: JSON.stringify({
		    user: {
		      mode: "cors", 
		      email: this.state.email,
		      password: this.state.password,
		    },
		  }),
    })
    .then(response => response.json())
		.then(response => console.log(response))
	}

	onChange(event) {
	    this.setState({
	    	[event.target.name]: event.target.value 
	    });
	}

	render() {

		return (
			<div className="Own-form">
			  <form onSubmit={this.handleSubmit}>
				  <div className="mb-3">
				    <label className="form-label">Email</label>
				    <input
				    type="email"
				    name="email"
				    value={this.state.email} 
				    onChange={this.onChange} 
				    className="form-control" />
				  </div>
				  
				  <div className="mb-3">
				    <label className="form-label">Password</label>
				    <input 
				    type="password" 
				    name="password"
				    value={this.state.password} 
				    onChange={this.onChange} 
				    className="form-control" />
				  </div>
				  
				  <input type="submit" className="btn btn-primary" />
				</form>
			</div>
		)
	}
}

export default SignUp;