import React, { useState } from 'react';
import { DirectUpload } from 'activestorage';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export function PhotoForm(props) {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  });

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = (event) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('image', image)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/api/v1/photos', formData,  
        { headers: headers }
      )
      .then(response => {
        console.log(response.data)
        props.updatePhotoList(response.data)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="Own-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label">
          Name
          <input
            {...register("name", {
              required: true,
            })}
            id="name_input"
            className="form-control"
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
          />
        </label>
        <div className="Error-label">
            {errors?.name?.type === "required" && <p>This field is required</p>}
        </div>

        <label className="form-label">
          <input
            {...register("image", {
              required: true,
            })}
            id="image_input"
            className="form-control"
            type="file"
            name="image"
            onChange={e => setImage(e.target.files[0])}
          /><br />
        </label>

        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
