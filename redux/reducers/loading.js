import * as constants from '../constant/loading';
const initialState={
   
}
const loadingReducer=(state=initialState,action)=>{
    switch (action.type) {
        
        case constants.LOADING:
            return{
                ...state,
                [action.loadingFor]:action.payload
            }
        default:
            return state;
    }
}
export default loadingReducer