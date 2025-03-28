const SET_KIOSK_SETTINGS = "SET_KIOSK_SETTINGS";
const LOADING_ERROR = "LOADING_ERROR";

const defaultState = {
    // protocol: "https",
    // apiHost: "api.100czk.cz",
    // apiPrefix: "api_v2",
    // sid: "",
    // currency: "Kč",

    currency_id: 57,
    currency_memo: "CZK",
    currency_symbol: "Kc",
    kiosk_error: "",
    kiosk_name: "Test teminal",
    kiosk_status: "OK",
};

function parametersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_KIOSK_SETTINGS:
            return {
                ...state,
                ...action.payload
            };
        case SET_KIOSK_SETTINGS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default parametersReducer;

export const setKioskSettings = (settings) => ({
    type: SET_KIOSK_SETTINGS,
    payload: settings
});
export const setKioskLoadingError = (error) => ({
    type: LOADING_ERROR,
    payload: error
});
