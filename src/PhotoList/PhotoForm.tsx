import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PhotoForm: React.FC<any> = (props) => {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur"
  });

  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<Blob>(new Blob());

  const onSubmit = () => {
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
      .catch(error => console.log(error.response.message))
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
            onChange={e => {
              if (!e.target.files) return;
              setImage((e.target.files[0]));
            }}
          /><br />
        </label>

        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
}

export {PhotoForm}