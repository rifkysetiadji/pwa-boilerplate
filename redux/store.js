  
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialSate={};

const middleware=[thunk];

const store= createStore(rootReducer,initialSate,applyMiddleware(...middleware));

export default store;