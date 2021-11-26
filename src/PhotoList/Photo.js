import React, {Component} from 'react'

export default function Photo(props) {
	return (
		<div>
			<p>{props.photo.name}</p>
			{/*<p>{props.photo.image}</p>*/}
			<img src={`http://localhost:3001/${props.photo.image}`} width="200px" height = '200px' />
		</div>
	)
}