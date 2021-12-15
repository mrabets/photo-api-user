import { useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';
import {Like} from './Like'
import axios from 'axios';

export function Photo(props: any) {

  const onClick = () => {
    if (window.confirm('Are you sure?')) {
      props.deletePhoto(props.photo)
    }
  }

  return (
    <div className="card">
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
