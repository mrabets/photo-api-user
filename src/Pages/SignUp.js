import React, { Component } from 'react';
import axios from 'axios';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password, password_confirmation } = this.state;

    axios
      .post(process.env.REACT_APP_API_URL + '/users/', {
        user: {
          email,
          password,
          password_confirmation
        }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  render() {
    const { email, password, password_confirmation } = this.state;

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

          <div className="mb-3">
            <label className="form-label">Password confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              value={password_confirmation}
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

export default SignUp;
