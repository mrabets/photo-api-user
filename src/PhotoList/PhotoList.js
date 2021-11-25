import React, {Component} from 'react'
import PhotoForm from './PhotoForm'
import Photo from './Photo'

const api_url = `http://127.0.0.1:3001/api/v1/photos`

class PhotoList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: []
		}
		this.updatePhotoList = this.updatePhotoList.bind(this);
	}

	componentDidMount() {
		this.getNames();
	}

	getNames() {
		fetch(api_url) 
		.then(response => response.json())
		.then(response_photos => {
			this.setState({
				photos: response_photos.reverse()
			})
		});
	}

	updatePhotoList(photo) {
		let _photos = this.state.photos
		_photos.unshift(photo)
		this.setState({
			photos: _photos
		})
	}

	render() {
		console.log(this.state.photos)

		return (
			<div>
				<PhotoForm api_url={api_url} updatePhotoList={this.updatePhotoList} />
				<ul id="photo_list">
		            {this.state.photos.map((photo) => (
		            	<Photo key={photo.id} photo={photo} />
		            ))}
		        </ul>   
			</div>
		)
	}
}

export default PhotoList;