import axios from "axios";
import {
    setCollaborators,
    setCollaboratorsLoadingError
} from "../../reducers/collaboratorsRedusers";

export const getCollaborators = (currentDealer) => {

    // const url = `http://localhost:4200/get_kiosk_collaborators`
    let url = `${global.config.protocol}://${global.config.apiHost}${global.config.apiPrefix ? "/" + global.config.apiPrefix : ""}/get_kiosk_collaborators${global.config.sid ? "?sid=" + global.config.sid : ""}`;
    let data = {};
    if (currentDealer) {
        data = { dealer_id: currentDealer.id };
    }


    return async (dispatch) => {

        const response = await axios({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${window.config.sid}`
            },
            data
        });

        // console.log('collaborators:', response)

        if (Array.isArray(response?.data?.data)) {
            dispatch(setCollaborators(response.data.data, currentDealer));
        } else {
            dispatch(setCollaboratorsLoadingError());
        }
    };
};
