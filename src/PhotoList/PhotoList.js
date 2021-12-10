import React, { useState, useEffect } from 'react';
import {PhotoForm} from './PhotoForm';
import {Photo} from './Photo';
import { useAuth } from '../hooks/use-auth';
import axios from 'axios';

export function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const {isAuth} = useAuth()

  useEffect(() => {
    getNames()
  }, []);

  function getNames() {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/v1/photos', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => response.data)
      .then(data => {console.log(data); setPhotos(data)}) 
      .catch(error => console.log(error.response.data.error))
  }

  function updatePhotoList(photo) {
    const _photos = photos;
    _photos.unshift(photo);

    setPhotos(_photos);
  }

  return (
    <div>
      {
        isAuth ? (
          <>
          <div>
            <PhotoForm updatePhotoList={updatePhotoList} />
          </div>

          <div className="Photo-list">
            {photos.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </div>
          </>
        ) : (
          <h2 className="Message">Please, log in!</h2>
        )
      }
     
      
    </div>
  );
}