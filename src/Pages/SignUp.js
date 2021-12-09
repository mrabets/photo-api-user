import React, { useState } from 'react';
import axios from 'axios';


export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('') 

  const handleSubmit = (event) => {
    event.preventDefault();

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

  return (
    <div className="Own-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            className="form-control"
          />
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
