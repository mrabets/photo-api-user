import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../hooks/use-auth';

export const PhotoForm = (props: any) => {
  const {isAuth} = useAuth();

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  });

  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<Blob>(new Blob());
  
  const getHeaders = () => {
    return { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const onSubmit = async () => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('image', image)

    try {
      const response = await axios
        .post(process.env.REACT_APP_API_URL + '/api/v1/photos', formData,  
          { headers: getHeaders() }
        )
  
      props.updatePhotoList(response.data)
     
    } catch(error: any) {
      console.log(error.response.message)
    } 
  }

  return (
    <div>
      {
        isAuth ? (
          <Form onSubmit={handleSubmit(onSubmit)} className="Own-form">
          <Form.Label className="form-label">
            Name
            <Form.Control
              {...register("name", {
                required: true,
              })}
              id="name_input"
              className="form-control"
              type="text"
              name="name"
              onChange={e => setName(e.target.value)}
            />
          </Form.Label>
          
          <Form.Group className="Error-label">
              {errors?.name?.type === "required" && <p>This field is required</p>}
          </Form.Group>

          <Form.Label className="form-label">
            <Form.Control
              {...register("image", {
                required: true,
              })}
              id="image_input"
              className="form-control"
              type="file"
              name="image"
              onChange={(e: any) => {
                if (!e.target.files) return;
                setImage((e.target.files[0]));
              }}
            />
          </Form.Label><br/><br/>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        ) : (
          <>
          </>
        )
      }
    </div>
  );
}
