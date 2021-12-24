import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { setUser } from '../store/userSlice'
import { Button, Form } from 'react-bootstrap';

export function SignUp() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password_confirmation, setPasswordConfirmation] = useState<string>('') 
  const [api_errors, setApiErrors] = useState<string>('');

  const onSubmit = async () => {
    try {
      const response = await axios
        .post(process.env.REACT_APP_API_URL + '/users/', {
          user: {
            email,
            password,
            password_confirmation
          },
        })

      const data = response.data
      
      dispatch(setUser({
        id: data.user.id,
        email: data.user.email,
        token: data.token
      }))

      navigate('/', {replace: true})
    } catch(error: any) {
      setApiErrors(error.response.data.error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="Own-form">
      <Form.Group className="Error-label">
        {api_errors}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          {...register("email", {
            required: true,
          })}
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
        <Form.Group className="Error-label">
          {errors?.email?.type === "required" && <p>Email is required</p>}
        </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
          {...register("password", {
            required: true,
          })}
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control"
        />
        <Form.Group className="Error-label">
          {errors?.password?.type === "required" && <p>Password is required</p>}
        </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="form-label">Password confirmation</Form.Label>
        <Form.Control
          type="password"
          name="password_confirmation"
          value={password_confirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          className="form-control"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
