import axios from "axios";
import { setCatalog } from "../../reducers/catalogReducer";

export const getCatalog = (searchQuery) => {	

	// const url = `http://localhost:4200/catalog`
	const url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_catalog${global.config.sid ? '?sid=' + global.config.sid : ''}`
	
	return async (dispatch) => {
		const response = await axios({
			method: 'GET',
			// method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		dispatch(setCatalog(response?.data?.data))
	}
}