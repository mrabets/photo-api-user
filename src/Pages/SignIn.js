import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios
      .post(process.env.REACT_APP_API_URL + '/users/sign_in', {
        user: {
          email,
          password
        },
      })
      .then(response => response.data)
      .then(data => {
        dispatch(setUser({
          id: data.user.id,
          email: data.user.email,
          token: data.token
        }))
        navigate('/', {replace: true})
      })
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

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
