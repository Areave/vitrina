const SET_DEALERS = "SET_DEALERS";
const SET_DEALER = "SET_DEALER";
const RESET_DEALERS = "RESET_DEALERS";
const LOADING_ERROR = "LOADING_ERROR";

const defaultDealer = {
  name: 'main',
  id: 0
};
const defaultState = {
  item: defaultDealer,
  items: [defaultDealer],
  isError: false,
  isFetching: false
};

function dealersReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DEALERS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isFetching: false,
      };
    case SET_DEALER:
      return {
        ...state,
        item: state.items.find((item) => item.id === action.payload.id),
      };
    case RESET_DEALERS:
      return {
        ...state,
        item: defaultDealer
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
export const resetDealers = () => ({
  type: RESET_DEALERS
});
export const setDealer = (id) => ({
  type: SET_DEALER,
  payload: {id},
});
export const setDealersLoadingError = () => ({
  type: LOADING_ERROR,
  payload: null,
});
