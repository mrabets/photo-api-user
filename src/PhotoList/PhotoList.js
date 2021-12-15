import { useState, useEffect } from 'react';
import {PhotoForm} from './PhotoForm';
import {Photo} from './Photo';
import { useAuth } from '../hooks/use-auth';
import axios from 'axios';

export function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const {isAuth} = useAuth() 

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  useEffect(() => {
    getPhotos()
  }, [photos]);

  function getPhotos() {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/v1/photos', {
        headers: headers
      })
      .then(response => response.data)
      .then(data => {setPhotos(data.reverse())}) 
      .catch(error => console.log(error))
  }

  function updatePhotoList(photo) {
    let _photos = photos;
    _photos.unshift(photo);
    setPhotos(_photos);
  }

  function deletePhoto(photo) {
    axios
      .delete(process.env.REACT_APP_API_URL + `/api/v1/photos/${photo.id}`, 
        { headers: headers }
      )
      .then(response => console.log(response))
      .catch(error => console.log(error.response.data.error))

    let _photos = photos;
    const photoIndex = _photos.indexOf(photo)
    _photos.splice(photoIndex, 1)
    setPhotos(_photos)
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
              <Photo 
                key={photo.id}
                photo={photo}
                deletePhoto={deletePhoto}
              />
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