import { useState, useEffect } from 'react';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';
import axios from 'axios';


export function Like(props) {
  const [liked, setLiked] = useState(null)

  useEffect(() => {
    getLike()
  }, []);

  function getLike() {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo_id}/like_status`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => response.data)
      .then(data => {setLiked(data.status)}) 
      .catch(error => console.log(error.response))
  }

  const onClick = () => {
    setLiked(!liked)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    liked ? onUnlike(headers) : onLike(headers)
  }

  const onLike = (headers) => {
    axios
    .post(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo_id}/likes`, null,  
      { headers: headers }
    )
    .then(response => {
      setLiked(true)
    })
    .catch(error => console.log(error.response.data.error))
  }

  const onUnlike = (headers) => {
    axios
    .delete(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo_id}/likes`,  
      { headers: headers }
    )
    .then(response => {
      setLiked(false)
    })
    .catch(error => console.log(error.response.data.error))
  }

  return (
    <>
      <button
        onClick={onClick}
        className='like-button'
        
      >
        { liked ? <RiThumbUpFill /> : <RiThumbUpLine />}
        
      </button>
      
    </>
  )
}