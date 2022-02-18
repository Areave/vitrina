import React from 'react'
import { useLocation } from 'react-router-dom';

function Shop() { 
	const url = useLocation()?.search?.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g)[0]

	return (
		<iframe id="iframe" src={url} title="Shop"></iframe>
	)
}

export default Shop;