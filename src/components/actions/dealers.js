import axios from "axios";
import {
    setDealers,
    setDealersLoadingError
} from "../../reducers/dealersRedusers";

export const getDealers = () => {

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
