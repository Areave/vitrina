import axios from "axios";
import {
  setCollaborators,
  setCollaboratorsLoadingError,
} from "../../reducers/collaboratorsRedusers";

export const getCollaborators = (searchQuery) => {

  // const url = `http://localhost:4200/get_kiosk_collaborators`
  const url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_collaborators${global.config.sid ? '?sid=' + global.config.sid : ''}`;

  return async (dispatch) => {
    
    const response = await axios({
      method: "GET",
      // method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('collaborators:', response)
    
    if (Array.isArray(response?.data?.data)) {
      dispatch(setCollaborators(response.data.data));
    } else {
      dispatch(setCollaboratorsLoadingError());
    }
  };
};
