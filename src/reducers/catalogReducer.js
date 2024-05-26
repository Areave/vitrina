
const SET_CATALOG = 'SET_CATALOG'
const ADD_BREADCRUMB = 'ADD_BREADCRUMB'
const SLICE_BREADCRUMB = 'SLICE_BREADCRUMB'

const defaultState = {
	breadcrumb: [],
	items: {main: []},
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
			let key;
			if (action.payload.currentDealer) {
				key = action.payload.currentDealer.name;
			} else {
				key = 'main';
			}
			return {
				...state,
				items: {...state.items, [key]: action.payload.catalog},
				isFetching: false,
			};
		default:
			return state
	}
}

export default catalogReducer

export const setCatalog = (catalog, currentDealer) => ({type:SET_CATALOG, payload: {catalog, currentDealer}})

export const addBreadcrumb = (category) => ({type:ADD_BREADCRUMB, payload: category})

export const sliceBreadcrumb = (num) => ({type:SLICE_BREADCRUMB, payload: num})