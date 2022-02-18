const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const EMPTY_CART = "EMPTY_CART";
const PAYMENT_GATE_PROCCESS = "PAYMENT_GATE_PROCCESS";
const ERROR_PAYMENT_GATE_RESPONSE = "ERROR_PAYMENT_GATE_RESPONSE";
const SET_DATE = "SET_DATE";
const EMPTY_DATE = "EMPTY_DATE";
const SET_AMOUNT_TIPS = "SET_AMOUNT_TIPS";

const defaultState = {
    items: [],
    isFetching: true,
    amount: 0,
    amountTips: 0,
    parmentModal: false,
    isPaymentGateProccess: false,
    errorPaymentGateResponse: false,
    date: null,
};

let items = [];

function cartReducer(state = defaultState, action) {
    switch (action.type) {
        case EMPTY_CART:
            return defaultState;
        case ADD_PRODUCT:
            items = [...state.items, action.payload];
            return {
                ...state,
                items: items,
                amount: items.reduce((acc, item) => acc + item.price, 0),
            };
        case REMOVE_PRODUCT:
            let rem = true;
            items = state.items.filter((item) => {
                if (item.id === action.payload && rem) {
                    rem = false;
                    return false;
                }
                return true;
            });
            return {
                ...state,
                items: items,
                amount: items.reduce((acc, item) => acc + item.price, 0),
            };
        case PAYMENT_GATE_PROCCESS:
            return {
                ...state,
                isPaymentGateProccess: action.payload,
            };
        case ERROR_PAYMENT_GATE_RESPONSE:
            return {
                ...state,
                errorPaymentGateResponse: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case EMPTY_DATE:
            return {
                ...state,
                date: null,
            };
        case SET_AMOUNT_TIPS:
            return {
                ...state,
                amountTips: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;

export const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product });
export const removeProduct = (id) => ({ type: REMOVE_PRODUCT, payload: id });
export const emptyCart = () => ({ type: EMPTY_CART, payload: null });
export const setPaymentGateProccess = (condition = true) => ({ type: PAYMENT_GATE_PROCCESS, payload: condition });
export const setErrorGateResponse = (response) => ({ type: ERROR_PAYMENT_GATE_RESPONSE, payload: response });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const emptyDate = () => ({ type: EMPTY_DATE, payload: null });
export const setAmountTips = (amountTips) => ({type: SET_AMOUNT_TIPS, payload: amountTips})