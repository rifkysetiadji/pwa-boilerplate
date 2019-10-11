import {combineReducers} from 'redux';
import auth from './auth';
import thread from './thread'
import loading from './loading'
import search from './search'

export default combineReducers({
    auth:auth,
    thread:thread,
    loading,
    search
})