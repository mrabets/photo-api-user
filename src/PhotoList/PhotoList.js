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

	render() {
		return (
			<div>
				<PhotoForm />
				<ul>
		            <li>Photo#1</li>
		            <li>Photo#2</li>
		            <li>Photo#3</li>
		        </ul>   
			</div>
		)
	}
}

export default PhotoList;