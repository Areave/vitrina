import axios from "axios";
import { setCatalog } from "../../reducers/catalogReducer";
import { setItemServiceFee } from "../../reducers/cartReducer";

export const getCatalog = (currentDealer) => {

	// const url = `http://localhost:4200/get_kiosk_catalog`
	let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_catalog`
	let data = {};
	if (currentDealer) {
		data = { dealer_id: currentDealer.id };
	}
	return async (dispatch) => {
		const response = await axios({
			method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${global.config.sid}`
			},
			data
		});
		if (response?.data?.data) {
			dispatch(setCatalog(response?.data?.data, currentDealer));
			dispatch(setItemServiceFee(response?.data?.data.products.filter(item => item.type === 'GOODS_SERVICE_FEE')?.[0]))
		}
	}
}