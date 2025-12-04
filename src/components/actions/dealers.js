import axios from "axios";
import {
    setDealers,
    setDealersLoadingError
} from "../../reducers/dealersRedusers";
import { setKioskLoadingError, setKioskSettings } from "../../reducers/parametersReducer";

const getToken = async () => {
    const url = `${_default.protocol}://api.dev.100czk.cz/api_v3/get_test_kiosk_token`;
    return await axios.get(url);
};

export const getKioskSettings = (setIsLoading) => {
    let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? "/" + global.config.apiPrefix : ""}/get_kiosk_settings${global.config.sid ? "?sid=" + global.config.sid : ""}`;

    return async (dispatch) => {

        try {
            const data = await axios({
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "application/json"
                    // "Authorization": `Bearer ${global.config.sid}`
                }
            });
            if (data?.data?.data.kiosk_status !== 'OK' || data?.data?.data.kiosk_error) {
                // console.log('data?.data?.data', data?.data?.data);
                dispatch(setKioskLoadingError(data?.data?.data.kiosk_error));
            }
            else if (data?.data?.data) {
                dispatch(setKioskSettings({...data?.data.data, language_memo: data?.data.data.language_memo.toLowerCase()}));
                setIsLoading && setIsLoading(false)
            }
        } catch (e) {
            console.log("о ш и б к а");
            console.log(e);
            dispatch(setKioskLoadingError('Settings loading error'));
            setIsLoading && setIsLoading(false);
        }

    };
};

export const getDealers = (setIsLoading) => {

    // if(!global.config.sid) {
    //     const data = getToken();
    //     console.log("t", data.data.data.key);
    //     // global.config.sid='383f6145daa9297a2275603d6819887e';
    //     global.config.sid = data.data.data.key;
    // }

    console.log('global.config.sid', global.config.sid);
    // const url = `http://localhost:4200/get_kiosk_collaborators`
    let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? "/" + global.config.apiPrefix : ""}/get_kiosk_additional_dealers${global.config.sid ? "?sid=" + global.config.sid : ""}`;



    return async (dispatch) => {

        try {
            const data = await axios({
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "application/json"
                    // "Authorization": `Bearer ${global.config.sid}`
                }
            });
            if (data?.data?.data) {
                const dealers = data.data.data;
                dealers.map(dealer => {
                    dealer.label = dealer.name;
                   if (dealer.id !== 0) {
                       dealer.name = 'co-working'
                   } else {
                       dealer.name = 'main'
                   }
                   return dealer;
                });
                dispatch(setDealers(dealers));
                setIsLoading(false)
            }
        } catch (e) {
            console.log("о ш и б к а");
            console.log(e);
            dispatch(setDealersLoadingError());
        }


        //     .then((data) => {
        //   console.log("цукцукцукц");
        //   dispatch(setDealers(data.data.data));
        // }).catch((error) => {
        //   console.log("о ш и б к а");
        //   dispatch(setDealersLoadingError());
        // });

        // console.log('dealers:', response)

        // if (Array.isArray(response?.data?.data)) {
        //     dispatch(setDealers(response.data.data));
        // } else {
        //   dispatch(setDealersLoadingError());
        // }
    };
};
