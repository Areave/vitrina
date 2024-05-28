import axios from "axios";
// import { setErrorGateResponse, setPaymentGateProccess } from "../../reducers/cartReducer";


export const printCollections = (payload) => { // goto inkasace page

    const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/open_terminal_collection`;

    return async (dispatch) => {

        // return {status: 'FAIL'}

        const response = await axios({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${global.config.sid}`
            },
            data: []
        });
        
        // console.log('collecions:', response)
        
        if (response?.status == 200 && response?.data?.text === 'Redirect done') {
            return {status: 'OK'}
        } else  {
            return {status: 'FAIL'}
        } 
    };
};
