const SET_CALLOBORATORS = "SET_CALLOBORATORS";
const SET_CALLOBORATOR = "SET_CALLOBORATOR";
const RESET_CALLOBORATOR = "RESET_CALLOBORATOR";
const LOADING_ERROR = "LOADING_ERROR";

const defaultState = {
  item: null,
  items: {main: []},
  isFetching: true,
  isError: false,
};

function collabaratorsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CALLOBORATORS:
      let key;
      if (action.payload.currentDealer) {
        key = action.payload.currentDealer.name;
      } else {
        key = 'main';
      }
      return {
        ...state,
        items: {...state.items, [key]: action.payload.collabarators},
        isFetching: false,
      };
    case SET_CALLOBORATOR:
      const collaborators = action.payload.collaborators;
      const id = action.payload.id;
      return {
        ...state,
        item: collaborators.find((item) => item.id === id),
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

export const setCollaborators = (collabarators, currentDealer) => ({
  type: SET_CALLOBORATORS,
  payload: {collabarators, currentDealer},
});
export const setCollaborator = (id, collaborators) => ({
  type: SET_CALLOBORATOR,
  payload: {id,collaborators},
});
export const resetCollaborator = () => ({
  type: RESET_CALLOBORATOR,
  payload: null,
});
export const setCollaboratorsLoadingError = () => ({
  type: LOADING_ERROR,
  payload: null,
});
