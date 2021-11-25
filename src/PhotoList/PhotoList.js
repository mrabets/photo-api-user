import React, {Component} from 'react'
import PhotoForm from './PhotoForm'

const api_url = `http://127.0.0.1:3001/api/v1/photos`

class PhotoList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			photos: []
		}
	}

	componentDidMount() {
		this.getNames();
	}

	getNames() {
		fetch(api_url) 
		.then(response => response.json())
		.then(response_photos => {
			this.setState({
				photos: response_photos
			})
		});
	}

	render() {
		console.log(this.state.photos)

		return (
			<div>
				<PhotoForm />
				<ul id="photo_list">
		            {this.state.photos.map((photo) => (
		            	<li key={photo.id}>{photo.name}</li>
		            ))}
		        </ul>   
			</div>
		)
	}
}

export default PhotoList;