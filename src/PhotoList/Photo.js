import React, {Component} from 'react'

export default function Photo(props) {
	return (
		<li>{props.photo.name}</li>
	)
}