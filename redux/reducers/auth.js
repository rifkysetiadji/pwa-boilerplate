import * as constants from '../constant/auth';
const initialState={
    name:'',
    email:'',
    password:'',
    profile:[],
    loading:false,
    users:null
}
const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        
        case constants.GET_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        case constants.LOADING:
            return{
                ...state,
                [action.loadingFor]:action.payload
            }
        case constants.SEARCH_USER:
            return{
                ...state,
                users:action.payload
            }
        default:
            return state;
    }
}
export default authReducer