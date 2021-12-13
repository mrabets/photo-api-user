import {Like} from './Like'

export function Photo(props) {
  return (
    <div className="card" width="18rem">
      <img
        className="card-img-top"
        src={`http://localhost:3000/${props.photo.image}`}
        width="200px"
        height="200px"
      />

      <div className="card-body">
        <p className="card-text">{props.photo.name}</p>
        <Like photo_id={props.photo.id}/>
      </div>
    </div>
  );
}
