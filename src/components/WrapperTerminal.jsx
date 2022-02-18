import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Terminal from './Terminal';
import TerminalCatalog from './TerminalCatalog';
import Cart from './Cart';

const Wrapper = () => {

	const collaborator = useSelector(state => state.collabarators.item)

	return (
		<>
			{ collaborator ? 
				(
					<>
						<TerminalCatalog/>
						<Cart/>
					</>
				) 
			: 
				(<Terminal/>)
			}	
		</>
	)
}

export default Wrapper