import React, {Component} from 'react'

class PhotoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			api_url: props.api_url,
			name: "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.formSubmit(event.target);
	}

	async formSubmit(formData) {
		const data = new FormData(formData);
		await fetch(this.state.api_url, {
			method: "POST",
			mode: "cors",
			body: data
		}).then(response => response.json())
		.then(response => this.props.updatePhotoList(response))
	}

	handleNameChange(event) {
		this.setState({
			photo: event.target.value
		})
	}

	render() {
		return (
			<div>
				<form
				onSubmit={this.handleSubmit}
				id="photo_form"
				autoComplete="off">
					<label>
						Name:
				    	<input 
				    	id="name_input"
				    	type="text" 
				    	name="photo[name]"
				    	onChange={this.handleNameChange }/>
					</label>
				 	<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}

export default PhotoForm;