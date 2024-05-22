import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Terminal from './Terminal';
import TerminalCatalog from './TerminalCatalog';
import Cart from './Cart';
import { getCollaborators } from "./actions/collaborators";
import { getCatalog } from "./actions/catalog";
import { resetCollaborator } from "../reducers/collaboratorsRedusers";

const Wrapper = ({button}) => {

	const collaborator = useSelector(state => state.collabarators.item);
	const dispatch = useDispatch()



	useEffect(() => {
		// setIsFetching(true);
		dispatch(resetCollaborator());
		return () => {

		}

	}, []);

	return (
		<>
			{ collaborator ? 
				(
					<>
						<TerminalCatalog button={button}/>
						<Cart button={button}/>
					</>
				) 
			: 
				(<Terminal button={button}/>)
			}	
		</>
	)
}

export default Wrapper