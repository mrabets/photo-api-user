import { useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';
import {Like} from './Like'
import axios from 'axios';

export function Photo(props) {

  const onClick = () => {
    if (window.confirm('Are you sure?')) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }

      axios
        .delete(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo.id}`, 
          { headers: headers }
        )
        .then(response => console.log(response))
        .catch(error => console.log(error.response.data.error))
    }
  }

  return (
    <div className="card" width="18rem">
      <button 
        className='Photo-delete-button'
        onClick={onClick}
      >
        <TiDelete size={20}/>
      </button>

      <img
        className="card-img-top"
        src={`http://localhost:3000/${props.photo.image}`}       
      />

      <div className="card-body">
        <p className="card-text">{props.photo.name}</p>
        <Like photo_id={props.photo.id}/>
      </div>
    </div>
  );
}
