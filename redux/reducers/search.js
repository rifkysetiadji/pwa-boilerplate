import * as constants from '../constant/search';
const initialState={
   result:null
}
const searchReducer=(state=initialState,action)=>{
    switch (action.type) {
        
        case constants.SEARCH:
            return{
                ...state,
                result:action.payload
            }
        default:
            return state;
    }
}
export default searchReducer