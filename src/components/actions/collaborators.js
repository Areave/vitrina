import axios from "axios";
import {
  setCollaborators,
  setCollaboratorsBs,
  setCollaboratorsLoadingError,
} from "../../reducers/collaboratorsRedusers";

export const getCollaborators = (button) => {

  // const url = `http://localhost:4200/get_kiosk_collaborators`
  let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? '/' + global.config.apiPrefix : ''}/get_kiosk_collaborators`;
  if (button) {
    url = url + '?button=true'
  }

  return async (dispatch) => {
    
    const response = await axios({
      method: "GET",
      // method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${global.config.sid}`
      },
    });

    console.log('collaborators:', response)
    
    if (Array.isArray(response?.data?.data)) {
      if (button) {
        dispatch(setCollaboratorsBs(response.data.data));
      } else {
        dispatch(setCollaborators(response.data.data));
      }
    } else {
      dispatch(setCollaboratorsLoadingError());
    }
  };
};
