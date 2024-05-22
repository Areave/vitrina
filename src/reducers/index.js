import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import catalogReducer from './catalogReducer';
import collabaratorsReducer from './collaboratorsRedusers';
import cartReducer from './cartReducer';
import storageReducer from './storageReducer';
import parametersReducer from './parametersReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	storage: storageReducer,
	collabarators: collabaratorsReducer,
	catalog: catalogReducer,
	cart: cartReducer,
	parameters: parametersReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));