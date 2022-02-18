import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { emptyDate } from '../reducers/cartReducer';
import { setCollaborator } from '../reducers/collaboratorsRedusers';
// import { getCollaborators } from './actions/collaborators';

function Terminal(props) {
	const url = useLocation();
	
	// const collaborators = props.collaborators
	
	const dispatch = useDispatch()

	// useEffect(()=>{
	// 	dispatch(getCollaborators())
	// }, [])

	const collaborators = useSelector(state => state.collabarators.items)

	const onClickSetCollaborator = (id) => {
		dispatch(setCollaborator(id))
		dispatch(emptyDate())
	}

	return (
		<>
			<div id="employees" className="unvisibled" style={{opacity: 1}}>
				<ul id="employeesul" className="tiles">
					{
						Array.isArray(collaborators) && collaborators.length 
						?
							collaborators.map((item, index)=>{
								return (<li key={index}><a onClick={()=>onClickSetCollaborator(item.id)}><span>{item.name}</span></a></li>)
							})
						:
							''
					}					
				</ul>
			</div>
		</>
	)
}

export default Terminal;