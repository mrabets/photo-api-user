import React, {Component} from 'react';
import { DirectUpload } from 'activestorage';

class PhotoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			api_url: props.api_url,
			name: "",
			image: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.formSubmit(event.target);
	}

	formSubmit(formData) {
		
		const data = new FormData(formData);

		fetch(this.state.api_url, {
			method: "POST",
			mode: "cors",
			body: data
		})
		.then(response => response.json())
		// .then(data => console.log(data))
		.then(data => this.uploadFile(this.state.image, data))
		// .then(response => this.props.updatePhotoList(response))
	}

	uploadFile = (file, data) => {
		const upload = new DirectUpload(file, 'http://127.0.0.1:3001/rails/active_storage/direct_uploads')
		
		upload.create((error, blob) => {
			if (error) {
				console.log(error)
			} else {
				fetch(`${this.state.api_url}/${data.id}`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					mode: "cors",
					body: JSON.stringify({image: blob.signed_in})
				})
				.then(response => response.json())
				.then(data => this.props.updatePhotoList(data))
			}
		})
	}

	handleNameChange(event) {
		if (event.target.name === 'image') {
			console.log(event.target.files[0])
			this.setState({
				[event.target.name]: event.target.files[0]
			})
		} else {
			console.log(event.target.value)
			this.setState({
				[event.target.name]: event.target.value
			})
		}
	}

	render() {
		return (
			<div>
				<form
				onSubmit={this.handleSubmit}
				id="photo_form"
				autoComplete="off">
					<label><br />
						Name: <br />
				    	<input 
				    	id="name_input"
				    	type="text" 
				    	name="name"
				    	onChange={this.handleNameChange }/>
					</label>

					<label><br /><br />
						Image upload: <br />
				    	<input 
				    	id="image_input"
				    	type="file" 
				    	name="image"
				    	onChange={this.handleNameChange }/>
					</label><br /><br />

				 	<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default PhotoForm;