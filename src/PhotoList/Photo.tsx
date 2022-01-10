import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import {Like} from './Like'
import axios from 'axios';
import { useAuth } from '../hooks/use-auth';

export function Photo(props: any) {
  const {user_id} = useAuth()

  const onClick = () => {
    if (window.confirm('Are you sure?')) {
      props.deletePhoto(props.photo)
    }
  }

  return (
    <div className="card">
      {
        user_id == props.photo.user_id ? (
          <button 
            className='Photo-delete-button'
            onClick={onClick}
          >
            <TiDelete size={20}/>
          </button>
        ) : (
          <div></div>
        )
      }
      <img
        className="card-img-top"
        src={process.env.REACT_APP_API_URL + `/${props.photo.image}`}       
      />

      <div className="card-body">
        <p className="card-text">{props.photo.name}</p>
        <Like photo={props.photo}/>
      </div>
    </div>
  );
}
