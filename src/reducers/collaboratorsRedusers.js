const SET_CALLOBORATORS = "SET_CALLOBORATORS";
const SET_CALLOBORATOR = "SET_CALLOBORATOR";
const RESET_CALLOBORATOR = "RESET_CALLOBORATOR";
const LOADING_ERROR = "LOADING_ERROR";

const defaultState = {
  item: null,
  items: [],
  isFetching: true,
  isError: false,
};

function collabaratorsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CALLOBORATORS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case SET_CALLOBORATOR:
      return {
        ...state,
        item: state.items.find((item) => item.id === action.payload),
      };
    case RESET_CALLOBORATOR:
      return {
        ...state,
        item: null,
      };
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
export default collabaratorsReducer;

export const setCollaborators = (collabarators) => ({
  type: SET_CALLOBORATORS,
  payload: collabarators,
});
export const setCollaborator = (id) => ({
  type: SET_CALLOBORATOR,
  payload: id,
});
export const resetCollaborator = () => ({
  type: RESET_CALLOBORATOR,
  payload: null,
});
export const setCollaboratorsLoadingError = () => ({
  type: LOADING_ERROR,
  payload: null,
});
