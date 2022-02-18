import axios from "axios";
import { setErrorGateResponse, setPaymentGateProccess } from "../../reducers/cartReducer";
import { resetModal } from "../../reducers/storageReducer";


export const sendPaymentToGate = (payload) => {
    console.log('payload:', payload)
    const url = `${global.config.protocol}://${global.config.apiHost}/${global.config.apiPrefix}/open_kiosk_transaction?sid=${global.config.sid}`;

    return async (dispatch) => {
        dispatch(setPaymentGateProccess(true))

        if (payload) {
            const response = await axios({
                method: "POST",
                url: url,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    payment_type: payload.paymentMethod,
                    service: "SRV_100CZK",
                    url_ok: `${window.location.origin}`,
                    url_fail: `${window.location.origin}/error-payment`,
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
        
        if (response?.status == 200 && response?.data?.status === 'OK' && response?.data?.data?.transaction_code) {
            dispatch(resetModal())
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
