const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const EMPTY_CART = "EMPTY_CART";
const PAYMENT_GATE_PROCCESS = "PAYMENT_GATE_PROCCESS";
const ERROR_PAYMENT_GATE_RESPONSE = "ERROR_PAYMENT_GATE_RESPONSE";
const SET_DATE = "SET_DATE";
const EMPTY_DATE = "EMPTY_DATE";
const SET_AMOUNT_TIPS = "SET_AMOUNT_TIPS";
const SET_ITEM_SERVICE_FEE = "SET_ITEM_SERVICE_FEE";

const defaultState = {
    items: [],
    isFetching: true,
    amount: 0,
    amountTips: 0,
    parmentModal: false,
    isPaymentGateProccess: false,
    errorPaymentGateResponse: false,
    date: null,
    countServiceFeeCorrect: 0,
    itemServiceFee: null,
    // {
    //     id: 13613,
    //     type: "GOODS_SERVICE_FEE",
    //     price: 30,
    //     title: "Service fee",
    //     barcode: null,
    //     image_id: null,
    //     presta_id: null,
    //     price_with_vat: null,
    //     add_service_fee: false,
    // },
};

let items = [];

const getFeeStat = (items) => {
    return items.reduce(
        (acc, item) => {
            if (item.type === "GOODS_SERVICE") {
                acc.isGoodsServiceFee = true;
                acc.countAddServiceFee += item.add_service_fee ? 1 : 0;
            }
            return acc;
        },
        { isGoodsServiceFee: false, countAddServiceFee: 0 }
    );
};

function cartReducer(state = defaultState, action) {
    console.log('state', state)
    console.log('action', action)
    let items = [],
        feeStat,
        calcCountServiceFee = 0;

    switch (action.type) {
        case EMPTY_CART:
            return {
                ...defaultState,
                itemServiceFee: state.itemServiceFee
            };
        case ADD_PRODUCT:
            items = [...state.items, action.payload].filter(
                (item) => item.type !== "GOODS_SERVICE_FEE"
            );
            feeStat = getFeeStat(items);

            if (feeStat.isGoodsServiceFee) {
                calcCountServiceFee = feeStat.countAddServiceFee || 1;
            }
            if (action.payload.type === "GOODS_SERVICE_FEE") {
                state.countServiceFeeCorrect++;
            }
            calcCountServiceFee += state.countServiceFeeCorrect;

            items = [
                ...((feeStat.isGoodsServiceFee &&
                    Array(calcCountServiceFee).fill(state.itemServiceFee)) ||
                    []),
                ...items,
            ];

            return {
                ...state,
                items,
                amount: items.reduce((acc, item) => acc + item.price, 0),
            };
        case REMOVE_PRODUCT:
            let isRemove = true;

            items = state.items
                .filter((item) => item.type !== "GOODS_SERVICE_FEE")
                .filter((item) => {
                    if (item.id === action.payload && isRemove) {
                        isRemove = false;
                        return false;
                    }
                    return true;
                });
            feeStat = getFeeStat(items);

            if (feeStat.isGoodsServiceFee) {
                calcCountServiceFee = feeStat.countAddServiceFee || 1;
                if (
                    state.itemServiceFee.id === action.payload &&
                    calcCountServiceFee + state.countServiceFeeCorrect > 0
                ) {
                    state.countServiceFeeCorrect--;
                }
                if (calcCountServiceFee + state.countServiceFeeCorrect === 0) {
                    state.countServiceFeeCorrect++;
                }
                calcCountServiceFee += state.countServiceFeeCorrect;
            } else {
                state.countServiceFeeCorrect = 0;
            }

            items = [
                ...((feeStat.isGoodsServiceFee &&
                    Array(calcCountServiceFee).fill(state.itemServiceFee)) ||
                    []),
                ...items,
            ];

            return {
                ...state,
                items,
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
                amountTips: action.payload,
            };
        case SET_ITEM_SERVICE_FEE:
            console.log("SET_ITEM_SERVICE_FEE", action.payload);
            return {
                ...state,
                itemServiceFee: action.payload,
            };
        default:
            return state;
    }
}

export default cartReducer;

export const addProduct = (product) => ({ type: ADD_PRODUCT, payload: product });
export const removeProduct = (id) => ({ type: REMOVE_PRODUCT, payload: id });
export const emptyCart = () => ({ type: EMPTY_CART, payload: null });
export const setPaymentGateProccess = (condition = true) => ({
    type: PAYMENT_GATE_PROCCESS,
    payload: condition,
});
export const setErrorGateResponse = (response) => ({
    type: ERROR_PAYMENT_GATE_RESPONSE,
    payload: response,
});
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const emptyDate = () => ({ type: EMPTY_DATE, payload: null });
export const setAmountTips = (amountTips) => ({ type: SET_AMOUNT_TIPS, payload: amountTips });
export const setItemServiceFee = (item) => ({ type: SET_ITEM_SERVICE_FEE, payload: item });
