import axios from "axios";
import { setErrorGateResponse, setPaymentGateProccess } from "../../reducers/cartReducer";
import { resetModal } from "../../reducers/storageReducer";


async function loopFunc ({url, data = {}, checkFunc}, delay = 1000, attempt = 0) {
    const looper = await setInterval( async function() { 
        attempt++;

        const response = await axios({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })

        if (attempt >= 50 || checkFunc(response))
        {
            clearInterval(looper);
            return response
        }
        
        clearInterval(looper)
        await loopFunc({url, data, checkFunc}, delay*1.1, attempt)
    }, delay);
}

export const sendPaymentToGate = (payload) => {
    console.log('payload:', payload)
    const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/open_kiosk_transaction?sid=${global.config.sid}`;


    return async (dispatch) => {
        dispatch(setPaymentGateProccess(true))
        dispatch(setErrorGateResponse(null))

        let response
        if (payload) {
            response = await axios({
                method: "POST",
                url: url,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    payment_type: payload.paymentMethod,
                    service: "SRV_100CZK",
                    url_ok: `${window.location.origin}`,
                    // url_fail: `${window.location.origin}/error-payment`,
                    url_fail: null,
                    currency: "CZK",
                    amount: payload.amount,
                    commission: payload.amountTips || 0,
                    sum: payload.amount + (payload.amountTips || 0),
                    redirect: false,
                    params: {
                        custmer_id: payload.customerId,
                        custmer_name: payload.customerName,
                        date: payload.date
                    },
                    goods: payload.goods,
                },
            });
        }

        console.log('response:', response)
        if (response?.status == 200 && response?.data?.status === 'OK' && response?.data?.data?.transaction_code) {
            const transaction_code = response.data.data.transaction_code
            const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/get_kiosk_transaction_status?sid=${global.config.sid}`
            loopFunc({url, data:{transaction_code}, checkFunc: (res) => {
                console.log('Result of chkFunc', res)
                switch(res?.data?.data?.status) {
                    case "OPERATION_FAILED":
                    case "OPERATION_TIMEOUT":
                        dispatch(setErrorGateResponse({
                            status: res?.data?.status,
                            message: res?.data?.message
                        }));
                        return true
                    case "OPERATION_CANCELED": 
                        dispatch(resetModal())
                        return true
                }
            }})
        } else if (response?.status === 200 && response?.data) {
            dispatch(setErrorGateResponse({
                status: response?.data?.status,
                message: response?.data?.message
            }));
        } else {
            dispatch(setErrorGateResponse({
                status: 'ERROR_GATE',
                message: "Response not correct"
            }));
        }
    };
};
