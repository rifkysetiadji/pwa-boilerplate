import * as constants from '../constant/thread';
const initialState={
   threads:null,
   loading:false
}
const threadReducer=(state=initialState,action)=>{
    switch (action.type) {
        
        case constants.GET_THREADS:
            return{
                ...state,
                threads:action.payload
            }
        case constants.LOADING:
            return{
                ...state,
                loading:action.payload
            }
        default:
            return state;
    }
}
export default threadReducer