import axios from "axios";
import { setErrorGateResponse, setPaymentGateProccess } from "../../reducers/cartReducer";


export const printReceipt = (payload) => {
    const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/print_receipt?sid=${global.config.sid}`;

    return async (dispatch) => {

        // return {status: 'OK'}

        const response = await axios({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
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
