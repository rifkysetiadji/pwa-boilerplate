import * as constants from '../constant/thread';
const initialState={
   threads:null,
   loading:false,
   timeline:null
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
        case constants.GET_TIMELINE:
            return{
                ...state,
                timeline:action.payload
            }
        default:
            return state;
    }
}
export default threadReducer