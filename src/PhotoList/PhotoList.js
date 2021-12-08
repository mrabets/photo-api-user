import React, { Component } from 'react';
import PhotoForm from './PhotoForm';
import Photo from './Photo';

const api_url = 'http://127.0.0.1:3001/api/v1/photos';

class PhotoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
    this.updatePhotoList = this.updatePhotoList.bind(this);
  }

  componentDidMount() {
    this.getNames();
  }

  getNames() {
    // fetch(api_url)
    // .then(response => response.json())
    // .then(response_photos => {
    // 	this.setState({
    // 		photos: response_photos.reverse()
    // 	})
    // });
  }

  updatePhotoList(photo) {
    const _photos = this.state.photos;
    _photos.unshift(photo);
    this.setState({
      photos: _photos,
    });
  }

  render() {
    return (
      <div>
        <div>
          <PhotoForm api_url={api_url} updatePhotoList={this.updatePhotoList} />
          <br />
          <br />
        </div>
        <div className="Photo-list">
          {this.state.photos.map((photo) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    );
  }
}

export default PhotoList;
