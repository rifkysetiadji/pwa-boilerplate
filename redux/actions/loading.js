import * as constant from '../constant/loading'

export const setLoading=(bool,loadingFor)=>{
    return{
        type:constant.LOADING,
        payload:bool,
        loadingFor:loadingFor
    }
}