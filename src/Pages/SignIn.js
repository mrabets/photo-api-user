import React, { Component } from 'react';
import axios from 'axios';


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    axios
      .post(process.env.REACT_APP_API_URL + '/users/sign_in', {
        user: {
          email,
          password
        }
      })
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      })
      .catch(error => console.log(error))
    }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Own-form">
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              className="form-control"
            />
          </div>

          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default SignIn;
