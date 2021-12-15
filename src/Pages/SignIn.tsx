import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IUser {
  email: string;
  password: string;
}

export function SignIn() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [api_errors, setApiErrors] = useState<string>('');

  const onSubmit = () => {
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
      .catch(error => setApiErrors(error.response.data.error))
  } 

  return (
    <div className="Own-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Error-label">
          {api_errors}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
          />
          <div className="Error-label">
            {errors?.email?.type === "required" && <p>This field is required</p>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
          />
          <div className="Error-label">
            {errors?.password?.type === "required" && <p>This field is required</p>}
          </div>
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
