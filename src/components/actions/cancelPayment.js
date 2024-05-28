import axios from "axios";
import { setErrorGateResponse, setPaymentGateProccess } from "../../reducers/cartReducer";


export const cancelPayment = (payload) => {
    // console.log('invoke file')
    const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/cancel_kiosk_transaction`;

    return async (dispatch) => {

        // return {status: 'OK'}

        const response = await axios({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.config.sid}`
            },
            data: []
        });
        
        if (response?.status == 200 && response?.data?.text === 'Redirect done') {
            return {status: 'OK'}
        } else  {
            return {status: 'FAIL'}
        } 
    };
};