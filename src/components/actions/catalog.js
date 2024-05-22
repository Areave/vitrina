import axios from "axios";
import { setCatalog } from "../../reducers/catalogReducer";
import { setItemServiceFee } from "../../reducers/cartReducer";

export const getCatalog = (button) => {

	// const url = `http://localhost:4200/get_kiosk_catalog`
	let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_catalog`

	if (button) {
		url = url + '?button=true'
	}
	return async (dispatch) => {
		const response = await axios({
			method: 'GET',
			// method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${global.config.sid}`
			}
		})
		dispatch(setCatalog(response?.data?.data))
		dispatch(setItemServiceFee(response?.data?.data.products.filter(item => item.type === 'GOODS_SERVICE_FEE')?.[0]))
	}
}