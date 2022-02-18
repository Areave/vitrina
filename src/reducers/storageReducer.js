const SET_COUNT = "SET_COUNT";
const MODAL_PICKUP = "MODAL_PICKUP";
const MODAL_EMPTY_CART = "MODAL_EMPTY_CART";
const MODAL_PAYMENT = "MODAL_PAYMENT";

const SET_MODAL = "SET_MODAL";
const RESET_MODAL = "SET_MODAL";

const defaultState = {
    modal: null,
    collaboratorId: null,
};

function storageReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MODAL:
            console.log("SET_MODAL", action.payload);
            return {
                ...state,
                modal: {
                    name: action.payload?.name,
                    step: action.payload?.step
                },
            };
        case RESET_MODAL:
            return {
                ...state,
                modal: null,
            };
        default:
            return state;
    }
}

export default storageReducer;

export const setModal = (modal) => ({ type: SET_MODAL, payload: modal });
export const resetModal = () => ({ type: RESET_MODAL, payload: null });
