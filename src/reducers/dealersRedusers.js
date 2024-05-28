const SET_DEALERS = "SET_DEALERS";
const SET_DEALER = "SET_DEALER";
const RESET_DEALER = "RESET_DEALER";
const LOADING_ERROR = "LOADING_ERROR";

const defaultDealer = {
  name: 'main',
  id: 0
};
const defaultState = {
  item: null,
  items: null,
  isError: false,
  isFetching: false
};

function dealersReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DEALERS:
      const newState = {
        ...state,
        items: [defaultDealer, ...action.payload],
        isFetching: false,
      };
      if (action.payload.length === 1) {
        newState.item = action.payload[0];
      }
      return newState;
    case SET_DEALER:
      return {
        ...state,
        item: state.items.find((item) => item.id === action.payload.id),
      };
    case RESET_DEALER:
      return {
        ...state,
        item: null
      }
    case LOADING_ERROR:
      return {
        ...state,
        isError: true,
        isFetching: false,
      };
    default:
      return state;
  }
}
export default dealersReducer;

export const setDealers = (dealers) => ({
  type: SET_DEALERS,
  payload: dealers,
});
export const resetDealer = () => ({
  type: RESET_DEALER
});
export const setDealer = (id) => ({
  type: SET_DEALER,
  payload: {id},
});
export const setDealersLoadingError = () => ({
  type: LOADING_ERROR,
  payload: null,
});
