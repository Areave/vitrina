
const SET_CATALOG = 'SET_CATALOG'
const ADD_BREADCRUMB = 'ADD_BREADCRUMB'
const SLICE_BREADCRUMB = 'SLICE_BREADCRUMB'

const defaultState = {
	breadcrumb: [],
	items: null,
	isFetching: true
}

function catalogReducer(state = defaultState, action) {
	switch (action.type) {
		case SLICE_BREADCRUMB:
			return {
				...state,
				breadcrumb: state.breadcrumb.slice(0, action.payload + 1)
			}
		case ADD_BREADCRUMB:
			return {
				...state,
				breadcrumb: [...state.breadcrumb, action.payload]
			}
		case SET_CATALOG: 
			return {
				...state,
				items: action.payload
			}
		default:
			return state
	}
}

export default catalogReducer

export const setCatalog = (catalog) => ({type:SET_CATALOG, payload: catalog})

export const addBreadcrumb = (category) => ({type:ADD_BREADCRUMB, payload: category})

export const sliceBreadcrumb = (num) => ({type:SLICE_BREADCRUMB, payload: num})