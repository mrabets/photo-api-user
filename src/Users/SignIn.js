import React, {Component} from 'react'
import {Link} from 'react-router-dom'

const api_url = `http://localhost:3001/users/sign_in`

class SignIn extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			password: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		console.log("data")
	    this.setState({
	    	[event.target.name]: event.target.value 
	    });
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

  	formSubmit(formData) {
		const data = new FormData(formData);

		fetch(this.state.api_url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			mode: "cors",
			body: JSON.stringify({user: {email: this.state.email, password: this.state.password}})
			})
		.then(response => response.json())
		// .then(data => console.log(data))
		.then(data => console.log(data))
		// .then(response => this.props.updatePhotoList(response))
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

export default SignIn;