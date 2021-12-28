import { useState, useEffect } from 'react';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';
import axios from 'axios';

export function Like(props: any) {
  const [liked, setLiked] = useState(false)
  const [like_count, setLikeCount] = useState(props.photo.likes_count)

  useEffect(() => {
    getLike()
  }, []);

  function getLike() {
    console.log(props)
    axios
      .get(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo.id}/like_status`, {
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

  const onLike = (headers: { 'Content-Type': string; Authorization: string; }) => {
    axios
    .post(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo.id}/likes`, null,  
      { headers: headers }
    )
    .then(response => {
      setLiked(true);
      setLikeCount(like_count + 1)
    })
    .catch(error => console.log(error.response.data.error))
  }

  const onUnlike = (headers: { 'Content-Type': string; Authorization: string; }) => {
    axios
    .delete(process.env.REACT_APP_API_URL + `/api/v1/photos/${props.photo.id}/likes`,  
      { headers: headers }
    )
    .then(() => {
      setLiked(false)
      setLikeCount(like_count - 1)
    })
    .catch(error => console.log(error.response.data.error))
  }

  return ( 
    <>
    <button onClick={onClick} className='Like-button'>
      { liked ? <RiThumbUpFill /> : <RiThumbUpLine />}      
    </button>
    
    {like_count}
    </>
  )
}