import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { PhotoForm } from './PhotoForm';
import { Photo } from './Photo';
import { useAuth } from '../hooks/use-auth';
import { IPhoto } from '../types/data'

export function PhotoList() {
  const navigate = useNavigate()

  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const {isAuth} = useAuth() 

  useEffect(() => {
    getPhotos()
  }, []);

  const getHeaders = () => {
    return { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const getPhotos = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_API_URL + '/api/v1/photos', {
          headers: getHeaders()
        })
      
      const data = response.data
      
      setPhotos(data.reverse()) 
  
      navigate('/', {replace: true})

    } catch(error: any) {
      console.log(error)
    } 
  }

  const updatePhotoList = (photo: IPhoto) => {
    let _photos = photos;
    _photos.unshift(photo);
    setPhotos(_photos);

    navigate('/', {replace: true})
  }

  const updatePhotoListAfterDelete = (photo: IPhoto) => {
    let _photos = photos;
    const photoIndex = _photos.indexOf(photo)
    _photos.splice(photoIndex, 1)
    setPhotos(_photos)
  }

  const deletePhoto = async (photo: IPhoto) => {
    try {
      const response = await axios
        .delete(process.env.REACT_APP_API_URL + `/api/v1/photos/${photo.id}`, 
          { headers: getHeaders() }
        )
        
      console.log(response)
  
      updatePhotoListAfterDelete(photo)
  
      navigate('/', {replace: true})

    } catch(error: any) {
      console.log(error.response.data.error)
    } 
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