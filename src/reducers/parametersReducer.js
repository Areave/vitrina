const SET_PARAMETERS = "SET_PARAMETERS";
const LOADING_ERROR = "LOADING_ERROR";

const defaultState = {
    protocol: "https",
    apiHost: "api.100czk.cz",
    apiPrefix: "api_v2",
    sid: "",
    currency: "Kč"
};

function parametersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PARAMETERS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default parametersReducer;

export const setParameters = (parameters) => ({
    type: SET_PARAMETERS,
    payload: parameters
});
