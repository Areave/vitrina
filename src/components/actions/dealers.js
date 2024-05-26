import axios from "axios";
import {
  setDealers,
  setDealersLoadingError,
} from "../../reducers/dealersRedusers";

export const getDealers = () => {

  // const url = `http://localhost:4200/get_kiosk_collaborators`
  let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_additional_dealers`;

  return async (dispatch) => {
    
    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${global.config.sid}`
      },
    });

    // console.log('dealers:', response)
    
    if (Array.isArray(response?.data?.data)) {
        dispatch(setDealers(response.data.data));
    } else {
      dispatch(setDealersLoadingError());
    }
  };
};
